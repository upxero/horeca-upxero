import React from "react";
import { CheckCircle, Mail, MessageCircle } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-10 text-center">

        {/* Logo */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 w-12 h-12 rounded-lg flex items-center justify-center">
            <img
              src="/images/logo-white.png"
              alt="Upxero logo"
              className="w-7 h-7"
            />
          </div>

          <span className="text-3xl font-bold text-white">
            UPXERO
          </span>
        </div>


        {/* Icon */}
        <CheckCircle 
          className="mx-auto text-orange-500 mb-6"
          size={70}
        />


        <h1 className="text-3xl font-bold text-white mb-4">
          Bedankt voor uw bestelling!
        </h1>


        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Uw website onderhoudsabonnement is succesvol geactiveerd.
        </p>


        <p className="text-gray-400 leading-relaxed">
          Vanaf nu wordt uw abonnement automatisch maandelijks verwerkt.
          Wij zorgen ervoor dat uw website veilig, up-to-date en optimaal
          blijft functioneren.
        </p>


        <div className="border-t border-gray-700 my-8"></div>


        <div className="text-left space-y-4">

          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="text-orange-500" size={20}/>
            <span>
              Vragen? Mail ons via info@upxero.com
            </span>
          </div>


          <div className="flex items-center gap-3 text-gray-300">
            <MessageCircle className="text-orange-500" size={20}/>
            <span>
              Of neem contact op via WhatsApp
            </span>
          </div>

        </div>


        <a
          href="/"
          className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Terug naar Upxero
        </a>


        <p className="text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} Upxero — Digitale oplossingen voor bedrijven
        </p>

      </div>
    </div>
  );
}