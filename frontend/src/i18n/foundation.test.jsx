import React, { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Route, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageProvider, useLanguage } from './LanguageProvider';
import LocalizedRoutes from './LocalizedRoutes';
import { createI18n } from './index';
import { routePaths } from './routes';
import { languageStorageKey, readLanguagePreference, saveLanguagePreference } from './storage';

let host, root, controls;
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

function Probe() {
  const language = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [draft, setDraft] = useState('');
  controls = { ...language, navigate, location, draft, setDraft };
  return <p>{t('language.label')}</p>;
}

async function renderAt(url, instance = createI18n()) {
  await act(async () => root.render(
    <MemoryRouter initialEntries={[url]}>
      <LanguageProvider instance={instance}>
        <LocalizedRoutes>
          {routePaths.map(path => <Route key={path} path={path} element={<Probe />} />)}
        </LocalizedRoutes>
      </LanguageProvider>
    </MemoryRouter>
  ));
}

test.each(routePaths)('both URL variants resolve for %s and override saved preferences', async path => {
  localStorage.setItem(languageStorageKey, 'nl');
  await renderAt(path);
  expect(controls.language).toBe('en');
  expect(host.textContent).toBe('Language');
  expect(document.documentElement.lang).toBe('en');
  localStorage.setItem(languageStorageKey, 'en');
  await act(async () => controls.navigate(path === '/' ? '/nl/' : `/nl${path}`));
  expect(controls.language).toBe('nl');
  expect(host.textContent).toBe('Taal');
  expect(document.documentElement.lang).toBe('nl');
  expect(readLanguagePreference()).toBe('en');
});

test('switching preserves page, query, hash and draft; history follows URL language', async () => {
  await renderAt('/contact?plan=grow#form');
  await act(async () => controls.setDraft('Unsent customer message'));
  await act(async () => controls.switchLanguage('nl'));
  expect(controls.location.pathname).toBe('/nl/contact');
  expect(controls.location.search).toBe('?plan=grow');
  expect(controls.location.hash).toBe('#form');
  expect(controls.draft).toBe('Unsent customer message');
  expect(readLanguagePreference()).toBe('nl');
  expect(controls.localize('/pricing#plans')).toBe('/nl/pricing#plans');
  await act(async () => controls.navigate(-1));
  expect(controls.language).toBe('en');
  await act(async () => controls.navigate(1));
  expect(controls.language).toBe('nl');
  expect(controls.draft).toBe('Unsent customer message');
});

test('English is the default and the fallback for missing Dutch translations', () => {
  const instance = createI18n();
  expect(instance.language).toBe('en');
  instance.addResource('en', 'common', 'fallbackExample', 'English fallback');
  instance.changeLanguage('nl');
  expect(instance.t('fallbackExample')).toBe('English fallback');
});

test('validates stored preferences and only saves supported languages', () => {
  localStorage.setItem(languageStorageKey, 'fr');
  expect(readLanguagePreference()).toBeNull();
  saveLanguagePreference('invalid');
  expect(localStorage.getItem(languageStorageKey)).toBe('fr');
  saveLanguagePreference('nl');
  expect(readLanguagePreference()).toBe('nl');
});

test('storage failures do not prevent language switching', async () => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
  expect(readLanguagePreference()).toBeNull();
  await renderAt('/pricing');
  await act(async () => controls.switchLanguage('nl'));
  expect(controls.location.pathname).toBe('/nl/pricing');
  expect(document.documentElement.lang).toBe('nl');
});
