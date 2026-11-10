import en from '../i18n/locales/en/seo.json';
import nl from '../i18n/locales/nl/seo.json';
import { getBasePath, getLanguage, localizePath, routePaths } from '../i18n/routes';

export const siteUrl = 'https://www.upxero.com';
export const socialImage = siteUrl + '/favicon.png';
export const prerenderPaths = routePaths.flatMap(path => [path, localizePath(path, 'nl')]);

const organizationId = siteUrl + '/#organization';
const websiteId = siteUrl + '/#website';
const copy = { en, nl };

export function getSEO(pathname) {
  const cleanPath = pathname.split(/[?#]/)[0];
  const basePath = getBasePath(cleanPath);
  if (!routePaths.includes(basePath)) return null;
  const language = getLanguage(cleanPath);
  const canonical = siteUrl + localizePath(basePath, language);
  const dictionary = copy[language];
  const page = dictionary.pages[basePath];
  const indexable = basePath !== '/bedankt';
  // No hreflang cluster for the deliberately non-indexable confirmation pages.
  const alternates = indexable ? [
    { language: 'en', url: siteUrl + basePath },
    { language: 'nl', url: siteUrl + localizePath(basePath, 'nl') },
    { language: 'x-default', url: siteUrl + basePath },
  ] : [];
  const organization = {
    '@type': 'Organization', '@id': organizationId,
    name: 'Upxero', legalName: 'Upxero OÜ', url: siteUrl + '/',
    logo: socialImage, email: 'info@upxero.com', vatID: 'EE102522936',
    identifier: { '@type': 'PropertyValue', propertyID: 'Estonian commercial register', value: '16534146' },
    address: { '@type': 'PostalAddress', streetAddress: 'Ahtri 12', postalCode: '10151', addressLocality: 'Tallinn', addressCountry: 'EE' },
  };
  const website = {
    '@type': 'WebSite', '@id': websiteId, url: siteUrl + '/', name: 'Upxero',
    publisher: { '@id': organizationId }, inLanguage: ['en', 'nl'],
  };
  const webpage = {
    '@type': basePath === '/contact' ? 'ContactPage' : basePath === '/about' ? 'AboutPage' : 'WebPage',
    '@id': canonical + '#webpage', url: canonical, name: page.title,
    description: page.description, inLanguage: language,
    isPartOf: { '@id': websiteId }, about: { '@id': organizationId },
  };
  const graph = [organization, website, webpage];
  if (indexable && basePath !== '/') {
    const breadcrumbId = canonical + '#breadcrumb';
    webpage.breadcrumb = { '@id': breadcrumbId };
    graph.push({
      '@type': 'BreadcrumbList', '@id': breadcrumbId,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: dictionary.homeLabel, item: siteUrl + localizePath('/', language) },
        { '@type': 'ListItem', position: 2, name: page.name, item: canonical },
      ],
    });
  }
  if (basePath === '/services') {
    const names = language === 'nl'
      ? ['Ontwikkeling van horecawebsites', 'Websitehosting', 'Websiteonderhoud']
      : ['Restaurant website development', 'Website hosting', 'Website maintenance'];
    const services = names.map((name, index) => ({
      '@type': 'Service', '@id': canonical + '#service-' + (index + 1),
      name, provider: { '@id': organizationId },
      areaServed: [{ '@type': 'Country', name: 'Belgium' }, { '@type': 'Country', name: 'Netherlands' }],
    }));
    webpage.mainEntity = services.map(service => ({ '@id': service['@id'] }));
    graph.push(...services);
  }
  return {
    ...page, language, canonical, indexable, alternates, interactiveNotice: dictionary.interactiveNotice,
    image: socialImage, imageAlt: dictionary.imageAlt,
    locale: language === 'nl' ? 'nl_NL' : 'en_GB',
    alternateLocale: language === 'nl' ? 'en_GB' : 'nl_NL',
    robots: indexable ? 'index,follow' : 'noindex,follow',
    structuredData: { '@context': 'https://schema.org', '@graph': graph },
  };
}

export function headElements(seo) {
  return [
    { tag: 'meta', attrs: { name: 'description', content: seo.description } },
    { tag: 'meta', attrs: { name: 'robots', content: seo.robots } },
    { tag: 'link', attrs: { rel: 'canonical', href: seo.canonical } },
    ...seo.alternates.map(item => ({ tag: 'link', attrs: { rel: 'alternate', hreflang: item.language, href: item.url } })),
    ...Object.entries({
      'og:title': seo.title, 'og:description': seo.description, 'og:url': seo.canonical,
      'og:type': 'website', 'og:site_name': 'Upxero', 'og:locale': seo.locale,
      'og:locale:alternate': seo.alternateLocale, 'og:image': seo.image,
      'og:image:alt': seo.imageAlt, 'og:image:type': 'image/png',
      'og:image:width': '1024', 'og:image:height': '1024',
    }).map(([property, content]) => ({ tag: 'meta', attrs: { property, content } })),
    ...Object.entries({
      'twitter:card': 'summary', 'twitter:title': seo.title,
      'twitter:description': seo.description, 'twitter:image': seo.image, 'twitter:image:alt': seo.imageAlt,
    }).map(([name, content]) => ({ tag: 'meta', attrs: { name, content } })),
  ];
}

export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

export function renderHead(seo) {
  const elements = headElements(seo).map(({ tag, attrs }) =>
    '<' + tag + ' ' + Object.entries(attrs).map(([key, value]) => key + '="' + escapeHtml(value) + '"').join(' ') + ' data-upxero-seo="true">');
  const json = JSON.stringify(seo.structuredData).replace(/</g, '\\u003c');
  return '<title>' + escapeHtml(seo.title) + '</title>\n' + elements.join('\n') +
    '\n<script type="application/ld+json" data-upxero-seo="true">' + json + '</script>';
}

export function renderSitemap() {
  const entries = prerenderPaths.map(getSEO).filter(seo => seo.indexable).map(seo =>
    '  <url>\n    <loc>' + escapeHtml(seo.canonical) + '</loc>\n' +
    seo.alternates.map(item => '    <xhtml:link rel="alternate" hreflang="' + item.language + '" href="' + escapeHtml(item.url) + '" />').join('\n') +
    '\n  </url>');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + entries.join('\n') + '\n</urlset>\n';
}
