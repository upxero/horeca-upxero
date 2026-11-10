import { useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import { useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Link } from "react-router-dom";

export const WhatsAppPopup = ({ onClose }) => {
  const { t } = useTranslation();
  const opener = useRef(typeof document === 'undefined' ? null : document.activeElement);
  const { localize } = useLanguage();
  const businessWhatsAppUrl =
    'https://wa.me/3197010268675?text=' + encodeURIComponent(t('chat.prefill'));

  return (
    <Dialog open onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent aria-modal="true" closeLabel={t('close')} className="p-0 gap-0 overflow-hidden rounded-2xl w-[calc(100%_-_2rem)] max-w-sm" onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }}>
        {/* Header */}
        <div className="bg-green-500 text-white p-4 flex justify-between items-center">
          <div>
            <DialogTitle>{t('chat.welcome')}</DialogTitle>
            <DialogDescription className="text-white text-xs">{t('chat.subtitle')}</DialogDescription>
          </div>

        </div>

        {/* Body */}
        <div className="p-4 space-y-3 text-sm bg-gray-50">

          <div className="bg-white rounded-lg p-3 shadow">
            {t('chat.help')}
            <br />
            {t('chat.choose')}
          </div>

          <div className="space-y-2">

            <Link to={localize("/services")} onClick={onClose}
              className="block bg-white border rounded-lg py-2 px-3">
              {t('chat.hospitality')}
            </Link>

            <Link to={localize("/pricing#plans")} onClick={onClose}
              className="block bg-white border rounded-lg py-2 px-3">
              {t('chat.pricing')}
            </Link>

            <Link to={localize("/pricing#no-commissions")} onClick={onClose}
              className="block bg-white border rounded-lg py-2 px-3">
              {t('chat.commission')}
            </Link>

            {/* WhatsApp */}
            <a
              href={businessWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 text-white text-center rounded-lg py-2 font-medium"
            >
              {t('chat.contact')}
            </a>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
