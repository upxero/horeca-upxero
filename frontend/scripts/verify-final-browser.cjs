const fs = require('fs'), path = require('path'), assert = require('assert/strict');
module.exports = async function ({ send, evaluate, ready, until, origin, artifacts }) {
  const ev = (fn, ...args) => evaluate('(' + fn.toString() + ')(' + args.map(arg => JSON.stringify(arg)).join(',') + ')');
  const clickText = text => ev(text => [...document.querySelectorAll('button')].find(button => button.textContent === text)?.click(), text);
  const key = async (key, code, vk) => {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: vk });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: vk });
  };
  let screens = 0;
  for (const width of [320, 390, 768, 1440]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: width < 500 ? 844 : 1000, deviceScaleFactor: 1, mobile: width < 500 });
    for (const prefix of ['', '/nl']) for (const route of ['/', '/pricing', '/contact', '/bedankt']) {
      const pathname = prefix + (route === '/' && prefix ? '/' : route);
      await send('Page.navigate', { url: origin + pathname }); await ready(pathname);
      await clickText(prefix ? 'Analyses weigeren' : 'Reject analytics');
      const state = await ev(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth,
        nested: document.querySelectorAll('a button,button a').length, main: document.querySelectorAll('main').length,
        support: getComputedStyle(document.querySelector('.support-bar')).position,
        outside: [...document.querySelectorAll('body *')].filter(node => !node.closest('.overflow-x-auto') && node.getBoundingClientRect().right > document.documentElement.clientWidth + 1).slice(0,20).map(node => ({
          tag: node.tagName, text: node.textContent.slice(0, 70), class: node.getAttribute('class'),
          right: node.getBoundingClientRect().right, width: node.getBoundingClientRect().width,
          parent: node.parentElement?.getAttribute('class'),
        })) }));
      assert(state.scroll <= state.client + 1, pathname + ' overflow at ' + width + ': ' + JSON.stringify(state));
      assert.equal(state.nested, 0); assert.equal(state.main, 1); assert.equal(state.support, 'static');
      if (route === '/contact') {
        assert(await ev(() => {
          const select = document.querySelector('[name=planInterest]'), style = getComputedStyle(select);
          const canvas = document.createElement('canvas'), context = canvas.getContext('2d'); context.font = style.font;
          const available = select.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 24;
          return [...select.options].filter(option => ['start','grow','boost'].includes(option.value)).every(option => context.measureText(option.text).width <= available);
        }), 'Package option labels must fit at ' + width + ': ' + pathname);
      }
      const capture = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      fs.writeFileSync(path.join(artifacts, 'e1-' + pathname.replaceAll('/', '_') + '-' + width + '.png'), Buffer.from(capture.data, 'base64')); screens++;
      if (route === '/pricing' || route === '/contact') {
        await ev(() => document.querySelector('main section:nth-of-type(2)')?.scrollIntoView());
        await new Promise(resolve => setTimeout(resolve, 350));
        const content = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
        fs.writeFileSync(path.join(artifacts, 'e1-content-' + pathname.replaceAll('/', '_') + '-' + width + '.png'), Buffer.from(content.data, 'base64'));
      }
    }
  }
  for (const prefix of ['', '/nl']) {
    for (const plan of ['start', 'grow', 'boost']) {
      await send('Page.navigate', { url: origin + prefix + '/pricing' }); await ready(prefix + '/pricing');
      await ev(href => document.querySelector('a[href="' + href + '"]').click(), prefix + '/contact?plan=' + plan);
      await until(() => ev(plan => document.querySelector('[name=planInterest]')?.value === plan, plan), 'Package ' + plan);
    }
  }
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send('Page.navigate', { url: origin + '/' }); await ready('/');
  await ev(() => { document.querySelector('button[aria-controls=mobile-navigation]').focus(); document.activeElement.click(); });
  await key('Escape', 'Escape', 27);
  await until(() => ev(() => !document.querySelector('#mobile-navigation')), 'Menu Escape');
  assert.equal(await ev(() => document.activeElement.getAttribute('aria-controls')), 'mobile-navigation');
  await ev(() => { const button = document.querySelector('button[aria-label="Open chat options"]'); button.focus(); button.click(); });
  await until(() => ev(() => !!document.querySelector('[role=dialog]')), 'Support dialog');
  for (let i = 0; i < 12; i++) {
    await key('Tab', 'Tab', 9);
    assert(await ev(() => document.querySelector('[role=dialog]').contains(document.activeElement)), 'Dialog focus must remain contained');
  }
  await key('Escape', 'Escape', 27);
  await until(() => ev(() => !document.querySelector('[role=dialog]')), 'Dialog Escape');
  await until(() => ev(() => document.activeElement.getAttribute('aria-label') === 'Open chat options'), 'Dialog focus restoration');
  await ev(() => { localStorage.clear(); });
  await send('Page.navigate', { url: origin + '/contact?private=secret#private' }); await ready('/contact');
  assert.equal(await ev(() => window.__qaRequests.length), 0);
  await clickText('Close');
  assert.equal(await ev(() => localStorage.getItem('upxero.privacy.v1')), null);
  await clickText('Privacy settings'); await clickText('Reject analytics');
  assert.equal(await ev(() => window.__qaRequests.length), 0);
  await clickText('Privacy settings'); await clickText('Allow analytics');
  await until(() => ev(() => window.__qaRequests.length === 1), 'Consented pageview');
  const request = await ev(() => window.__qaRequests[0]);
  assert.equal(JSON.parse(request.options.body).properties.$current_url, 'https://www.upxero.com/contact');
  assert(!request.options.body.includes('secret'));
  await clickText('Privacy settings'); await clickText('Reject analytics');
  assert(await ev(() => window.__qaRequests[0].options.signal.aborted));
  await ev(() => document.querySelector('button[aria-label="Dutch"]').click());
  await until(() => ev(() => location.pathname === '/nl/contact'), 'Language after withdrawal');
  assert.equal(await ev(() => window.__qaRequests.length), 1);
  for (const pathname of ['/does-not-exist', '/nl/does-not-exist']) {
    await send('Page.navigate', { url: origin + pathname }); await ready(pathname);
    assert(await ev(() => document.querySelector('h1') && document.querySelector('meta[name=robots]').content === 'noindex,follow'));
  }
  console.log('Phase E.1 Chrome: 32 targeted EN/NL route/viewport checks at 320/390/768/1440px; package CTAs, menu Escape, dialog focus containment/restoration and mocked consent acceptance/rejection/withdrawal passed. Screenshots: ' + screens);
};
