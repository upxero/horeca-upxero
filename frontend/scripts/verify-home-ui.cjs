/* Focused checks for the three final UI corrections; uses the existing local harness. */
const fs = require('fs'), path = require('path'), assert = require('assert/strict');
module.exports = async function ({ send, evaluate, ready, until, origin, artifacts }) {
  const ev = (fn, ...args) => evaluate('(' + fn.toString() + ')(' + args.map(value => JSON.stringify(value)).join(',') + ')');
  const key = async (key, code, number, text) => {
    await send('Input.dispatchKeyEvent', { type:'keyDown', key, code, windowsVirtualKeyCode:number, ...(text ? { text } : {}) });
    await send('Input.dispatchKeyEvent', { type:'keyUp', key, code, windowsVirtualKeyCode:number });
  };
  // Allow one CSS pixel for fractional font/rectangle rounding at touching edges.
  const overlap = (a,b) => a.x < b.right-1 && a.right > b.x+1 && a.y < b.bottom-1 && a.bottom > b.y+1;
  if (process.argv.includes('--copyright-only')) {
    await send('Emulation.setDeviceMetricsOverride', { width:320, height:844, deviceScaleFactor:1, mobile:true });
    for (const pathname of ['/', '/nl/']) {
      await send('Page.navigate', { url:origin+pathname }); await ready(pathname);
      await until(()=>ev(()=>!!document.querySelector('[data-privacy-panel]')),'Privacy panel mounts');
      await ev(()=>[...document.querySelectorAll('[data-privacy-panel] button')].at(-1).click());
      await until(()=>ev(()=>!document.querySelector('[data-privacy-panel]')),'Privacy panel closes');
      await ev(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,document.documentElement.scrollHeight);});
      await until(()=>ev(()=>!!document.querySelector('svg.lucide-chevron-up')),'Footer scroll completes');
      const state = await ev(()=>{
        const rect = node=>{const r=node.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom};};
        const footer=document.querySelector('footer'),copyright=footer.querySelector('.border-t p');
        const range=document.createRange();range.selectNodeContents(copyright);
        return { text:[...range.getClientRects()].map(r=>({x:r.x,y:r.y,right:r.right,bottom:r.bottom})),
          chat:rect(document.querySelector('.floating-support-control svg.lucide-message-circle').closest('button')),
          top:rect(document.querySelector('svg.lucide-chevron-up').closest('button')),
          position:getComputedStyle(document.querySelector('.floating-support-control svg.lucide-message-circle').closest('button')).position,
          footerEnd:footer.getBoundingClientRect().bottom+scrollY,height:document.documentElement.scrollHeight,
          overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+1 };
      });
      assert(state.text.length>0);
      for(const line of state.text) assert(!overlap(line,state.chat),'Copyright overlaps WhatsApp: '+JSON.stringify(state));
      assert.equal(state.position,'fixed');assert.equal(state.overflow,false);
      assert(Math.abs(state.chat.bottom-748)<1);assert(Math.abs(state.top.x-16)<1);
      assert(Math.abs(state.footerEnd-state.height)<2,'Unexpected space below footer');
      const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
      fs.writeFileSync(path.join(artifacts,'copyright-'+(pathname.startsWith('/nl')?'nl':'en')+'-320.png'),Buffer.from(shot.data,'base64'));
      console.log('320px copyright clear of fixed WhatsApp: '+pathname);
    }
    return;
  }
  let checks = 0;
  for (const width of [320,390,768,1440]) for (const prefix of ['', '/nl']) {
    await send('Emulation.setDeviceMetricsOverride', { width, height:844, deviceScaleFactor:1, mobile:width<500 });
    const pathname = prefix ? '/nl/' : '/';
    await send('Page.navigate', { url:origin + pathname }); await ready(pathname);
    await until(() => ev(() => !!document.querySelector('[data-privacy-panel]')), 'Privacy panel mounts');
    assert(await ev(() => getComputedStyle(document.querySelector('.floating-support-control')).visibility === 'hidden'), 'Privacy panel must take priority');
    await ev(() => { const panel = document.querySelector('[data-privacy-panel]'); [...panel.querySelectorAll('button')].at(-1).click(); });
    await until(() => ev(() => !document.querySelector('[data-privacy-panel]')), 'Privacy panel closes');
    assert.equal(await ev(() => localStorage.getItem('upxero.privacy.v1')), null, 'Closing must not record consent');
    await ev(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0,600); });
    await until(() => ev(() => !!document.querySelector('.floating-support-control svg.lucide-chevron-up')), 'Scroll to Top appears');
    const measure = () => ev(() => {
      const rect = element => { const r=element.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,w:r.width,h:r.height}; };
      const buttons = [...document.querySelectorAll('.floating-support-control')];
      const top = buttons.find(node=>node.querySelector('svg.lucide-chevron-up'));
      const chat = buttons.find(node=>node.querySelector('svg.lucide-message-circle'));
      return { width:document.documentElement.clientWidth, height:innerHeight, scroll:scrollY,
        top:rect(top),chat:rect(chat),positions:buttons.map(node=>getComputedStyle(node).position),
        visibility:buttons.map(node=>getComputedStyle(node).visibility),
        overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+1,
        footerBottom:document.querySelector('footer').getBoundingClientRect().bottom+scrollY,
        documentHeight:document.documentElement.scrollHeight,
        oldRows:document.querySelectorAll('.support-bar,.privacy-settings-bar').length,
        oldPrompt:/👉/.test(document.body.textContent),
        footerLinks:[...document.querySelectorAll('footer a,footer button')].map(rect) };
    });
    const middle = await measure();
    assert.deepEqual(middle.positions, ['fixed','fixed']);
    assert.deepEqual(middle.visibility, ['visible','visible']);
    assert.equal(middle.overflow,false); assert.equal(middle.oldRows,0); assert.equal(middle.oldPrompt,false);
    assert(Math.abs(middle.documentHeight-middle.footerBottom)<2,'Footer must end at the document bottom');
    assert(Math.abs(middle.top.x-16)<1); assert(Math.abs(middle.height-middle.top.bottom-16)<1);
    assert(Math.abs(middle.width-middle.chat.right-16)<1); assert(Math.abs(middle.height-middle.chat.bottom-96)<1);
    // Mock geometry only: external Botpress is blocked and is never loaded/configured.
    const launcher={x:middle.width-80,right:middle.width-16,y:middle.height-80,bottom:middle.height-16};
    assert(!overlap(middle.chat,launcher)); assert(middle.chat.bottom<=launcher.y-16+1);
    await ev(()=>window.scrollTo(0,document.documentElement.scrollHeight));
    await until(()=>ev(()=>scrollY>600),'Footer reached');
    const bottom=await measure();
    assert(Math.abs(bottom.top.y-middle.top.y)<1);assert(Math.abs(bottom.chat.y-middle.chat.y)<1);
    for(const link of bottom.footerLinks) for(const button of [bottom.top,bottom.chat]) assert(!overlap(link,button),'Floating control overlaps footer/privacy link: '+JSON.stringify({width,prefix,link,button}));
    const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    fs.writeFileSync(path.join(artifacts,'ui-footer-'+(prefix?'nl':'en')+'-'+width+'.png'),Buffer.from(shot.data,'base64'));
    if(width<1280){
      await ev(()=>document.querySelector('button[aria-controls=mobile-navigation]').click());
      await until(()=>ev(()=>!!document.querySelector('#mobile-navigation')),'Menu opens');
      assert(await ev(()=>[...document.querySelectorAll('.floating-support-control')].every(node=>getComputedStyle(node).visibility==='hidden')));
      await key('Escape','Escape',27);
      await until(()=>ev(()=>!document.querySelector('#mobile-navigation')),'Menu closes');
    }
    await ev(()=>document.querySelector('.floating-support-control svg.lucide-chevron-up').parentElement.focus());
    await key('Enter','Enter',13,'\r');await until(()=>ev(()=>scrollY<1),'Keyboard scroll to top');
    await ev(()=>{const button=document.querySelector('.floating-support-control svg.lucide-message-circle').parentElement;button.focus();});
    await key('Enter','Enter',13,'\r');await until(()=>ev(()=>!!document.querySelector('[role=dialog]')),'Keyboard support dialog');
    await key('Escape','Escape',27);await until(()=>ev(()=>!document.querySelector('[role=dialog]')),'Support dialog closes');
    const common = require('../src/i18n/locales/'+(prefix?'nl':'en')+'/common.json');
    await ev(label=>{const button=[...document.querySelectorAll('footer button')].find(node=>node.textContent===label);button.focus();}, common.cookie.settings);
    await key('Enter','Enter',13,'\r');
    await until(()=>ev(()=>!!document.querySelector('[data-privacy-panel]')),'Footer reopens privacy settings');
    await ev(()=>document.querySelectorAll('[data-privacy-panel] button')[1].click());
    await until(()=>ev(()=>!document.querySelector('[data-privacy-panel]')),'Allow closes privacy settings');
    assert.equal(await ev(()=>JSON.parse(localStorage.getItem('upxero.privacy.v1')).analytics),true);
    await key('Enter','Enter',13,'\r');
    await until(()=>ev(()=>!!document.querySelector('[data-privacy-panel]')),'Footer reopens for withdrawal');
    await ev(()=>document.querySelector('[data-privacy-panel] button').click());
    await until(()=>ev(()=>!document.querySelector('[data-privacy-panel]')),'Reject closes privacy settings');
    assert.equal(await ev(()=>JSON.parse(localStorage.getItem('upxero.privacy.v1')).analytics),false);
    assert.equal(await ev(()=>document.activeElement.closest('footer')!==null),true,'Privacy focus returns to footer');
    await ev(()=>localStorage.clear());
    checks++;
  }
  console.log('Focused footer Chrome: '+checks+' EN/NL cases passed at 320/390/768/1440px; footer ends at document bottom, no support row/prompt, localized privacy reopening/rejection/focus return, fixed controls, footer overlap and keyboard checks passed. Botpress spacing mocked; external behavior not tested.');
};
