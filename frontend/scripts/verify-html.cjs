const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { JSDOM } = require('jsdom');

const origin = 'https://www.upxero.com';
const basePaths = ['/', '/services', '/pricing', '/about', '/contact', '/restaurant-portfolio', '/privacy-policy', '/terms-conditions', '/cookie-policy', '/bedankt'];

function verifyHTML(build) {
  for (const [file, language] of [['404.html', 'en'], ['_prerender/nl-404.html', 'nl']]) {
    const html = fs.readFileSync(path.join(build, file), 'utf8');
    const doc = new JSDOM(html).window.document;
    assert.equal(doc.documentElement.lang, language);
    assert.equal(doc.querySelector('meta[name="robots"]').content, 'noindex,follow');
    assert.equal(doc.querySelectorAll('link[rel="canonical"],link[hreflang]').length, 0);
    assert(doc.querySelector('main h1'));
    assert(!html.includes('posthog.init('), 'Unconditional PostHog bootstrap must be absent');
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(build, 'prerender-manifest.json'), 'utf8'));
  assert.equal(manifest.length, 20);
  const expected = basePaths.flatMap(p => [p, '/nl' + (p === '/' ? '/' : p)]);
  assert.deepEqual(manifest.map(item => item.pathname).sort(), expected.sort());
  const sitemapText = fs.readFileSync(path.join(build, 'sitemap.xml'), 'utf8');
  assert.equal(sitemapText.replace(/\r\n/g, '\n'), fs.readFileSync(path.resolve(__dirname, '../public/sitemap.xml'), 'utf8').replace(/\r\n/g, '\n'), 'Public sitemap snapshot and generated sitemap differ');
  const sitemap = new JSDOM(sitemapText, { contentType: 'application/xml' }).window.document;
  assert.equal(sitemap.querySelectorAll('parsererror').length, 0);
  const sitemapURLs = [...sitemap.getElementsByTagName('url')];
  assert.equal(sitemapURLs.length, 18);
  assert(!sitemapText.includes('/bedankt'));
  const robots = fs.readFileSync(path.join(build, 'robots.txt'), 'utf8');
  assert(robots.includes('Sitemap: ' + origin + '/sitemap.xml'));
  assert(!/^Disallow:\s*\/(?:\s|$)/m.test(robots), 'Public pages must be crawlable');
  assert(!/Disallow:.*bedankt/.test(robots), 'Thank You must be crawlable to expose noindex');
  const rules = fs.readFileSync(path.join(build, '_redirects'), 'utf8').split(/\r?\n/)
    .map(line => line.trim()).filter(line => line && !line.startsWith('#')).map(line => line.split(/\s+/));
  const titles = new Set(), descriptions = new Set();
  for (const { pathname, file } of manifest) {
    const html = fs.readFileSync(path.join(build, file), 'utf8');
    const dom = new JSDOM(html); // Scripts and external resources are never executed.
    const doc = dom.window.document;
    const nl = pathname.startsWith('/nl');
    const base = pathname.replace(/^\/nl/, '') || '/';
    const noindex = base === '/bedankt';
    const canonical = origin + pathname;
    assert.equal(doc.documentElement.lang, nl ? 'nl' : 'en', pathname);
    assert(doc.querySelector('noscript').textContent.includes(nl ? 'Schakel JavaScript' : 'Enable JavaScript'));
    assert.equal(doc.querySelectorAll('title').length, 1);
    assert(doc.title.length > 8);
    assert(!titles.has(doc.title), 'Titles must be unique: ' + pathname); titles.add(doc.title);
    assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1);
    const description = doc.querySelector('meta[name="description"]').content;
    assert(description.length > 45);
    assert(!descriptions.has(description)); descriptions.add(description);
    assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
    assert.equal(doc.querySelector('link[rel="canonical"]').href, canonical);
    const alternates = [...doc.querySelectorAll('link[rel="alternate"][hreflang]')];
    assert.equal(alternates.length, noindex ? 0 : 3);
    if (!noindex) {
      for (const [lang, url] of [['en', origin + base], ['nl', origin + '/nl' + (base === '/' ? '/' : base)], ['x-default', origin + base]]) {
        assert.equal(alternates.filter(link => link.hreflang === lang && link.href === url).length, 1);
      }
      const entry = sitemapURLs.find(node => node.getElementsByTagName('loc')[0].textContent === canonical);
      assert(entry, pathname + ' missing from sitemap');
      const xmlAlternates = [...entry.getElementsByTagName('xhtml:link')];
      assert.equal(xmlAlternates.length, 3);
      for (const alternate of alternates) assert(xmlAlternates.some(link => link.getAttribute('hreflang') === alternate.hreflang && link.getAttribute('href') === alternate.href));
    }
    assert.equal(doc.querySelectorAll('meta[name="robots"]').length, 1);
    assert.equal(doc.querySelector('meta[name="robots"]').content, noindex ? 'noindex,follow' : 'index,follow');
    for (const [selector, value] of [
      ['meta[property="og:title"]', doc.title], ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', canonical], ['meta[name="twitter:title"]', doc.title],
      ['meta[name="twitter:description"]', description],
    ]) {
      assert.equal(doc.querySelectorAll(selector).length, 1);
      assert.equal(doc.querySelector(selector).content, value);
    }
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const url = doc.querySelector(selector).content;
      assert(url.startsWith(origin + '/'));
      assert(fs.existsSync(path.join(build, url.slice(origin.length))));
    }
    const scripts = [...doc.querySelectorAll('script[type="application/ld+json"]')];
    assert.equal(scripts.length, 1);
    const data = JSON.parse(scripts[0].textContent);
    assert.equal(data['@context'], 'https://schema.org');
    const graph = data['@graph'];
    assert.equal(new Set(graph.map(node => node['@id'])).size, graph.length);
    const org = graph.find(node => node['@type'] === 'Organization');
    assert.equal(org.legalName, 'Upxero OÜ');
    assert.equal(org.vatID, 'EE102522936');
    assert(!JSON.stringify(data).match(/aggregateRating|reviewRating|GloriaFood|Talent|WhatsApp|commission|commiss/i));
    const page = graph.find(node => node.url === canonical && ['WebPage', 'AboutPage', 'ContactPage'].includes(node['@type']));
    assert(page); assert.equal(page.inLanguage, nl ? 'nl' : 'en');
    const root = doc.querySelector('#root[data-prerendered="true"]');
    assert(root);
    const heading = root.querySelector('h1');
    assert(heading && heading.textContent.trim().length > 5, pathname + ' requires a real page heading');
    assert(root.textContent.trim().length > (noindex ? 200 : 800), pathname + ' lacks page content');
    assert(!root.textContent.includes('MISSING:'));
    if (!noindex) {
      const home = root.querySelector('header a:not(.skip-link)');
      assert.equal(home.getAttribute('href'), nl ? '/nl/' : '/');
    }
    if (base === '/pricing') {
      assert(root.textContent.includes('€19')); assert(root.textContent.includes('€29')); assert(root.textContent.includes('€49'));
      assert(root.textContent.includes(nl ? '€0/maand' : '€0/month'));
      assert.equal(root.querySelectorAll('table').length, 1);
    }
    if (base === '/contact') {
      assert(root.querySelector('form [name="email"][type="email"][required]'));
      assert(root.querySelector('button[type="submit"]').disabled, 'Submission must wait for hydration');
    }
    if (base === '/restaurant-portfolio') assert.equal(root.querySelectorAll('section a[target="_blank"]').length, 16);
    const rule = rules.find(([from]) => from === pathname);
    assert(rule && rule[1] === '/' + file && rule[2] === '200', 'Missing route rewrite: ' + pathname);
    dom.window.close();
  }
  console.log('Static verification: 20 localized bodies/heads, 18 sitemap URLs, canonical/hreflang, noindex, schema, assets and route rewrites passed.');
}

module.exports = { verifyHTML };
if (require.main === module) verifyHTML(path.resolve(__dirname, '../build'));
