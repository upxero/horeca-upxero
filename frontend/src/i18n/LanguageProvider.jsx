import { createContext, useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import i18n from './index';
import { getLanguage, localizePath, supportedLanguages } from './routes';
import { readLanguagePreference, saveLanguagePreference } from './storage';

const LanguageContext = createContext(null);

export function LanguageProvider({ children, instance = i18n }) {
  const location = useLocation();
  const navigate = useNavigate();
  const language = getLanguage(location.pathname);

  useLayoutEffect(() => {
    instance.changeLanguage(language);
    document.documentElement.lang = language;
  }, [instance, language]);

  const switchLanguage = useCallback((nextLanguage) => {
    if (!supportedLanguages.includes(nextLanguage)) return;
    const current = `${location.pathname}${location.search}${location.hash}`;
    const target = localizePath(current, nextLanguage);
    // Unknown paths cannot be switched safely; do not change their preference.
    if (target === current && nextLanguage !== language) return;
    saveLanguagePreference(nextLanguage);
    if (target !== current) navigate(target);
  }, [language, location, navigate]);

  const value = useMemo(() => ({
    language,
    switchLanguage,
    localize: (path) => localizePath(path, language),
    readPreference: readLanguagePreference,
  }), [language, switchLanguage]);

  return (
    <I18nextProvider i18n={instance}>
      <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
    </I18nextProvider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage requires LanguageProvider');
  return context;
}
