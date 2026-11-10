import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import { getBasePath, routePaths } from '../i18n/routes';
import { consentKey, readConsent, saveConsent, clearLegacyAnalytics, capturePageview } from '../privacy/analytics';

export const CookieBanner = () => {
  const { t } = useTranslation();
  const { localize } = useLanguage();
  const { pathname } = useLocation();
  const [choice, setChoice] = useState(null), [open, setOpen] = useState(false);
  const settings = useRef(null), reject = useRef(null), returnFocus = useRef(false);
  const basePath = getBasePath(pathname);
  const hasFooter = routePaths.includes(basePath) && basePath !== '/bedankt';
  useEffect(() => {
    const reopen = event => {
      settings.current = event.detail;
      returnFocus.current = true; setOpen(true);
    };
    window.addEventListener('upxero:privacy-settings', reopen);
    return () => window.removeEventListener('upxero:privacy-settings', reopen);
  }, []);
  useEffect(() => {
    clearLegacyAnalytics();
    const saved = readConsent(); setChoice(saved); setOpen(!saved);
    const sync = event => {
      if (event.key === consentKey || event.key === null) {
        const next = readConsent(); setChoice(next); setOpen(!next);
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  useEffect(() => {
    if (!choice) return;
    // Long browser timers are capped; check expiry once a minute and per pageview.
    const interval = setInterval(() => {
      if (Date.now() >= choice.expires) { setChoice(null); setOpen(true); clearLegacyAnalytics(); }
    }, 60000);
    return () => clearInterval(interval);
  }, [choice]);
  useEffect(() => {
    if (!choice?.analytics || choice.expires <= Date.now()) return;
    const controller = new AbortController();
    const timer = setTimeout(() => capturePageview(pathname, controller.signal), 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [choice, pathname]);
  useEffect(() => { if (open && returnFocus.current) reject.current?.focus(); }, [open]);
  const choose = analytics => {
    setChoice(saveConsent(analytics)); setOpen(false);
    if (!analytics) clearLegacyAnalytics();
    if (returnFocus.current) settings.current?.focus();
  };
  return <>
    {!hasFooter && <div className="privacy-settings-bar">
      <button ref={settings} type="button" className="underline rounded px-4 py-3" onClick={() => {
        returnFocus.current = true; setOpen(true);
      }}>{t('cookie.settings')}</button>
    </div>}
    {open && <section data-privacy-panel aria-label={t('cookie.title')} className="fixed inset-x-0 bottom-0 z-[70] max-h-[80dvh] overflow-y-auto bg-white border-t-2 border-gray-200 shadow-2xl p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="flex-1"><h2 className="text-lg font-bold">{t('cookie.title')}</h2>
          <p className="text-sm text-gray-700">{t('cookie.description')} <Link className="underline" to={localize('/cookie-policy')}>{t('cookie.policy')}</Link>.</p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0 max-w-full">
          <button ref={reject} type="button" className="border-2 border-blue-900 rounded-lg px-4 py-3 text-blue-900 font-semibold" onClick={() => choose(false)}>{t('cookie.reject')}</button>
          <button type="button" className="border-2 border-blue-900 rounded-lg px-4 py-3 text-blue-900 font-semibold" onClick={() => choose(true)}>{t('cookie.accept')}</button>
          <button type="button" className="underline px-3 py-3" onClick={() => { setOpen(false); if (returnFocus.current) settings.current?.focus(); }}>{t('close')}</button>
        </div>
      </div>
    </section>}
  </>;
};
