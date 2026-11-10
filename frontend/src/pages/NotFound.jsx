import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider';

export default function NotFound() {
  const { t } = useTranslation();
  const { localize } = useLanguage();
  return <section className="min-h-[70vh] px-6 py-32 text-center">
    <p className="font-bold text-blue-900">404</p>
    <h1 className="text-4xl font-bold my-6">{t('notFound.title')}</h1>
    <p className="mb-6">{t('notFound.description')}</p>
    <Link className="underline text-blue-900 font-semibold" to={localize('/')}>{t('notFound.home')}</Link>
  </section>;
}
