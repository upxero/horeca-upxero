import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from './LanguageProvider';
import { createI18n } from './index';
import Home from '../pages/Home';
import Pricing from '../pages/Pricing';

const conditionKeys = ['pageCounting', 'domainDetails', 'emailDetails', 'changesDetails', 'yesThereIsAMinimumTermOf6'];
let host, root;
beforeEach(() => { host = document.createElement('div'); document.body.appendChild(host); root = createRoot(host); });
afterEach(async () => { await act(async () => root.unmount()); host.remove(); });
test.each(['en', 'nl'])('Home has one complete, contained conditions block before View All Pricing in %s', async language => {
  const instance = createI18n(language), pathname = language === 'nl' ? '/nl/' : '/';
  await act(async () => root.render(<MemoryRouter initialEntries={[pathname]}><LanguageProvider instance={instance}><Home /></LanguageProvider></MemoryRouter>));
  const blocks = host.querySelectorAll('[data-package-conditions]');
  expect(blocks).toHaveLength(1);
  expect([...blocks[0].querySelectorAll('p')].map(node => node.textContent)).toEqual(conditionKeys.map(key => instance.t('content:' + key)));
  const section = blocks[0].closest('section');
  expect(section).not.toBeNull();
  const pricingLink = [...section.querySelectorAll('a')].find(node => node.textContent === instance.t('home:viewAllPricing'));
  expect(pricingLink).toBeTruthy();
  expect(blocks[0].compareDocumentPosition(pricingLink) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});
test.each(['en', 'nl'])('Pricing retains its full package conditions and FAQ in %s', async language => {
  const instance = createI18n(language), pathname = language === 'nl' ? '/nl/pricing' : '/pricing';
  await act(async () => root.render(<MemoryRouter initialEntries={[pathname]}><LanguageProvider instance={instance}><Pricing /></LanguageProvider></MemoryRouter>));
  const block = host.querySelector('[data-package-conditions]');
  expect([...block.querySelectorAll('p')].map(node => node.textContent)).toEqual(conditionKeys.map(key => instance.t('content:' + key)));
  expect(host.textContent).toContain(instance.t('content:pageQuestion'));
  expect(host.textContent).toContain(instance.t('content:changesQuestion'));
});
