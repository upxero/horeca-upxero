import { X } from "lucide-react";
import { Link } from "react-router-dom";

export const WhatsAppPopup = ({ onClose }) => {
  const businessWhatsAppUrl =
    "https://wa.me/3197010268675?text=Hallo%20👋%20Ik%20heb%20een%20vraag%20over%20Upxero";

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Popup */}
      <div className="fixed bottom-[168px] right-6 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">

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

        {/* Body */}
        <div className="p-4 space-y-3 text-sm bg-gray-50">

          <div className="bg-white rounded-lg p-3 shadow">
            Hoe kunnen we je helpen?
            <br />
            Kies hieronder waarover je meer info wil 👇
          </div>

          <div className="space-y-2">

            <Link to="/services" onClick={onClose}
              className="block bg-white border rounded-lg py-2 px-3">
              📍 Voor horeca
            </Link>

            <Link to="/pricing#plans" onClick={onClose}
              className="block bg-white border rounded-lg py-2 px-3">
              💳 Wat kost het?
            </Link>

            <Link to="/pricing#no-commissions" onClick={onClose}
              className="block bg-white border rounded-lg py-2 px-3">
              ⚡ Waarom geen commissies?
            </Link>

            {/* WhatsApp */}
            <a
              href={businessWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 text-white text-center rounded-lg py-2 font-medium"
            >
              📞 Contact opnemen via WhatsApp
            </a>

          </div>
        </div>
      </div>
    </>
  );
};
