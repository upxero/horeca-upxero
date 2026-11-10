import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from '../App';
import { createI18n } from '../i18n';
import { LanguageProvider } from '../i18n/LanguageProvider';
import { consentKey, readConsent, saveConsent, preferenceExpiry } from './analytics';

jest.mock('react-turnstile', () => () => <div />);
jest.mock('sonner', () => ({ Toaster: () => null, toast: { success: jest.fn(), error: jest.fn() } }));
let host, root, originalFetch;
const pause = () => new Promise(resolve => setTimeout(resolve, 20));
const button = text => [...document.querySelectorAll('button')].find(node => node.textContent === text);
async function click(node) {
  expect(node).toBeTruthy();
  await act(async () => { node.click(); await pause(); });
  await act(async () => { await pause(); });
}
async function mount(url) {
  await act(async () => root.render(<MemoryRouter initialEntries={[url]}>
    <LanguageProvider instance={createI18n()}><AppContent /></LanguageProvider>
  </MemoryRouter>));
}
beforeEach(() => {
  localStorage.clear(); sessionStorage.clear();
  host = document.createElement('div'); document.body.appendChild(host); root = createRoot(host);
  originalFetch = global.fetch; global.fetch = jest.fn().mockResolvedValue({ ok: true });
  if (!global.crypto) global.crypto = {};
  if (!global.crypto.randomUUID) Object.defineProperty(global.crypto, 'randomUUID', { configurable: true, value: () => 'test-random-event' });
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  HTMLElement.prototype.scrollIntoView = jest.fn();
});
afterEach(async () => {
  await act(async () => root.unmount()); host.remove();
  global.fetch = originalFetch; jest.restoreAllMocks();
});

test('no analytics before consent, close is not consent, reject persists, allow is minimal, withdrawal stops future events', async () => {
  localStorage.setItem('cookieConsent', 'accepted'); // legacy acceptance must not authorize analytics
  await mount('/contact?private=secret#private');
  expect(global.fetch).not.toHaveBeenCalled();
  await click(button('Close'));
  expect(readConsent()).toBeNull(); expect(global.fetch).not.toHaveBeenCalled();
  await click(button('Privacy settings')); await click(button('Reject analytics'));
  expect(readConsent().analytics).toBe(false); expect(global.fetch).not.toHaveBeenCalled();
  await click(button('Privacy settings')); await click(button('Allow analytics'));
  expect(global.fetch).toHaveBeenCalledTimes(1);
  const [endpoint, options] = global.fetch.mock.calls[0];
  expect(endpoint).toBe('https://us.i.posthog.com/i/v0/e/');
  expect(options.credentials).toBe('omit'); expect(options.referrerPolicy).toBe('no-referrer');
  const event = JSON.parse(options.body);
  expect(event.event).toBe('$pageview');
  expect(event.properties.$current_url).toBe('https://www.upxero.com/contact');
  expect(event.properties.$process_person_profile).toBe(false);
  expect(options.body).not.toMatch(/secret|private|email|message|identify|replay/);
  localStorage.setItem('ph_example_posthog', 'legacy');
  await click(button('Privacy settings')); await click(button('Reject analytics'));
  expect(options.signal.aborted).toBe(true);
  expect(localStorage.getItem('ph_example_posthog')).toBeNull();
  await click(document.querySelector('button[aria-label="Dutch"]'));
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test('versioned consent expires after six calendar months and ignores invalid or old preferences', () => {
  const start = Date.UTC(2026, 0, 10);
  expect(preferenceExpiry(start)).toBe(Date.UTC(2026, 6, 10));
  localStorage.setItem(consentKey, JSON.stringify({ version: 0, analytics: true, expires: start + 1 }));
  expect(readConsent(start)).toBeNull();
  const saved = saveConsent(false);
  expect(saved.version).toBe(1); expect(readConsent(saved.expires)).toBeNull();
});

test.each(['', '/nl'])('package CTA and localized form intent stay synchronized at %s', async prefix => {
  await mount(prefix + '/pricing');
  const links = [...host.querySelectorAll('a[href*="?plan="]')];
  expect(links.map(node => node.getAttribute('href'))).toEqual(['start', 'grow', 'boost'].map(plan => prefix + '/contact?plan=' + plan));
  expect(host.querySelector('a button,button a')).toBeNull();
  expect(host.querySelector('main#main-content')).toBeTruthy();
  expect(host.querySelector('th[scope=row]')).toBeTruthy();
  await click(links[2]);
  expect(host.querySelector('[name=planInterest]').value).toBe('boost');
  await act(async () => {
    const select = host.querySelector('[name=planInterest]'); select.value = 'start';
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await click(host.querySelector('button[aria-label="' + (prefix ? 'Engels' : 'Dutch') + '"]'));
  expect(host.querySelector('[name=planInterest]').value).toBe('start');
});

test.each(['start', 'grow', 'boost', 'invalid'])('whitelisted direct Contact plan: %s', async plan => {
  await mount('/contact?plan=' + plan);
  expect(host.querySelector('[name=planInterest]').value).toBe(plan === 'invalid' ? 'grow' : plan);
});

test('Grow upgrade subject takes precedence over a conflicting plan', async () => {
  await mount('/contact?plan=start&subject=upgrade-grow');
  expect(host.querySelector('[name=planInterest]').value).toBe('grow');
  expect(host.querySelector('#upgrade-subject')).toBeTruthy();
});

test.each(['', '/nl'])('unknown route has localized usable noindex content at %s', async prefix => {
  await mount(prefix + '/does-not-exist');
  expect(host.querySelector('h1').textContent).toBe(prefix ? 'Pagina niet gevonden' : 'Page not found');
  expect(document.querySelector('meta[name=robots]').content).toBe('noindex,follow');
  expect(document.querySelector('link[rel=canonical]')).toBeNull();
  expect(host.querySelector('main a').getAttribute('href')).toBe(prefix ? '/nl/' : '/');
});

test('Thank You uses the actual central selector and support dialog has accessible semantics', async () => {
  await mount('/bedankt');
  expect(host.textContent).not.toContain('has been activated');
  await click(host.querySelector('button[aria-label="Dutch"]'));
  expect(host.querySelector('h1').textContent).toBe('Bedankt dat u voor Upxero kiest');
  const trigger = host.querySelector('button[aria-label="Chatopties openen"]') || [...host.querySelectorAll('button')].find(node => node.querySelector('svg.lucide-message-circle'));
  await click(trigger);
  const dialog = document.querySelector('[role=dialog]');
  expect(dialog).toBeTruthy(); expect(dialog.getAttribute('aria-modal')).toBe('true');
  expect(dialog.contains(document.activeElement)).toBe(true);
});
