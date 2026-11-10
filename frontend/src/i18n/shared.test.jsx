import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Route, useLocation } from 'react-router-dom';
import LocalizedRoutes from './LocalizedRoutes';
import Contact from '../pages/Contact';
import { LanguageProvider } from './LanguageProvider';
import { createI18n } from './index';
import { languageStorageKey } from './storage';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { WhatsAppPopup } from '../components/WhatsAppPopup';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { FloatingSupportHint } from '../components/FloatingSupportHint';
import { ScrollToTop } from '../components/ScrollToTop';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import en from './locales/en/common.json';
import nl from './locales/nl/common.json';

jest.mock('react-turnstile', () => () => null);

let root, host, currentLocation;
function LocationProbe() { currentLocation = useLocation(); return null; }
beforeEach(() => {
  localStorage.clear();
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
});
afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  jest.restoreAllMocks();
});
async function mount(url, children) {
  await act(async () => root.render(<MemoryRouter initialEntries={[url]}>
    <LanguageProvider instance={createI18n()}><LocationProbe />{children}</LanguageProvider>
  </MemoryRouter>));
}
async function click(element) {
  expect(element).not.toBeNull();
  await act(async () => element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 })));
}
const button = label => host.querySelector(`button[aria-label="${label}"]`);

test.each([
  ['en', '/services', 'Services', 'English', 'Open navigation menu'],
  ['nl', '/nl/services', 'Diensten', 'Nederlands', 'Navigatiemenu openen'],
])('Header labels, links, active state and single selector in %s', async (lang, url, services, active, menu) => {
  await mount(url, <Header />);
  expect(host.querySelectorAll('[role="group"]')).toHaveLength(1);
  expect(button(active).getAttribute('aria-pressed')).toBe('true');
  expect(button(active).className).toContain('bg-blue-900');
  expect(button(active).className).toContain('focus-visible:ring-2');
  button(active).focus();
  expect(document.activeElement).toBe(button(active));
  const desktop = host.querySelector('nav');
  expect(desktop.className).toContain('hidden xl:flex');
  expect(desktop.querySelector('[aria-current="page"]').textContent).toContain(services);
  expect(desktop.querySelector('[aria-current="page"]').getAttribute('href')).toBe(url);
  expect(host.querySelector('img').getAttribute('src')).toBe('/images/logo-white.png');
  expect(host.querySelector('header a:not(.skip-link)').getAttribute('href')).toBe(lang === 'nl' ? '/nl/' : '/');
  expect(host.querySelector('a[href="https://ordering.upxero.com"]').textContent.trim()).toBe(lang === 'nl' ? 'Probeer Ordering gratis' : 'Try Ordering Free');
  expect(button(menu).getAttribute('aria-expanded')).toBe('false');
  await click(button(menu));
  const mobile = host.querySelector('#mobile-navigation');
  expect(mobile.querySelector('a[href="https://ordering.upxero.com"]').textContent.trim()).toBe(lang === 'nl' ? 'Probeer Ordering gratis' : 'Try Ordering Free');
  expect(mobile.className).toContain('xl:hidden');
  expect(host.querySelectorAll('[role="group"]')).toHaveLength(1);
  expect(mobile.textContent).toContain(services);
  expect(host.querySelector('button[aria-expanded]').getAttribute('aria-expanded')).toBe('true');
  const contact = mobile.querySelector(`a[href="${lang === 'nl' ? '/nl/contact' : '/contact'}"]`);
  await click(contact);
  expect(currentLocation.pathname).toBe(lang === 'nl' ? '/nl/contact' : '/contact');
  expect(host.querySelector('#mobile-navigation')).toBeNull();
});

test('selector preserves query/hash, stores selection and translates open mobile menu', async () => {
  localStorage.setItem(languageStorageKey, 'en');
  await mount('/nl/pricing?plan=grow#plans', <Header />);
  await click(button('Navigatiemenu openen'));
  await click(button('Engels'));
  expect(currentLocation.pathname).toBe('/pricing');
  expect(currentLocation.search).toBe('?plan=grow');
  expect(currentLocation.hash).toBe('#plans');
  expect(localStorage.getItem(languageStorageKey)).toBe('en');
  expect(document.documentElement.lang).toBe('en');
  expect(host.querySelector('#mobile-navigation').textContent).toContain('Request a Free Preview');
  expect(host.querySelector('a[href="https://ordering.upxero.com"]').getAttribute('target')).toBe('_blank');
});

test.each([['/', en, ''], ['/nl/', nl, '/nl']])('Footer and shared interfaces translate at %s', async (url, dict, prefix) => {
  const onClose = jest.fn(), onChat = jest.fn();
  await mount(url, <><Footer /><CookieBanner /><WhatsAppPopup onClose={onClose} />
    <WhatsAppButton onClick={onChat} /><FloatingSupportHint /><ScrollToTop /></>);
  expect(host.textContent).toContain(dict.footer.description);
  expect(host.textContent).toContain(dict.footer.quickLinks);
  expect(host.textContent).toContain(dict.support.desktop);
  expect(host.textContent).toContain(dict.support.mobile);
  expect(host.querySelector('footer a[href$="privacy-policy"]').getAttribute('href')).toBe(`${prefix}/privacy-policy`);
  expect(host.querySelector('footer a[href$="terms-conditions"]').getAttribute('href')).toBe(`${prefix}/terms-conditions`);
  expect(host.querySelector('footer img').getAttribute('src')).toBe('/images/logo-white.png');
  expect(host.querySelector('footer a[aria-label="Facebook"]')).not.toBeNull();
  expect(document.querySelector('a[href$="#plans"]').getAttribute('href')).toBe(`${prefix}/pricing#plans`);
  expect(document.querySelector('a[href$="#no-commissions"]').getAttribute('href')).toBe(`${prefix}/pricing#no-commissions`);
  expect(new URL(document.querySelector('a[href*="?text="]').href).searchParams.get('text')).toBe(dict.chat.prefill);
  expect(host.textContent).toContain(dict.cookie.title);
  const accept = [...host.querySelectorAll('button')].find(b => b.textContent === dict.cookie.reject);
  await click(accept);
  expect(JSON.parse(localStorage.getItem('upxero.privacy.v1')).analytics).toBe(false);
  expect(host.textContent).not.toContain(dict.cookie.title);
  await click(button(dict.chat.open));
  expect(onChat).toHaveBeenCalledTimes(1);
  await click(document.querySelector('[role=dialog] button'));
  expect(onClose).toHaveBeenCalledTimes(1);
  Object.defineProperty(window, 'pageYOffset', { configurable: true, value: 400 });
  await act(async () => window.dispatchEvent(new Event('scroll')));
  const scroll = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  await click(button(dict.scrollTop));
  expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
});

test('locale-only switches do not trigger scroll-to-top', async () => {
  const scroll = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  await mount('/services', <><Header /><ScrollToTopOnMount /></>);
  expect(scroll).toHaveBeenCalledTimes(1);
  await click(button('Dutch'));
  expect(scroll).toHaveBeenCalledTimes(1);
});

test('shared translation keys match and contain no empty values', () => {
  function keys(object, prefix = '') {
    return Object.entries(object).flatMap(([key, value]) => {
      if (typeof value === 'object') return keys(value, `${prefix}${key}.`);
      expect(typeof value).toBe('string');
      expect(value.trim()).not.toBe('');
      return `${prefix}${key}`;
    }).sort();
  }
  expect(keys(en)).toEqual(keys(nl));
});

test('Header switching preserves actual unsent contact fields without submission', async () => {
  const request = jest.fn();
  const originalFetch = global.fetch;
  global.fetch = request;
  try {
    await mount('/contact?plan=grow#form', <LocalizedRoutes>
      <Route path="/contact" element={<Contact />} />
    </LocalizedRoutes>);
    const values = { name: 'Test Customer', email: 'customer@example.com', business: 'Test Business', message: 'Unsent draft' };
    for (const [name, value] of Object.entries(values)) {
      const field = host.querySelector(`[name="${name}"]`);
      const prototype = name === 'message' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      await act(async () => {
        Object.getOwnPropertyDescriptor(prototype, 'value').set.call(field, value);
        field.dispatchEvent(new Event('input', { bubbles: true }));
      });
    }
    await click(button('Dutch'));
    expect(currentLocation.pathname).toBe('/nl/contact');
    for (const [name, value] of Object.entries(values)) {
      expect(host.querySelector(`[name="${name}"]`).value).toBe(value);
    }
    await click(button('Engels'));
    for (const [name, value] of Object.entries(values)) {
      expect(host.querySelector(`[name="${name}"]`).value).toBe(value);
    }
    expect(request).not.toHaveBeenCalled();
  } finally {
    global.fetch = originalFetch;
  }
});
