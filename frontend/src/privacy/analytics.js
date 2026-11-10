import { routePaths, getBasePath } from '../i18n/routes';

export const consentKey = 'upxero.privacy.v1';
export function preferenceExpiry(now) {
  const date = new Date(now), day = date.getUTCDate();
  date.setUTCDate(1); date.setUTCMonth(date.getUTCMonth() + 6);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay)); return date.getTime();
}
export function readConsent(now = Date.now()) {
  try {
    const value = JSON.parse(localStorage.getItem(consentKey));
    if (value?.version === 1 && typeof value.analytics === 'boolean' && Number.isFinite(value.expires) && value.expires > now) return value;
  } catch { /* Invalid/unavailable storage means no consent. */ }
  return null;
}
export function saveConsent(analytics) {
  const value = { version: 1, analytics, expires: preferenceExpiry(Date.now()) };
  try { localStorage.setItem(consentKey, JSON.stringify(value)); } catch { /* Session-only choice. */ }
  return value;
}
export function clearLegacyAnalytics() {
  for (const name of ['localStorage', 'sessionStorage']) {
    try {
      const storage = window[name];
      Object.keys(storage).filter(key => /^ph_.*posthog|^__ph_opt_in_out_/.test(key)).forEach(key => storage.removeItem(key));
    } catch { /* Best effort. */ }
  }
  try {
    localStorage.removeItem('cookieConsent');
    document.cookie.split(';').map(item => item.split('=')[0].trim()).filter(key => /^ph_.*posthog|^__ph_opt_in_out_/.test(key)).forEach(key => {
      for (const domain of ['', location.hostname, '.' + location.hostname, '.upxero.com']) {
        document.cookie = key + '=; Max-Age=0; Path=/' + (domain ? '; Domain=' + domain : '') + '; SameSite=Lax';
      }
    });
  } catch { /* HttpOnly/foreign-domain storage cannot be removed here. */ }
}
// Explicit events instead of loading an unrestricted SDK: no replay, autocapture,
// identification, DOM inspection, persistent analytics ID or automatic requests.
export function capturePageview(pathname, signal) {
  if (!routePaths.includes(getBasePath(pathname))) return Promise.resolve();
  return fetch('https://us.i.posthog.com/i/v0/e/', {
    method: 'POST', credentials: 'omit', referrerPolicy: 'no-referrer', signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: 'phc_yJW1VjHGGwmCbbrtczfqqNxgBDbhlhOWcdzcIJEOTFE',
      event: '$pageview', distinct_id: crypto.randomUUID(),
      properties: { $current_url: 'https://www.upxero.com' + pathname,
        $process_person_profile: false, $geoip_disable: true, $ip: '0.0.0.0' } }),
  }).catch(() => {});
}
