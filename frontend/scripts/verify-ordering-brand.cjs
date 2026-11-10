/* Local product-brand regression only; external requests stay blocked by the parent harness. */
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
module.exports = async ({ send, evaluate, ready, until, origin, artifacts }) => {
  const ev = (fn, ...args) => evaluate('('+fn.toString()+')('+args.map(value=>JSON.stringify(value)).join(',')+')');
  let checks = 0;
  for (const width of [320,1280,1440]) for (const pathname of ['/', '/nl/', '/services', '/nl/services', '/pricing', '/nl/pricing']) {
    await send('Emulation.setDeviceMetricsOverride', { width, height:844, deviceScaleFactor:1, mobile:width<500 });
    await send('Page.navigate', { url:origin+pathname }); await ready(pathname);
    await until(()=>ev(()=>!!document.querySelector('[data-privacy-panel]')),'Privacy panel mounts');
    await ev(()=>[...document.querySelectorAll('[data-privacy-panel] button')].at(-1).click());
    await until(()=>ev(()=>!document.querySelector('[data-privacy-panel]')),'Privacy panel closes');
    const label = pathname.startsWith('/nl') ? 'Probeer Ordering gratis' : 'Try Ordering Free';
    const header = await ev(label=>{
      const header=document.querySelector('header');
      if(innerWidth<1280) header.querySelector('button[aria-controls="mobile-navigation"]').click();
      return header.querySelector('a[href="https://ordering.upxero.com"]').textContent.trim()===label;
    },label);
    assert(header);
    if(width<1280) await until(()=>ev(()=>!!document.querySelector('#mobile-navigation')),'Mobile menu opens');
    const nav = await ev(()=>[...document.querySelectorAll('header a:not(.skip-link),header button')].map(node=>{
      const r=node.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,w:r.width,h:r.height};
    }).filter(r=>r.w&&r.h));
    for(const r of nav) assert(r.x>=-1&&r.right<=width+1,'Header control outside viewport: '+JSON.stringify({width,pathname,r}));
    for(let i=0;i<nav.length;i++) for(let j=i+1;j<nav.length;j++) {
      const a=nav[i],b=nav[j];
      assert(!(a.x<b.right-1&&a.right>b.x+1&&a.y<b.bottom-1&&a.bottom>b.y+1),'Header controls overlap: '+JSON.stringify({width,pathname,a,b}));
    }
    if(width<1280) await ev(()=>document.querySelector('header button[aria-controls="mobile-navigation"]').click());
    await ev(()=>{document.documentElement.style.scrollBehavior='auto';document.querySelector('main img[src="/images/upxero-ordering-logo.png"]').scrollIntoView({block:'center'});});
    await until(()=>ev(()=>{const img=document.querySelector('main img[src="/images/upxero-ordering-logo.png"]');return img.complete&&img.naturalWidth>0;}),'Official logo loads');
    const state=await ev(()=>{
      const img=document.querySelector('main img[src="/images/upxero-ordering-logo.png"]'),r=img.getBoundingClientRect();
      return {count:document.querySelectorAll('main img[src="/images/upxero-ordering-logo.png"]').length,
        w:r.width,h:r.height,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,
        left:r.left,right:r.right,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+1};
    });
    assert.equal(state.count,1);assert.equal(state.overflow,false);
    assert(state.left>=-1&&state.right<=width+1);
    assert(Math.abs(state.w/state.h-state.naturalWidth/state.naturalHeight)<0.02,'Logo aspect ratio changed');
    // The table's compact first column can shrink its decorative logo on mobile;
    // the full product/inclusion text remains the accessible label beside it.
    assert(state.w>=(pathname.includes('pricing')?64:100)&&state.w<=257,JSON.stringify({width,pathname,state}));
    const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    fs.writeFileSync(path.join(artifacts,'ordering-'+pathname.replaceAll('/','_')+'-'+width+'.png'),Buffer.from(shot.data,'base64'));
    checks++;
  }
  console.log('Ordering branding: '+checks+' EN/NL Home/Services/Pricing Chrome checks passed at 320/1280/1440px; logo load/aspect/fit, navbar CTA, control separation and document overflow. External integrations blocked.');
};
