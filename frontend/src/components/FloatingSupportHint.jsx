import { useTranslation } from 'react-i18next';

export const FloatingSupportHint = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:block">
        <div className="
          bg-white text-gray-700 text-xs
          px-3 py-2 rounded-full shadow
          flex items-center gap-1
          animate-pulse
        ">
          {t('support.desktop')}
        </div>
      </div>

      {/* Mobile – links van AI + WhatsApp */}
      <div className="sm:hidden">
        <div className="
          bg-white text-gray-700 text-xs
          px-3 py-2 rounded-xl shadow
          animate-pulse
          max-w-[calc(100vw-7rem)]
        ">
          {t('support.mobile')}
        </div>
      </div>
    </>
  );
};
