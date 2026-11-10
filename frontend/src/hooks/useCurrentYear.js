import { useSyncExternalStore } from 'react';

// Reuse the build's year for the first hydration render, then show the visitor's
// current year. Cached HTML remains hydratable across the New Year boundary.
export const prerenderYear = new Date().getFullYear();
const subscribe = () => () => {};
const currentYear = () => new Date().getFullYear();
const initialYear = () => {
  const year = typeof document === 'undefined' ? 0
    : Number(document.getElementById('root')?.dataset.prerenderYear);
  return year || prerenderYear;
};

export function useCurrentYear() {
  return useSyncExternalStore(subscribe, currentYear, initialYear);
}
