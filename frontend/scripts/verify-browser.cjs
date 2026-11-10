/* Optional real-browser verification using an already installed Chromium browser. */
const fs = require('fs');
const os = require('os');
const path = require('path');
const assert = require('assert/strict');
const { spawn } = require('child_process');
const WebSocket = require('ws');
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = async function verifyBrowser({ origin, manifest }) {
  const candidates = [
    path.join(process.env.ProgramFiles || '', 'Google/Chrome/Application/chrome.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Microsoft/Edge/Application/msedge.exe'),
  ];
  const binary = candidates.find(file => fs.existsSync(file));
  if (!binary) throw new Error('No existing supported browser found; do not install one automatically.');
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'upxero-seo-browser-profile-'));
  const artifacts = fs.mkdtempSync(path.join(os.tmpdir(), 'upxero-phase-d-browser-artifacts-'));
  const browser = spawn(binary, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--disable-background-networking', '--disable-component-update', '--disable-extensions', '--disable-sync',
    '--remote-debugging-port=0', '--user-data-dir=' + profile,
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1, EXCLUDE localhost', 'about:blank',
  ], { windowsHide: true, stdio: 'ignore' });
  let socket, send;
  const pending = new Map();
  const errors = [];
  let sequence = 0, sessionId;
  async function until(predicate, label) {
    const deadline = Date.now() + 12000;
    while (!await predicate()) {
      if (Date.now() > deadline) throw new Error('Browser timed out: ' + label);
      await wait(30);
    }
  }
  try {
    const portFile = path.join(profile, 'DevToolsActivePort');
    await until(() => fs.existsSync(portFile), 'DevTools startup');
    const [port, endpoint] = fs.readFileSync(portFile, 'utf8').trim().split(/\r?\n/);
    socket = new WebSocket('ws://127.0.0.1:' + port + endpoint);
    await new Promise((resolve, reject) => { socket.once('open', resolve); socket.once('error', reject); });
    socket.on('message', message => {
      const data = JSON.parse(message);
      if (data.id && pending.has(data.id)) {
        const { resolve, reject } = pending.get(data.id); pending.delete(data.id);
        if (data.error) reject(new Error(JSON.stringify(data.error))); else resolve(data.result);
      } else if (data.sessionId === sessionId) {
        if (data.method === 'Runtime.exceptionThrown') errors.push(JSON.stringify(data.params.exceptionDetails));
        if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') {
          errors.push(data.params.args.map(arg => arg.value || arg.description || '').join(' '));
        }
      }
    });
    send = (method, params = {}, useSession = true) => new Promise((resolve, reject) => {
      const id = ++sequence; pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params, ...(useSession && sessionId ? { sessionId } : {}) }));
    });
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' }, false);
    sessionId = (await send('Target.attachToTarget', { targetId, flatten: true }, false)).sessionId;
    await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
    await send('Network.setBlockedURLs', { urls: ['https://*'] });
    await send('Page.addScriptToEvaluateOnNewDocument', { source: `
      window.turnstile = { render: () => 'test-only-widget', remove() {}, reset() {} };
      window.__qaRequests = [];
      window.fetch = async (url, options) => { window.__qaRequests.push({url, options}); return {ok:true,json:async()=>({success:true})}; };
      const observer = new MutationObserver(() => {
        if (!window.__initialHeading) {
          window.__initialHeading = document.querySelector('#root h1');
          if (window.__initialHeading) observer.disconnect();
        }
      });
      observer.observe(document, { childList: true, subtree: true });
    ` });
    const evaluate = async expression => {
      const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };
    async function ready(pathname) {
      const common = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/i18n/locales/' + (pathname.startsWith('/nl') ? 'nl' : 'en') + '/common.json'), 'utf8'));
      await until(() => evaluate('document.readyState === "complete" && location.pathname === ' + JSON.stringify(pathname) + ' && [...document.querySelectorAll("button")].some(button => button.textContent === ' + JSON.stringify(common.cookie.settings) + ' && Object.keys(button).some(key => key.startsWith("__reactProps")))'), pathname);
    }
    async function check(pathname) {
      const state = await evaluate(`({
        lang: document.documentElement.lang, heading: document.querySelector('h1')?.textContent,
        sameHeading: window.__initialHeading === document.querySelector('#root h1'),
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        canonicalCount: document.querySelectorAll('link[rel="canonical"]').length,
        alternateCount: document.querySelectorAll('link[hreflang]').length,
        robots: document.querySelector('meta[name="robots"]')?.content,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      })`);
      if (state.overflow) {
        console.error('Overflow measurements', pathname, await evaluate(`JSON.stringify({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,outside:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>document.documentElement.clientWidth+1).slice(-12).map(e=>({tag:e.tagName,text:e.textContent.slice(0,100),class:e.className}))})`));
      }
      assert.equal(state.lang, pathname.startsWith('/nl') ? 'nl' : 'en');
      assert(state.heading && state.sameHeading, 'Hydration replaced content: ' + pathname);
      assert.equal(state.canonical, 'https://www.upxero.com' + pathname);
      assert.equal(state.canonicalCount, 1);
      const thankYou = pathname.endsWith('/bedankt');
      assert.equal(state.robots, thankYou ? 'noindex,follow' : 'index,follow');
      assert.equal(state.alternateCount, thankYou ? 0 : 3);
      assert.equal(state.overflow, false, 'Horizontal overflow: ' + pathname);
    }
    if (process.argv.includes('--ui-only')) {
      await require('./verify-home-ui.cjs')({ send, evaluate, ready, until, origin, artifacts });
      console.log('Focused UI screenshots: ' + artifacts);
      return;
    }
    if (!process.argv.includes('--final-only')) for (const mobile of [false, true]) {
      await send('Emulation.setDeviceMetricsOverride', { width: mobile ? 390 : 1440, height: mobile ? 844 : 1000, deviceScaleFactor: 1, mobile });
      for (const { pathname } of manifest) {
        errors.length = 0;
        await send('Page.navigate', { url: origin + pathname }); await ready(pathname); await check(pathname);
        await send('Page.reload', { ignoreCache: true }); await ready(pathname); await check(pathname);
        assert.deepEqual(errors, [], 'Browser errors: ' + pathname);
      }
    }
    for (const [prefix, width, mobile] of [['', 1440, false], ['/nl', 390, true]]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: mobile ? 844 : 1000, deviceScaleFactor: 1, mobile });
      const pathname = prefix ? '/nl/' : '/';
      await send('Page.navigate', { url: origin + pathname }); await ready(pathname); await check(pathname);
      const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      fs.writeFileSync(path.join(artifacts, mobile ? 'mobile-home-nl.png' : 'desktop-home-en.png'), Buffer.from(screenshot.data, 'base64'));
    }
    for (const prefix of ['', '/nl']) {
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
      errors.length = 0;
      await send('Page.navigate', { url: origin + prefix + '/contact?subject=upgrade-grow#form' });
      await ready(prefix + '/contact');
      await until(() => evaluate('!!document.querySelector("#upgrade-subject")'), 'Upgrade subject');
      await evaluate(`{
        const field = document.querySelector('[name="message"]');
        Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(field, 'Unsent browser draft');
        field.dispatchEvent(new Event('input', { bubbles: true }));
      }`);
      const target = prefix ? '' : '/nl';
      await evaluate('document.querySelector(' + JSON.stringify('button[aria-label="' + (prefix ? 'Engels' : 'Dutch') + '"]') + ').click()');
      await until(() => evaluate('location.pathname === ' + JSON.stringify(target + '/contact') + ' && document.querySelector("link[rel=canonical]").href === ' + JSON.stringify('https://www.upxero.com' + target + '/contact')), 'Browser language switch');
      const draft = await evaluate(`({ value: document.querySelector('[name="message"]').value, search: location.search, hash: location.hash, preference: localStorage.getItem('upxero.language') })`);
      assert.equal(draft.value, 'Unsent browser draft'); assert.equal(draft.search, '?subject=upgrade-grow'); assert.equal(draft.hash, '#form');
      assert.equal(draft.preference, target ? 'nl' : 'en');
      const menuSelector = 'button[aria-controls="mobile-navigation"]';
      await evaluate('document.querySelector(' + JSON.stringify(menuSelector) + ').click()');
      await until(() => evaluate('document.getElementById("mobile-navigation") !== null'), 'Mobile menu');
      await evaluate('document.querySelector(' + JSON.stringify('#mobile-navigation a[href="' + target + '/services"]') + ').click()');
      await until(() => evaluate('location.pathname === ' + JSON.stringify(target + '/services') + ' && document.querySelector("link[rel=canonical]").href === ' + JSON.stringify('https://www.upxero.com' + target + '/services')), 'Mobile internal navigation');
      assert.equal(await evaluate('document.getElementById("mobile-navigation") === null'), true);
      assert.deepEqual(errors, []);
    }
    await require('./verify-final-browser.cjs')({ send, evaluate, ready, until, origin, artifacts });
    console.log(process.argv.includes('--final-only')
      ? 'Real Chrome: targeted Phase E.1 checks and EN/NL contact draft/navigation passed. Full route matrix not repeated in this targeted run.'
      : 'Real browser: ' + path.basename(binary) + '; direct entry and refresh passed on all 20 routes at both 1440px desktop and 390px mobile; no horizontal overflow; mobile EN/NL contact draft/navigation passed.');
    console.log('Screenshots: ' + artifacts);
  } finally {
    if (send && socket && socket.readyState === WebSocket.OPEN) {
      await Promise.race([send('Browser.close', {}, false).catch(() => {}), wait(1000)]);
    }
    if (socket && socket.readyState === WebSocket.OPEN) socket.close();
    browser.kill();
    await wait(1500);
    // Remove only this uniquely created, resolved temporary browser profile.
    if (profile.startsWith(path.join(os.tmpdir(), 'upxero-seo-browser-profile-'))) {
      try {
        fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
      } catch (error) {
        console.warn('Temporary Chrome profile still locked; retained at ' + profile + ' (' + error.code + ').');
      }
    }
  }
};
