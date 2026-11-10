import enSEO from './locales/en/seo.json';
import nlSEO from './locales/nl/seo.json';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import nl from './locales/nl/common.json';
import enAbout from './locales/en/about.json';
import nlAbout from './locales/nl/about.json';
import enContact from './locales/en/contact.json';
import nlContact from './locales/nl/contact.json';
import enContent from './locales/en/content.json';
import nlContent from './locales/nl/content.json';
import enCookies from './locales/en/cookies.json';
import nlCookies from './locales/nl/cookies.json';
import enHome from './locales/en/home.json';
import nlHome from './locales/nl/home.json';
import enPortfolio from './locales/en/portfolio.json';
import nlPortfolio from './locales/nl/portfolio.json';
import enPricing from './locales/en/pricing.json';
import nlPricing from './locales/nl/pricing.json';
import enPrivacy from './locales/en/privacy.json';
import nlPrivacy from './locales/nl/privacy.json';
import enServices from './locales/en/services.json';
import nlServices from './locales/nl/services.json';
import enTerms from './locales/en/terms.json';
import nlTerms from './locales/nl/terms.json';
import enThankYou from './locales/en/thankYou.json';
import nlThankYou from './locales/nl/thankYou.json';
import { getLanguage, supportedLanguages } from './routes';

export const resources = {
  en: {
    seo: enSEO, common: en, about: enAbout, contact: enContact, content: enContent,
    cookies: enCookies, home: enHome, portfolio: enPortfolio,
    pricing: enPricing, privacy: enPrivacy, services: enServices,
    terms: enTerms, thankYou: enThankYou,
  },
  nl: {
    seo: nlSEO, common: nl, about: nlAbout, contact: nlContact, content: nlContent,
    cookies: nlCookies, home: nlHome, portfolio: nlPortfolio,
    pricing: nlPricing, privacy: nlPrivacy, services: nlServices,
    terms: nlTerms, thankYou: nlThankYou,
  },
};

export function createI18n(language = 'en') {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    resources,
    ns: Object.keys(resources.en),
    lng: supportedLanguages.includes(language) ? language : 'en',
    supportedLngs: supportedLanguages,
    fallbackLng: 'en',
    defaultNS: 'common',
    initImmediate: false,
    interpolation: { escapeValue: false },
  });
  return instance;
}

// Explicit URLs always win. Stored preferences never override a requested URL.
const i18n = createI18n(typeof window === 'undefined' ? 'en' : getLanguage(window.location.pathname));
export default i18n;
