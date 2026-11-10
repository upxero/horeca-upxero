import React, { act } from 'react';
import { renderToString } from 'react-dom/server.node';
import { hydrateRoot } from 'react-dom/client';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { AppContent } from '../App';
import { LanguageProvider } from '../i18n/LanguageProvider';
import { createI18n } from '../i18n';
import { getLanguage } from '../i18n/routes';
import { getSEO, headElements, prerenderPaths, renderHead, renderSitemap, siteUrl } from './model';
import { applySEO } from '../hooks/useSEO';

jest.mock('react-turnstile', () => function MockTurnstile() { return <div data-testid="captcha" />; });
jest.mock('sonner', () => ({
  Toaster: () => null, toast: { success: jest.fn(), error: jest.fn() },
}));

let host, root, navigate, location, originalFetch;
function Probe() { navigate = useNavigate(); location = useLocation(); return null; }
const tree = (url, instance) => <React.StrictMode><div className="App">
  <MemoryRouter initialEntries={[url]}>
    <LanguageProvider instance={instance}><Probe /><AppContent /></LanguageProvider>
  </MemoryRouter>
</div></React.StrictMode>;

beforeEach(() => {
  localStorage.clear();
  host = document.createElement('div'); document.body.appendChild(host);
  originalFetch = global.fetch;
  global.fetch = jest.fn(() => { throw new Error('Network forbidden in SEO tests'); });
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  if (!HTMLElement.prototype.scrollIntoView) HTMLElement.prototype.scrollIntoView = () => {};
  jest.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
});
afterEach(async () => {
  if (root) await act(async () => root.unmount());
  root = null; host.remove(); global.fetch = originalFetch; jest.restoreAllMocks();
  document.head.querySelectorAll('title,meta[name="description"],meta[name="robots"],link[rel="canonical"],link[hreflang],meta[property^="og:"],meta[name^="twitter:"],script[type="application/ld+json"]').forEach(node => node.remove());
});
async function click(node) {
  expect(node).not.toBeNull();
  await act(async () => node.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 })));
}
async function hydrate(url, serverURL = url) {
  const language = getLanguage(url);
  host.innerHTML = renderToString(tree(serverURL, createI18n(language)));
  const originalHeading = host.querySelector('h1');
  const errors = [];
  await act(async () => {
    root = hydrateRoot(host, tree(url, createI18n(language)), { onRecoverableError: error => errors.push(error) });
  });
  expect(errors).toEqual([]);
  expect(host.querySelector('h1')).toBe(originalHeading);
}

test.each(prerenderPaths)('localized SEO and meaningful page hydration at %s', async pathname => {
  const seo = getSEO(pathname);
  const nl = pathname.startsWith('/nl');
  expect(seo.language).toBe(nl ? 'nl' : 'en');
  expect(seo.canonical).toBe(siteUrl + pathname);
  expect(seo.title).not.toMatch(/commission|commiss|WhatsApp|\bAI\b|Talent/i);
  expect(seo.description).not.toMatch(/commission|commiss|WhatsApp|\bAI\b|Talent|reservation|reservatie/i);
  host.innerHTML = renderToString(tree(pathname, createI18n(seo.language)));
  expect(host.querySelector('h1')).not.toBeNull();
  expect(host.textContent.length).toBeGreaterThan(pathname.includes('bedankt') ? 200 : 800);
  const expectedHeading = host.querySelector('h1');
  if (pathname.endsWith('/contact')) expect(host.querySelector('button[type="submit"]').disabled).toBe(true);
  const errors = [];
  await act(async () => root = hydrateRoot(host, tree(pathname, createI18n(seo.language)), { onRecoverableError: error => errors.push(error) }));
  expect(errors).toEqual([]);
  expect(host.querySelector('h1')).toBe(expectedHeading);
  if (pathname.endsWith('/contact')) expect(host.querySelector('button[type="submit"]').disabled).toBe(false);
  expect(document.title).toBe(seo.title);
  expect(document.documentElement.lang).toBe(seo.language);
  expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  expect(document.querySelector('link[rel="canonical"]').href).toBe(seo.canonical);
  expect(document.querySelector('meta[name="robots"]').content).toBe(seo.robots);
  expect(document.querySelectorAll('link[hreflang]')).toHaveLength(seo.indexable ? 3 : 0);
  expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1);
  expect(global.fetch).not.toHaveBeenCalled();
});

test('metadata replaces duplicate tags and restores indexing when leaving Thank You', async () => {
  document.head.insertAdjacentHTML('beforeend', '<link rel="canonical" href="/wrong"><link rel="canonical" href="/wrong-again"><meta name="robots" content="noindex"><script type="application/ld+json">{}</script>');
  await hydrate('/nl/bedankt');
  expect(document.querySelector('meta[name="robots"]').content).toBe('noindex,follow');
  await act(async () => navigate('/pricing?plan=grow#plans'));
  expect(document.querySelector('meta[name="robots"]').content).toBe('index,follow');
  expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  expect(document.querySelector('link[rel="canonical"]').href).toBe(siteUrl + '/pricing');
  expect(document.querySelectorAll('link[hreflang]')).toHaveLength(3);
  expect(location.search).toBe('?plan=grow'); expect(location.hash).toBe('#plans');
  await act(async () => navigate('/nl/pricing?plan=grow#plans'));
  expect(document.title).toBe(getSEO('/nl/pricing').title);
  expect(document.querySelector('meta[property="og:url"]').content).toBe(siteUrl + '/nl/pricing');
  expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1);
});

test.each(['en', 'nl'])('query-aware contact hydration preserves drafts and language navigation in %s', async lang => {
  const prefix = lang === 'nl' ? '/nl' : '';
  await hydrate(prefix + '/contact?subject=upgrade-grow#form', prefix + '/contact');
  expect(host.querySelector('#upgrade-subject').value).toContain(lang === 'en' ? 'Grow' : 'Grow');
  const input = host.querySelector('[name="message"]');
  await act(async () => {
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(input, 'Unsent draft');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await click(host.querySelector('button[aria-label="' + (lang === 'en' ? 'Dutch' : 'Engels') + '"]'));
  const target = lang === 'en' ? '/nl/contact' : '/contact';
  expect(location.pathname).toBe(target);
  expect(location.search).toBe('?subject=upgrade-grow'); expect(location.hash).toBe('#form');
  expect(host.querySelector('[name="message"]')).toBe(input);
  expect(input.value).toBe('Unsent draft');
  expect(document.querySelector('link[rel="canonical"]').href).toBe(siteUrl + target);
  expect(localStorage.getItem('upxero.language')).toBe(lang === 'en' ? 'nl' : 'en');
  await click(host.querySelector('header nav a[href="' + (lang === 'en' ? '/nl/services' : '/services') + '"]'));
  expect(location.pathname).toBe(lang === 'en' ? '/nl/services' : '/services');
  expect(document.title).toBe(getSEO(location.pathname).title);
  expect(global.fetch).not.toHaveBeenCalled();
});

test('canonical and reciprocal language map exclude query/hash without changing their inputs', () => {
  expect(prerenderPaths).toHaveLength(20);
  for (const pathname of prerenderPaths) {
    const seo = getSEO(pathname + '?subject=upgrade-grow#plans');
    expect(seo.canonical).toBe(siteUrl + pathname);
    if (seo.indexable) {
      expect(seo.alternates.map(item => item.language)).toEqual(['en', 'nl', 'x-default']);
      for (const alternate of seo.alternates) {
        const counterpart = getSEO(new URL(alternate.url).pathname);
        expect(counterpart.alternates).toEqual(seo.alternates);
      }
    }
    const tags = headElements(seo);
    expect(tags.filter(tag => tag.attrs.rel === 'canonical')).toHaveLength(1);
    const markup = renderHead(seo);
    expect(markup).toContain('application/ld+json');
    expect(markup).not.toContain('undefined');
  }
});

test('sitemap and graph use current services, verified existing company details and no invented offers', () => {
  const xml = new DOMParser().parseFromString(renderSitemap(), 'application/xml');
  expect(xml.querySelectorAll('parsererror')).toHaveLength(0);
  expect(xml.querySelectorAll('url')).toHaveLength(18);
  expect(xml.documentElement.textContent).not.toContain('/bedankt');
  for (const pathname of prerenderPaths) {
    const graph = getSEO(pathname).structuredData['@graph'];
    const org = graph.find(item => item['@type'] === 'Organization');
    expect(org.legalName).toBe('Upxero OÜ'); expect(org.identifier.value).toBe('16534146');
    expect(org.address.addressCountry).toBe('EE');
    expect(graph.some(item => item['@type'] === 'Service')).toBe(pathname.endsWith('/services'));
    expect(JSON.stringify(graph)).not.toMatch(/aggregateRating|reviewRating|"offers"|"price"|Talent|GloriaFood|WhatsApp/i);
  }
});

test('unknown routes get noindex rather than retaining another page canonical', () => {
  expect(getSEO('/not-a-page')).toBeNull();
  applySEO(getSEO('/'));
  applySEO(null);
  expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(0);
  expect(document.querySelector('meta[name="robots"]').content).toBe('noindex,follow');
});

test.each(['/', '/bedankt', '/nl/bedankt'])('cached prerendered copyright hydrates cleanly across a year change at %s', async pathname => {
  const year = new Date().getFullYear();
  host.id = 'root';
  host.dataset.prerenderYear = String(year);
  host.innerHTML = renderToString(tree(pathname, createI18n(getLanguage(pathname))));
  expect(host.textContent).toContain('© ' + year);
  jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(year + 1);
  const errors = [];
  await act(async () => root = hydrateRoot(host, tree(pathname, createI18n(getLanguage(pathname))), { onRecoverableError: error => errors.push(error) }));
  expect(errors).toEqual([]);
  expect(host.textContent).toContain('© ' + (year + 1));
});
