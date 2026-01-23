import { X } from 'lucide-react';

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
          <button onClick={onClose}>
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

            <a
              href="/services"
              className="block bg-white border border-gray-300 rounded-lg py-2 px-3 hover:bg-gray-100"
            >
              📍 Voor horeca
            </a>

            <a
              href="/pricing"
              className="block bg-white border border-gray-300 rounded-lg py-2 px-3 hover:bg-gray-100"
            >
              💳 Wat kost het?
            </a>

            <a
              href="/pricing#no-commissions"
              className="block bg-white border border-gray-300 rounded-lg py-2 px-3 hover:bg-gray-100"
            >
              ⚡ Waarom geen commissies?
            </a>

            <a
              href={businessWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 text-white text-center rounded-lg py-2 font-medium hover:bg-green-600"
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
