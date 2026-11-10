import { Trans, useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const CookiePolicy = () => {
  const { t } = useTranslation('cookies');
  const { localize } = useLanguage();


  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" tabIndex={-1}>
      
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">{t("cookiePolicy")}</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-lg text-gray-600">{t("lastUpdated7January2025")}</p>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text1WhatAreCookies")}</h2>
              <p>{t("cookiesAreSmallTextFilesPlacedOnYour")}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text2HowWeUseCookies")}</h2>
              <p>{t("upxeroOnlyUsesEssentialCookiesNecessaryForThe")}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text3TypesOfCookiesWeUse")}</h2>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-6">{t("essentialCookies")}</h3>
              <p>{t("theseCookiesAreNecessaryForTheWebsiteS")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>{t("cookieConsent")}</strong>{' '}{t("remembersThatYouHaveAcceptedTheCookieBanner")}</li>
                <li>
                  <strong>{t("sessionCookies")}</strong>{' '}{t("ensureThatTheWebsiteFunctionsCorrectlyDuringYour")}</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-6">{t("cookiesWeDoNotUse")}</h3>
              <p>{t("weCurrentlyDoNotUse")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("analyticsCookiesSuchAsGoogleAnalytics")}</li>
                <li>{t("marketingOrTrackingCookies")}</li>
                <li>{t("socialMediaCookies")}</li>
                <li>{t("thirdPartyAdvertisingCookies")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text4CookieOverview")}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">{t("name")}</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">{t("purpose")}</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">{t("duration")}</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">{t("type")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">upxero.privacy.v1 (localStorage)</td>
                      <td className="border border-gray-300 px-4 py-2">{t("remembersCookiePreferences")}</td>
                      <td className="border border-gray-300 px-4 py-2">{t("text1Year")}</td>
                      <td className="border border-gray-300 px-4 py-2">{t("essential")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text5ManagingCookies")}</h2>
              <p>{t("youCanManageCookiesThroughYourBrowserSettings")}</p>
              <p className="mt-4">
                <strong>{t("instructionsByBrowser")}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <a 
                    href="https://support.google.com/chrome/answer/95647" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-900 underline hover:text-orange-500"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-900 underline hover:text-orange-500"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.apple.com/nl-be/guide/safari/sfri11471/mac" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-900 underline hover:text-orange-500"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-900 underline hover:text-orange-500"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text6UpdatesToThisCookiePolicy")}</h2>
              <p>{t("weMayUpdateThisCookiePolicyFromTime")}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text7MoreInformation")}</h2>
              <p><Trans t={t} i18nKey="privacyInformation" components={{ policy: <a href={localize("/privacy-policy")} className="text-blue-900 underline hover:text-orange-500" /> }} />
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text8Contact")}</h2>
              <p>{t("ifYouHaveQuestionsAboutOurCookiePolicy")}</p>
              <ul className="list-none space-y-2">
                <li><strong>{t("email")}</strong> info@upxero.com</li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
