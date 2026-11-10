import { getBasePath, getLanguage, localizePath, routePaths } from './routes';

test.each(routePaths)('maps both languages for %s without duplicate prefixes', (path) => {
  const dutch = path === '/' ? '/nl/' : `/nl${path}`;
  expect(localizePath(path, 'nl')).toBe(dutch);
  expect(localizePath(dutch, 'nl')).toBe(dutch);
  expect(localizePath(dutch, 'en')).toBe(path);
  expect(getBasePath(dutch)).toBe(path);
  expect(getLanguage(dutch)).toBe('nl');
  expect(getLanguage(path)).toBe('en');
});

test('preserves query strings and hashes verbatim', () => {
  expect(localizePath('/pricing?plan=grow&next=%2Fcontact#no-commissions', 'nl'))
    .toBe('/nl/pricing?plan=grow&next=%2Fcontact#no-commissions');
  expect(localizePath('/nl/pricing?plan=grow#plans', 'en')).toBe('/pricing?plan=grow#plans');
});

test.each(['https://example.com/nl/services', '//example.com/services', 'mailto:info@upxero.com', '#plans', '/unknown', '/nl/unknown', '/nl/nl/services'])('leaves unsafe or unknown destination unchanged: %s', (path) => {
  expect(localizePath(path, 'nl')).toBe(path);
  expect(localizePath(path, 'en')).toBe(path);
});

test('handles locale boundaries, home variants, trailing slashes and invalid languages', () => {
  expect(getLanguage('/nlish/services')).toBe('en');
  expect(localizePath('/nl', 'en')).toBe('/');
  expect(localizePath('/services/', 'nl')).toBe('/nl/services');
  expect(localizePath('/services', 'fr')).toBe('/services');
});
