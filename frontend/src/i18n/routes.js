export const supportedLanguages = ['en', 'nl'];

export const routePaths = [
  '/', '/services', '/pricing', '/about', '/contact',
  '/restaurant-portfolio', '/privacy-policy', '/terms-conditions',
  '/cookie-policy', '/bedankt',
];

export function getRoutePattern(path) {
  return `/nl?${path === '/' ? '' : path}`;
}

export function getLanguage(pathname) {
  return /^\/nl(?:\/|$)/.test(pathname) ? 'nl' : 'en';
}

export function getBasePath(pathname) {
  const path = pathname.replace(/^\/nl(?=\/|$)/, '') || '/';
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

// Only registered, same-origin application paths are localized. Unknown paths
// and external destinations pass through unchanged rather than becoming home.
export function localizePath(destination, language) {
  if (!supportedLanguages.includes(language)) return destination;
  if (typeof destination !== 'string' || !destination.startsWith('/') || destination.startsWith('//')) {
    return destination;
  }
  const match = destination.match(/^([^?#]*)(.*)$/);
  const basePath = getBasePath(match[1]);
  if (!routePaths.includes(basePath)) return destination;
  return `${language === 'nl' ? `/nl${basePath === '/' ? '/' : basePath}` : basePath}${match[2]}`;
}
