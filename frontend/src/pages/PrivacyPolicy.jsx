import { Trans, useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const PrivacyPolicy = () => {
  const { t } = useTranslation('privacy');
  const { localize } = useLanguage();


  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" tabIndex={-1}>
      
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">{t("privacyPolicy")}</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-lg text-gray-600">{t("lastUpdated7January2025")}</p>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text1Introduction")}</h2>
              <p>{t("upxeroWeUsOurRespectsYourPrivacyAnd")}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text2DataWeCollect")}</h2>
              <p>{t("weMayCollectTheFollowingTypesOfData")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>{t("contactDetails")}</strong>{' '}{t("nameEmailAddressPhoneNumberAndBusinessName")}</li>
                <li>
                  <strong>{t("technicalData")}</strong>{' '}{t("ipAddressBrowserTypeDeviceInformationAndWebsite")}</li>
                <li>
                  <strong>{t("communicationData")}</strong>{' '}{t("messagesAndQuestionsYouSendUs")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text3HowWeUseYourData")}</h2>
              <p>{t("weUseYourPersonalDataFor")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("respondingToYourQuestionsAndDemoRequests")}</li>
                <li>{t("providingInformationAboutOurServices")}</li>
                <li>{t("improvingOurWebsiteAndServices")}</li>
                <li>{t("complyingWithLegalObligations")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text4DataSharing")}</h2>
              <p>{t("weDoNotSellOrRentYourPersonal")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("serviceProvidersThatHelpUsDeliverOurServices")}</li>
                <li>{t("lawEnforcementAuthoritiesWhereRequiredByLaw")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text5DataSecurity")}</h2>
              <p>{t("weTakeAppropriateTechnicalAndOrganisationalMeasuresTo")}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text6YourRights")}</h2>
              <p>{t("underTheGdprYouHaveTheFollowingRights")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("theRightToAccessYourPersonalData")}</li>
                <li>{t("theRightToRectifyInaccurateData")}</li>
                <li>{t("theRightToErasureOfYourData")}</li>
                <li>{t("theRightToRestrictProcessing")}</li>
                <li>{t("theRightToDataPortability")}</li>
                <li>{t("theRightToObjectToProcessing")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text7Cookies")}</h2>
              <p><Trans t={t} i18nKey="cookieInformation" components={{ policy: <a href={localize("/cookie-policy")} className="text-blue-900 underline hover:text-orange-500" /> }} /></p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text8RetentionPeriod")}</h2>
              <p>{t("weRetainYourPersonalDataNoLongerThan")}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text9ChangesToThisPolicy")}</h2>
              <p>{t("weMayUpdateThisPrivacyPolicyFromTime")}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text10Contact")}</h2>
              <p>{t("forQuestionsAboutThisPrivacyPolicyOrTo")}</p>
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

export default PrivacyPolicy;
