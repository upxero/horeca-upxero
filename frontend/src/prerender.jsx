import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from './App';
import { LanguageProvider } from './i18n/LanguageProvider';
import { createI18n } from './i18n';
import { getLanguage } from './i18n/routes';
import { prerenderYear } from './hooks/useCurrentYear';
import { getSEO, renderHead, renderSitemap, prerenderPaths } from './seo/model';

export { getSEO, renderSitemap, prerenderPaths };

export function renderPage(pathname) {
  const seo = getSEO(pathname);
  const instance = createI18n(getLanguage(pathname));
  const body = renderToString(
    <div className="App">
      <MemoryRouter initialEntries={[pathname]}>
        <LanguageProvider instance={instance}>
          <AppContent />
        </LanguageProvider>
      </MemoryRouter>
    </div>
  );
  const language = getLanguage(pathname);
  const head = seo ? renderHead(seo) : '<title>' + (language === 'nl' ? 'Pagina niet gevonden' : 'Page not found') + ' | Upxero</title><meta name="robots" content="noindex,follow">';
  return { body, head, language, interactiveNotice: seo?.interactiveNotice || (language === 'nl' ? 'Deze pagina is niet gevonden.' : 'This page was not found.'), year: prerenderYear };
}
