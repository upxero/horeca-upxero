import { useTranslation } from 'react-i18next';
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      aria-label={t('chat.open')}
      className="
        floating-support-control
        fixed
        bottom-24
        right-4
        z-40
        bg-green-500
        hover:bg-green-600
        text-white
        w-16
        h-16
        flex
        items-center
        justify-center
        rounded-full
        shadow-xl
        transition
        hover:scale-110
      "
    >
      <MessageCircle size={26} />
    </button>
  );
};
