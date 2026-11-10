import { supportedLanguages } from './routes';

export const languageStorageKey = 'upxero.language';

export function readLanguagePreference() {
  try {
    const value = window.localStorage.getItem(languageStorageKey);
    return supportedLanguages.includes(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveLanguagePreference(language) {
  if (!supportedLanguages.includes(language)) return;
  try {
    window.localStorage.setItem(languageStorageKey, language);
  } catch {
    // The URL and React state still work when storage is unavailable.
  }
}
