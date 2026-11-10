import { useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';

export function LanguageSelector() {
  const { t } = useTranslation();
  const { language, switchLanguage } = useLanguage();
  return (
    <div role="group" aria-label={t('language.label')} className="inline-flex shrink-0 rounded-lg border border-blue-900 p-0.5">
      {['en', 'nl'].map(code => (
        <button key={code} type="button" aria-label={t(`language.${code}`)}
          aria-pressed={language === code} onClick={() => switchLanguage(code)}
          className={`min-h-10 px-2 sm:px-3 rounded-md text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${language === code ? 'bg-blue-900 text-white' : 'text-blue-900 hover:bg-blue-50'}`}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
