import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSEO, headElements } from '../seo/model';

// Own the complete SEO tag set. Route transitions replace it atomically,
// including removal of noindex when leaving a confirmation page.
export function applySEO(seo, pathname = '/') {
  document.head.querySelectorAll(
    'title, meta[name="description"], meta[name="robots"], link[rel="canonical"], link[rel="alternate"][hreflang], meta[property^="og:"], meta[name^="twitter:"], script[type="application/ld+json"]'
  ).forEach(element => element.remove());
  const title = document.createElement('title');
  title.textContent = seo ? seo.title : (pathname.startsWith('/nl/') ? 'Pagina niet gevonden | Upxero' : 'Page not found | Upxero');
  document.head.appendChild(title);
  if (!seo) {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex,follow';
    document.head.appendChild(robots);
    return;
  }
  document.documentElement.lang = seo.language;
  for (const { tag, attrs } of headElements(seo)) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
    element.dataset.upxeroSeo = 'true';
    document.head.appendChild(element);
  }
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.upxeroSeo = 'true';
  script.textContent = JSON.stringify(seo.structuredData);
  document.head.appendChild(script);
}

export function useSEO() {
  const { pathname } = useLocation();
  useEffect(() => applySEO(getSEO(pathname), pathname), [pathname]);
}
