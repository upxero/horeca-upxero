import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Route, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { createI18n, resources } from './index';
import { LanguageProvider } from './LanguageProvider';
import LocalizedRoutes from './LocalizedRoutes';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Pricing from '../pages/Pricing';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Portfolio from '../pages/PortfolioRestaurants';
import Privacy from '../pages/PrivacyPolicy';
import Terms from '../pages/TermsConditions';
import Cookies from '../pages/CookiePolicy';
import ThankYou from '../pages/ThankYou';
import { getPricingPlans } from '../mock';

jest.mock('react-turnstile', () => function MockTurnstile({ onVerify }) {
  return <button type="button" onClick={() => onVerify('mock-token')}>Verify test CAPTCHA</button>;
});
jest.mock('sonner', () => ({ toast: { success: jest.fn(), error: jest.fn() } }));

const pages = [
  ['home', '/', Home, 'Your restaurant online', 'Uw restaurant online'],
  ['services', '/services', Services, 'Our Services', 'Onze Diensten'],
  ['pricing', '/pricing', Pricing, 'Transparent Pricing', 'Transparante Prijzen'],
  ['about', '/about', About, 'About Upxero', 'Over Upxero'],
  ['contact', '/contact', Contact, 'Request a no-obligation initial preview', 'Vraag een vrijblijvende eerste preview aan'],
  ['portfolio', '/restaurant-portfolio', Portfolio, 'Portfolio Upxero', 'Portfolio Upxero'],
  ['privacy', '/privacy-policy', Privacy, 'Privacy Policy', 'Privacybeleid'],
  ['terms', '/terms-conditions', Terms, 'Terms & Conditions', 'Algemene Voorwaarden'],
  ['cookies', '/cookie-policy', Cookies, 'Cookie Policy', 'Cookiebeleid'],
  ['thankYou', '/bedankt', ThankYou, 'Thank you for choosing Upxero', 'Bedankt dat u voor Upxero kiest'],
];

let host, root, location, instance, originalFetch;
function LocationProbe() { location = useLocation(); return null; }
const compact = text => text.replace(/\s+/g, ' ').trim();
beforeEach(() => {
  localStorage.clear();
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  originalFetch = global.fetch;
  global.fetch = jest.fn(() => { throw new Error('Unexpected network request in page test'); });
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});
afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  global.fetch = originalFetch;
  jest.restoreAllMocks();
  jest.clearAllMocks();
  jest.useRealTimers();
});
async function mount(url) {
  instance = createI18n();
  instance.options.parseMissingKeyHandler = key => `MISSING:${key}`;
  await act(async () => root.render(
    <MemoryRouter initialEntries={[url]}>
      <LanguageProvider instance={instance}>
        <LocationProbe />
        <LocalizedRoutes>
          {pages.map(([ns, path, Page]) => <Route key={path} path={path} element={<>

            <Page />
          </>} />)}
        </LocalizedRoutes>
      </LanguageProvider>
    </MemoryRouter>
  ));
}
async function click(element) {
  expect(element).not.toBeNull();
  await act(async () => element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 })));
}
const languageButton = label => host.querySelector(`button[aria-label="${label}"]`);
async function setValue(name, value) {
  const field = host.querySelector(`[name="${name}"]`);
  await act(async () => {
    if (field.tagName === 'SELECT') {
      field.value = value;
      field.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      const prototype = field.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(prototype, 'value').set.call(field, value);
      field.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  return field;
}

test.each(pages)('%s renders and switches both language URLs without missing keys', async (ns, path, Page, english, dutch) => {
  localStorage.setItem('upxero.language', 'nl');
  await mount(path);
  expect(compact(host.querySelector('h1').textContent)).toContain(english);
  expect(host.textContent).not.toContain('MISSING:');
  await click(languageButton('Dutch'));
  expect(location.pathname).toBe(path === '/' ? '/nl/' : `/nl${path}`);
  expect(compact(host.querySelector('h1').textContent)).toContain(dutch);
  expect(host.textContent).not.toContain('MISSING:');
  for (const link of host.querySelectorAll('a[href^="/"]')) {
    expect(link.getAttribute('href')).toMatch(/^\/nl(?:\/|$)/);
  }
  await click(languageButton('Engels'));
  expect(location.pathname).toBe(path);
  expect(compact(host.querySelector('h1').textContent)).toContain(english);
  expect(global.fetch).not.toHaveBeenCalled();
});

test.each(pages)('%s supports direct Dutch entry', async (ns, path, Page, english, dutch) => {
  await mount(path === '/' ? '/nl/' : `/nl${path}`);
  expect(compact(host.querySelector('h1').textContent)).toContain(dutch);
  expect(document.documentElement.lang).toBe('nl');
  expect(host.textContent).not.toContain('MISSING:');
});

test.each(['/', '/nl/', '/services', '/nl/services', '/pricing', '/nl/pricing'])('Ordering brand is clear without repeated logos at %s', async pathname => {
  await mount(pathname);
  const logos = host.querySelectorAll('main img[src="/images/upxero-ordering-logo.png"]');
  expect(logos).toHaveLength(1);
  expect(logos[0].getAttribute('alt')).toBe(''); // Adjacent heading/row label already names the product.
  expect(logos[0].getAttribute('width')).toBe('2172');
  expect(logos[0].getAttribute('height')).toBe('724');
  expect(host.querySelector('header img').getAttribute('src')).toBe('/images/logo-white.png');
  const label = pathname.startsWith('/nl') ? 'Probeer Ordering gratis' : 'Try Ordering Free';
  expect(host.querySelector('header a[href="https://ordering.upxero.com"]').textContent.trim()).toBe(label);
  if (pathname.endsWith('/pricing')) {
    expect(logos[0].closest('th').textContent).toContain(instance.t('content:orderingProIncluded'));
    const cells = logos[0].closest('tr').querySelectorAll('td');
    expect(cells[0].textContent).toContain(instance.t('content:notIncluded'));
    expect(cells[1].textContent).toContain(instance.t('content:included'));
    expect(cells[2].textContent).toContain(instance.t('content:included'));
  } else if (!pathname.includes('services')) {
    const card = logos[0].parentElement;
    expect(card.textContent).toContain(instance.t('home:orderingIntro'));
    expect(card.querySelector('a').getAttribute('href')).toBe('https://ordering.upxero.com');
    expect(card.querySelector('a').textContent).toBe(label);
    expect(card.querySelector('a').getAttribute('rel')).toBe('noopener noreferrer');
  }
  expect(host.textContent).not.toContain('MISSING:');
});

test.each(['en', 'nl'])('About founder and collaborator roles are distinct in %s', async language => {
  await mount(language === 'nl' ? '/nl/about' : '/about');
  const dictionary = resources[language].about;
  const michael = [...host.querySelectorAll('h3')].find(node => node.textContent.trim() === 'Michael Bernard');
  const safi = [...host.querySelectorAll('h3')].find(node => node.textContent.trim() === 'Safi');
  expect(michael).toBeTruthy(); expect(safi).toBeTruthy();
  expect(michael.parentElement.textContent).toContain(language === 'nl' ? 'Oprichter & eigenaar van Upxero OÜ' : 'Founder & Owner of Upxero OÜ');
  expect(safi.parentElement.textContent).toContain(language === 'nl' ? 'Technisch samenwerkingspartner' : 'Technical Collaboration Partner');
  expect(safi.parentElement.textContent).not.toMatch(/founder|owner|oprichter|eigenaar/i);
  for (const key of ['teamDescription', 'teamCollaboration', 'michaelDescription', 'michaelBackground', 'michaelGoal', 'safiSupportsUpxeroInDevelopingScalableDigitalSolutions', 'safiCollaboration']) {
    expect(host.textContent).toContain(dictionary[key]);
  }
  expect(michael.parentElement.querySelector('img').getAttribute('src')).toBe('/images/michael.png');
  expect(safi.parentElement.querySelector('img').getAttribute('src')).toBe('/images/safi.png');
  expect(host.textContent).not.toContain('MISSING:');
});

test('all namespaces are registered with matching, nonempty translations and English fallback', async () => {
  expect(Object.keys(resources.en).sort()).toEqual(['common', ...pages.map(p => p[0]), 'content', 'seo'].sort());
  const flatten = (object, prefix = '') => Object.entries(object).flatMap(([key, value]) =>
    typeof value === 'object' ? flatten(value, `${prefix}${key}.`) : [[`${prefix}${key}`, value]]);
  const testInstance = createI18n();
  for (const [ns, english] of Object.entries(resources.en)) {
    const englishEntries = flatten(english), dutch = Object.fromEntries(flatten(resources.nl[ns]));
    expect(Object.keys(dutch).sort()).toEqual(englishEntries.map(([key]) => key).sort());
    for (const [key, value] of englishEntries) {
      expect(value.trim()).not.toBe('');
      expect(dutch[key].trim()).not.toBe('');
      expect(testInstance.exists(`${ns}:${key}`, { lng: 'en', fallbackLng: false })).toBe(true);
      expect(testInstance.exists(`${ns}:${key}`, { lng: 'nl', fallbackLng: false })).toBe(true);
    }
  }
  testInstance.addResource('en', 'home', 'fallbackProbe', 'English fallback');
  await testInstance.changeLanguage('nl');
  expect(testInstance.t('home:fallbackProbe')).toBe('English fallback');
});

test('portfolio has only the shared selector, preserves all project cards and translates notes', async () => {
  await mount('/restaurant-portfolio');
  const names = [...host.querySelectorAll('h3')].filter(n => !n.closest('footer')).map(n => n.textContent);
  expect(names).toEqual(['Korat Thai Sint-Niklaas', 'New Edo Sushi', 'Janya Thai Wok', 'Akira Sushi', 'Nakhon Thai', 'Little Thai by Sanito', 'Taverne Kopenhagen', 'Okaya Sushi Restaurant', 'AK Taekwondo Pakchong', 'De Grave VOF', 'KJ Events', 'Meijin Ryu Karate', 'Donovan Tack', 'De Flexi Jobber', 'Learn Dutch BBB', 'Learn Dutch Online']);
  const projects = () => [...host.querySelectorAll('section a[target="_blank"]')].map(a => ({ href: a.href, rel: a.rel }));
  const originals = projects();
  expect(originals).toHaveLength(16);
  expect(originals.every(p => p.rel === 'noopener noreferrer')).toBe(true);
  expect([...host.querySelectorAll('button')].filter(b => ['EN', 'NL'].includes(b.textContent.trim()))).toHaveLength(2);
  expect(host.textContent).toContain('Website + online reservations');
  await click(languageButton('Dutch'));
  expect(host.textContent).toContain('Website + online reservatie');
  expect(host.textContent).toContain('Webontwikkeling');
  expect(host.textContent).toContain('Ontwikkeling van React-applicaties');
  expect(projects()).toEqual(originals);
});

test('contact validation translates and drafts, options, query and hash survive switching', async () => {
  await mount('/contact?plan=grow#form');
  const name = host.querySelector('[name="name"]');
  await act(async () => name.dispatchEvent(new Event('invalid', { cancelable: true })));
  expect(name.validationMessage).toBe('Please fill in this field.');
  const email = await setValue('email', 'invalid-email');
  expect(email.validationMessage).toBe('Please enter a valid email address.');
  await setValue('message', 'Unsent test draft');
  await setValue('planInterest', 'boost');
  await setValue('source', 'referral');
  await click(languageButton('Dutch'));
  expect(name.validationMessage).toBe('Vul dit veld in.');
  expect(email.validationMessage).toBe('Vul een geldig e-mailadres in.');
  expect(location.search).toBe('?plan=grow');
  expect(location.hash).toBe('#form');
  expect(host.querySelector('[name="message"]').value).toBe('Unsent test draft');
  expect(host.querySelector('[name="planInterest"]').value).toBe('boost');
  expect(host.querySelector('[name="source"]').value).toBe('referral');
  await setValue('name', 'Test Customer');
  await setValue('email', 'test@example.com');
  expect(name.validity.valid).toBe(true);
  expect(email.validity.valid).toBe(true);
  expect(name.required).toBe(true);
  expect(email.type).toBe('email');
  expect(host.querySelector('[name="phone"]').required).toBe(true);
  expect(global.fetch).not.toHaveBeenCalled();
});

test.each(['en', 'nl'])('mocked contact success keeps endpoint, payload and reset behavior in %s', async lang => {
  jest.useFakeTimers();
  await mount(lang === 'en' ? '/contact' : '/nl/contact');
  for (const [name, value] of Object.entries({ name: 'Test Customer', email: 'test@example.com', phone: '+32123456789', business: 'Test Business', message: 'Test enquiry' })) await setValue(name, value);
  await click([...host.querySelectorAll('button')].find(b => b.textContent === 'Verify test CAPTCHA'));
  global.fetch.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
  await act(async () => host.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  expect(global.fetch).toHaveBeenCalledTimes(1);
  const [url, request] = global.fetch.mock.calls[0];
  expect(url).toBe('/.netlify/functions/contact');
  expect(request.method).toBe('POST');
  expect(JSON.parse(request.body)).toEqual({ name: 'Test Customer', email: 'test@example.com', phone: '+32123456789', business: 'Test Business', source: '', message: 'Test enquiry', planInterest: 'grow', turnstileToken: 'mock-token' });
  expect(toast.success).toHaveBeenCalledWith(instance.t('contact:thankYouForYourEnquiryWeWillContact'));
  expect(host.querySelector('button[type="submit"]').textContent).toContain(lang === 'en' ? 'Sent!' : 'Verzonden!');
  await act(async () => jest.advanceTimersByTime(3000));
  expect(host.querySelector('[name="name"]').value).toBe('');
  expect(host.querySelector('[name="planInterest"]').value).toBe('grow');
});

test.each(['en', 'nl'])('mocked contact failure keeps the draft and translates feedback in %s', async lang => {
  await mount(lang === 'en' ? '/contact' : '/nl/contact');
  await setValue('message', 'Unsent test draft');
  global.fetch.mockResolvedValue({ ok: false });
  jest.spyOn(console, 'error').mockImplementation(() => {});
  await act(async () => host.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  expect(toast.error).toHaveBeenCalledWith(instance.t('contact:somethingWentWrongPleaseTryAgainLaterOr'));
  expect(host.querySelector('[name="message"]').value).toBe('Unsent test draft');
  expect(host.querySelector('button[type="submit"]').disabled).toBe(false);
});

test('pricing FAQ states the approved new six-month term and written notice in both languages', async () => {
  await mount('/pricing');
  await click([...host.querySelectorAll('button')].find(b => b.textContent.includes('Can I cancel whenever I want?')));
  expect(host.textContent).toContain('minimum term of six months');
  expect(host.textContent).toContain("30 days' written notice by email");
  expect(host.textContent).not.toContain('Cancel monthly.');
  await click(languageButton('Dutch'));
  expect(host.textContent).toContain('minimumlooptijd van zes maanden');
  expect(host.textContent).toContain('30 dagen schriftelijke opzegtermijn per e-mail');
  expect(host.textContent).not.toContain('Maandelijks opzegbaar.');
});

test.each(['en', 'nl'])('website package prices and Ordering inclusions remain distinct in %s', lang => {
  const i18n = createI18n(lang);
  const plans = getPricingPlans(i18n.t.bind(i18n));
  expect(plans.map(p => [p.name, p.price, p.setupPrice])).toEqual([['Start', '19', 100], ['Grow', '29', 200], ['Boost', '49', 250]]);
  expect(plans[0].features).toContain(i18n.t('content:orderingFreeAvailable'));
  expect(plans[0].features).toContain(i18n.t('content:orderingProNotIncluded'));
  expect(plans[0].features).not.toContain(i18n.t('content:orderingProIncluded'));
  expect(plans.slice(1).every(p => p.features.includes(i18n.t('content:orderingProIncluded')))).toBe(true);
  expect(JSON.stringify(plans)).not.toMatch(/talent|vacan|vacature|\bAI\b|WhatsApp|Google Business/i);
});

test.each(['en', 'nl'])('pricing links Start upgrades to the localized contact query in %s', async lang => {
  await mount(lang === 'en' ? '/pricing' : '/nl/pricing');
  const link = host.querySelector('a[href$="contact?subject=upgrade-grow"]');
  expect(link.getAttribute('href')).toBe(lang === 'en' ? '/contact?subject=upgrade-grow' : '/nl/contact?subject=upgrade-grow');
  expect(link.textContent).toBe(lang === 'en' ? 'Request an upgrade to Grow' : 'Upgrade naar Grow aanvragen');
  expect(host.querySelector('table').textContent).toContain(instance.t('content:orderingProIncluded'));
  expect(host.textContent).not.toMatch(/talent|vacan|vacature/i);
});

test.each(['en', 'nl'])('Grow query identifies a manual request and preserves drafts through language switching in %s', async lang => {
  await mount(`${lang === 'en' ? '' : '/nl'}/contact?subject=upgrade-grow#form`);
  expect(host.querySelector('#upgrade-subject').readOnly).toBe(true);
  expect(host.querySelector('#upgrade-subject').value).toBe(instance.t('contact:upgradeSubject'));
  expect(host.querySelector('[name="planInterest"]').value).toBe('grow');
  await setValue('message', 'Test upgrade draft');
  await click(languageButton(lang === 'en' ? 'Dutch' : 'Engels'));
  expect(location.search).toBe('?subject=upgrade-grow');
  expect(location.hash).toBe('#form');
  expect(host.querySelector('[name="message"]').value).toBe('Test upgrade draft');
  expect(host.querySelector('#upgrade-subject').value).toBe(instance.t('contact:upgradeSubject'));
  expect(global.fetch).not.toHaveBeenCalled();
  global.fetch.mockResolvedValue({ ok: false });
  jest.spyOn(console, 'error').mockImplementation(() => {});
  await act(async () => host.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  const [url, request] = global.fetch.mock.calls[0];
  expect(url).toBe('/.netlify/functions/contact');
  expect(JSON.parse(request.body).message).toBe(`${instance.t('contact:upgradeSubject')}\n\nTest upgrade draft`);
  expect(Object.keys(JSON.parse(request.body)).sort()).toEqual(['name', 'email', 'phone', 'business', 'source', 'message', 'planInterest', 'turnstileToken'].sort());
});

test('unknown subject query text is not reflected into the form', async () => {
  await mount('/contact?subject=%3Cscript%3Euntrusted%3C%2Fscript%3E');
  expect(host.querySelector('#upgrade-subject')).toBeNull();
  expect(host.textContent).not.toContain('untrusted');
  expect(host.querySelector('[name="message"]').value).toBe('');
});


test.each(['en', 'nl'])('standalone Free and manual Pro inclusions are clear without a standalone Pro price in %s', async lang => {
  await mount(lang === 'en' ? '/pricing' : '/nl/pricing');
  const ordering = host.querySelector('#ordering');
  expect(ordering.textContent).toContain(lang === 'en' ? '€0/month' : '€0/maand');
  expect(ordering.textContent).toContain(instance.t('pricing:orderingIndependent'));
  expect(ordering.textContent).toContain(instance.t('pricing:orderingProDescription'));
  expect(ordering.textContent).toContain(instance.t('pricing:proActivation'));
  const cta = ordering.querySelector('a');
  expect(cta.href).toBe('https://ordering.upxero.com/');
  expect(cta.textContent).toBe(lang === 'en' ? 'Start for Free' : 'Gratis starten');
  expect(cta.rel).toBe('noopener noreferrer');
  expect(ordering.textContent).not.toMatch(/[$€]\\s*(15|19|9[.,]99)/);
  expect(host.querySelector('table').textContent).not.toMatch(/vacan|vacature|GloriaFood|Stripe|WhatsApp|\\bAI\\b/i);
  expect(host.textContent).not.toContain('MISSING:');
});

test('commercial dictionaries contain no discontinued recruitment or obsolete payment promotions', () => {
  for (const lang of ['en', 'nl']) {
    const commercial = ['home', 'services', 'about', 'contact', 'pricing', 'content', 'common'].map(ns => resources[lang][ns]);
    expect(JSON.stringify(commercial)).not.toMatch(/talent\\.upxero|Talent by Upxero|vacanc|vacatur|GloriaFood|Stripe|\\+€25/);
  }
});
