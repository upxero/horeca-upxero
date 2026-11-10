/* Local-only delivery and production-bundle checks. This is not a real browser. */
const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert/strict');
const { TextEncoder, TextDecoder } = require('util');
const { JSDOM, VirtualConsole } = require('jsdom');
const build = path.resolve(__dirname, '../build');
const resolveRoute = require('./local-routing.cjs')(build);
const manifest = JSON.parse(fs.readFileSync(path.join(build, 'prerender-manifest.json'), 'utf8'));
const rules = fs.readFileSync(path.join(build, '_redirects'), 'utf8').split(/\r?\n/)
  .map(line => line.trim()).filter(line => line && !line.startsWith('#')).map(line => line.split(/\s+/));
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function waitFor(predicate, label) {
  const deadline = Date.now() + 5000;
  while (!predicate()) {
    if (Date.now() > deadline) throw new Error('Timed out: ' + label);
    await wait(20);
  }
}
const openDOMs = new Set();
function closeDOM(dom) { dom.window.close(); openDOMs.delete(dom); }

async function productionDOM(html, url) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('error', (...args) => errors.push(args.map(String).join(' ')));
  virtualConsole.on('jsdomError', error => errors.push(error.message));
  const dom = new JSDOM(html, { url, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole });
  openDOMs.add(dom);
  const win = dom.window;
  win.TextEncoder = TextEncoder; win.TextDecoder = TextDecoder;
  win.scrollTo = () => {};
  win.HTMLElement.prototype.scrollIntoView = () => {};
  win.matchMedia = query => ({ matches: false, media: query, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
  win.fetch = () => { errors.push('Unexpected fetch'); return Promise.reject(new Error('Network disabled')); };
  win.addEventListener('error', event => errors.push(String(event.error || event.message)));
  win.addEventListener('unhandledrejection', event => errors.push(String(event.reason)));
  const heading = win.document.querySelector('#root h1');
  // Execute only the actual built application bundle. Existing analytics, chat,
  // CAPTCHA providers, CSS and external scripts are never loaded.
  const bundles = [...win.document.querySelectorAll('script[src^="/static/js/"]')];
  assert(bundles.length > 0, 'Built application bundle missing');
  for (const bundle of bundles) win.eval(fs.readFileSync(path.join(build, bundle.getAttribute('src')), 'utf8'));
  const locale = new URL(url).pathname.startsWith('/nl') ? 'nl' : 'en';
  const cookieTitle = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/i18n/locales/' + locale + '/common.json'), 'utf8')).cookie.title;
  await waitFor(() => win.document.body.textContent.includes(cookieTitle), 'React effects at ' + url);
  assert.deepEqual(errors, [], 'Production hydration errors at ' + url);
  assert.equal(win.document.querySelector('#root h1'), heading, 'Hydration replaced the heading at ' + url);
  return { dom, errors };
}

async function main() {
  let requests = 0;
  const server = http.createServer((request, response) => {
    requests++;
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const delivery = resolveRoute(pathname);
    const target = delivery.file || '';
    if (!target.startsWith(build + path.sep) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
      response.writeHead(404); response.end('Not found'); return;
    }
    const types = { '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.xml': 'application/xml' };
    response.writeHead(delivery.status, { 'Content-Type': (types[path.extname(target)] || 'text/html') + '; charset=utf-8' });
    response.end(fs.readFileSync(target));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  try {
    if (process.argv.includes('--ui-only')) {
      await require('./verify-browser.cjs')({ origin, manifest });
      return;
    }
    assert(resolveRoute('/api/qa-placeholder').functionRoute, 'API function rewrite must precede 404 fallbacks');
    for (const pathname of ['/not-a-page', '/nl/not-a-page', '/missing/nested/path', '/nl/missing/nested/path']) {
      const response = await fetch(origin + pathname);
      assert.equal(response.status, 404, pathname);
      const html = await response.text();
      const { dom } = await productionDOM(html, origin + pathname);
      assert.equal(dom.window.document.querySelector('meta[name="robots"]').content, 'noindex,follow');
      assert.equal(dom.window.document.querySelector('link[rel="canonical"]'), null);
      assert(dom.window.document.querySelector('main h1'));
      closeDOM(dom);
    }
    for (const { pathname, file } of manifest) {
      const expected = fs.readFileSync(path.join(build, file), 'utf8');
      // Repeat a fresh request to model direct entry and refresh, including query strings.
      for (let attempt = 0; attempt < 2; attempt++) {
        const response = await fetch(origin + pathname + '?seo-check=' + attempt);
        assert.equal(response.status, 200);
        assert.equal(await response.text(), expected);
      }
      const aliases = pathname === '/' ? [] : [pathname.endsWith('/') ? pathname.slice(0, -1) : pathname + '/'];
      for (const alias of aliases) {
        const response = await fetch(origin + alias);
        assert.equal(response.status, 200); assert.equal(await response.text(), expected);
      }
      const { dom } = await productionDOM(expected, origin + pathname);
      assert.equal(dom.window.document.documentElement.lang, pathname.startsWith('/nl') ? 'nl' : 'en');
      assert.equal(dom.window.document.querySelectorAll('link[rel="canonical"]').length, 1);
      assert.equal(dom.window.document.querySelector('link[rel="canonical"]').href, 'https://www.upxero.com' + pathname);
      closeDOM(dom);
    }
    for (const prefix of ['', '/nl']) {
      const html = fs.readFileSync(path.join(build, manifest.find(item => item.pathname === prefix + '/contact').file), 'utf8');
      const { dom, errors } = await productionDOM(html, origin + prefix + '/contact?subject=upgrade-grow#form');
      const win = dom.window;
      assert(win.document.querySelector('#upgrade-subject'), 'Upgrade subject must appear after hydration');
      assert.equal(win.document.querySelector('button[type="submit"]').disabled, false);
      const message = win.document.querySelector('[name="message"]');
      Object.getOwnPropertyDescriptor(win.HTMLTextAreaElement.prototype, 'value').set.call(message, 'Unsent production-bundle draft');
      message.dispatchEvent(new win.Event('input', { bubbles: true }));
      await wait(20);
      const targetPrefix = prefix ? '' : '/nl';
      const button = win.document.querySelector('button[aria-label="' + (prefix ? 'Engels' : 'Dutch') + '"]');
      button.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      await waitFor(() => win.location.pathname === targetPrefix + '/contact' && win.document.querySelector('link[rel="canonical"]').href === 'https://www.upxero.com' + targetPrefix + '/contact', 'Language switch');
      assert.equal(win.location.pathname, targetPrefix + '/contact');
      assert.equal(win.location.search, '?subject=upgrade-grow'); assert.equal(win.location.hash, '#form');
      assert.equal(win.document.querySelector('[name="message"]'), message);
      assert.equal(message.value, 'Unsent production-bundle draft');
      assert.equal(win.localStorage.getItem('upxero.language'), targetPrefix ? 'nl' : 'en');
      const link = win.document.querySelector('header nav a[href="' + targetPrefix + '/services"]');
      link.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      await waitFor(() => win.location.pathname === targetPrefix + '/services' && win.document.querySelector('link[rel="canonical"]').href === 'https://www.upxero.com' + targetPrefix + '/services', 'Internal navigation metadata');
      assert.equal(win.location.pathname, targetPrefix + '/services');
      assert.equal(win.document.querySelector('link[rel="canonical"]').href, 'https://www.upxero.com' + targetPrefix + '/services');
      assert.deepEqual(errors, []);
      closeDOM(dom);
    }
    console.log('Local HTTP: ' + requests + ' direct/refresh/alias requests passed across 20 routes.');
    console.log('Actual production bundle: hydration passed on 20 routes; EN/NL contact query/draft/language/navigation checks passed. jsdom only; no real browser or deployed Netlify checks.');
    if (process.argv.includes('--browser')) await require('./verify-browser.cjs')({ origin, manifest });
  } finally {
    for (const dom of openDOMs) closeDOM(dom);
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
