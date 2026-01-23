import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WhatsAppPopup = ({ onClose }) => {
  const businessWhatsAppUrl =
    'https://wa.me/3197010268675?text=Hallo%20👋%20Ik%20heb%20een%20vraag%20over%20Upxero';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed bottom-28 left-8 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">

        {/* Header */}
        <div className="bg-green-500 text-white p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">👋 Welkom bij Upxero</p>
            <p className="text-xs opacity-90">Chat direct met ons</p>
          </div>
          <button onClick={onClose} aria-label="Sluit chat">
            <X size={18} />
          </button>
        </div>

        {/* Chat body */}
        <div className="p-4 space-y-3 text-sm bg-gray-50">

          {/* Intro bubble */}
          <div className="bg-white rounded-lg p-3 shadow w-fit max-w-[90%]">
            Hoe kunnen we je helpen?
            <br />
            Kies hieronder waarover je meer info wil 👇
          </div>

          {/* Menu buttons */}
          <div className="space-y-2">

            <Link
              to="/services"
              onClick={onClose}
              className="block bg-white border border-gray-300 rounded-lg py-2 px-3 hover:bg-gray-100 transition"
            >
              📍 Voor horeca
            </Link>

            <Link
              to="/pricing#plans"
              onClick={onClose}
              className="block bg-white border border-gray-300 rounded-lg py-2 px-3 hover:bg-gray-100 transition"
            >
              💳 Wat kost het?
            </Link>

            <Link
              to="/pricing#no-commissions"
              onClick={onClose}
              className="block bg-white border border-gray-300 rounded-lg py-2 px-3 hover:bg-gray-100 transition"
            >
              ⚡ Waarom geen commissies?
            </Link>

            {/* Externe WhatsApp → GEEN Link */}
            <a
              href={businessWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 text-white text-center rounded-lg py-2 font-medium hover:bg-green-600 transition"
            >
              📞 Contact opnemen via WhatsApp
            </a>
          </div>

          {/* Footer hint */}
          <p className="text-xs text-gray-400 text-center pt-1">
            Je kan altijd overschakelen naar echte WhatsApp 💬
          </p>
        </div>
      </div>
    </>
  );
};

