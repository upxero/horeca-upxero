import { useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import React from "react";
import { CheckCircle, Mail, MessageCircle } from "lucide-react";
import { Link } from 'react-router-dom';
import { LanguageSelector } from '../components/LanguageSelector';
import { useCurrentYear } from '../hooks/useCurrentYear';

export default function ThankYou() {
  const { t } = useTranslation('thankYou');
  const { localize } = useLanguage();
  const year = useCurrentYear();
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-10 text-center">

        <div className="flex justify-center mb-6"><div className="rounded-lg bg-white"><LanguageSelector /></div></div>
        {/* Logo */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 w-12 h-12 rounded-lg flex items-center justify-center">
            <img
              src="/images/logo-white.png"
              alt={t("upxeroLogo")}
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


        <h1 className="text-3xl font-bold text-white mb-4">{t("thankYouForYourOrder")}</h1>


        <p className="text-gray-300 text-lg leading-relaxed mb-6">{t("yourWebsiteMaintenanceSubscriptionHasBeenActivatedSuccessfully")}</p>


        <p className="text-gray-400 leading-relaxed">{t("yourSubscriptionWillNowBeProcessedAutomaticallyEach")}</p>


        <div className="border-t border-gray-700 my-8"></div>


        <div className="text-left space-y-4">

          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="text-orange-500" size={20}/>
            <span>{t("questionsEmailUsAtInfoUpxeroCom")}</span>
          </div>


          <div className="flex items-center gap-3 text-gray-300">
            <MessageCircle className="text-orange-500" size={20}/>
            <span>{t("orContactUsViaWhatsapp")}</span>
          </div>

        </div>


        <Link
          to={localize("/")}
          className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition"
        >{t("backToUpxero")}</Link>


        <p className="text-sm text-gray-500 mt-8">
          {t("copyright", { year })}</p>

      </div>
    </main>
  );
}
