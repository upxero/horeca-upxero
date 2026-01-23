import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Open WhatsApp chat"
      className="
        fixed
        bottom-8
        left-8
        z-40
        bg-green-500
        hover:bg-green-600
        text-white
        p-4
        rounded-full
        shadow-lg
        transition-all
        duration-300
        hover:scale-110
        focus:outline-none
        focus:ring-2
        focus:ring-green-500
        focus:ring-offset-2
      "
    >
      <MessageCircle size={26} />
    </button>
  );
};
