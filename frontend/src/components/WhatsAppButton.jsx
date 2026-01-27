import { MessageCircle } from "lucide-react";

export const WhatsAppButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Open chat opties"
      className="
        fixed
        bottom-[96px]
        right-6
        z-50
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
