import { Trans, useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const TermsConditions = () => {
  const { t } = useTranslation('terms');
  const { localize } = useLanguage();


  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" tabIndex={-1}>

      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">{t("termsConditions")}</h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-lg text-gray-600">{t("lastUpdated7January2025")}</p>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text1Definitions")}</h2>
              <p>{t("inTheseTermsAndConditionsTheFollowingDefinitions")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>{t("upxero")}</strong>{' '}{t("theServiceProviderOfferingDigitalSolutionsWebsitesMaintenance")}</li>
                <li>
                  <strong>{t("customer")}</strong>{' '}{t("theNaturalOrLegalPersonUsingUpxeroS")}</li>
                <li>
                  <strong>{t("services")}</strong>{' '}{t("allServicesOfferedByUpxeroIncludingWebsitesOnline")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text2Applicability")}</h2>
              <p>{t("theseTermsAndConditionsApplyToAllOffers")}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text3ProvisionOfServices")}</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("developmentAndHostingOfProfessionalHospitalityWebsites")}</li>
                <li>{t("integrationOfOnlineOrderingSystems")}</li>
                <li>{t("whatsappAssistantsThroughExternalProvidersSuchAsTwilio")}</li>
                <li>{t("technicalSupportAndMaintenance")}</li>
              </ul>
              <p>{t("upxeroReservesTheRightToMakeTechnicalChanges")}</p>
            </section>

           <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text4PricesAndPayment")}</h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>{t("allPricesExcludeVatUnlessOtherwiseStated")}</li>

                <li>{t("invoicesArePayableNoLaterThanTheDue")}</li>

                <li>{t("paymentIsMadeMonthlyInAdvanceUnlessOtherwise")}</li>

                <li>{t("forSubscriptionsAndRecurringServicesUpxeroMayUse")}</li>

                <li>{t("byActivatingAutomaticPaymentTheCustomerAuthorisesThe")}</li>

                <li>{t("theCustomerRemainsResponsibleForMaintainingAValid")}</li>

                <li>{t("servicesWillOnlyStartOrContinueOnceThe")}</li>

                <li>{t("inTheEventOfLatePaymentLatePayment")}</li>

                <li>{t("inAdditionLatePaymentIncursAFixedRecovery")}</li>

                <li>{t("inTheEventOfLatePaymentUpxeroReserves")}</li>

                <li>{t("ifServicesAreSuspendedDueToNonPayment")}</li>

                <li>{t("anAdministrativeReactivationFeeOf25IsCharged")}</li>

                <li>{t("ifTheCustomerRemainsInDefaultUpxeroReserves")}</li>

                <li>{t("upxeroMayAdjustSubscriptionPricesWhereNecessaryDue")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text5TermAndTermination")}</h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>{t("agreementsAreEnteredIntoForAMinimumTerm")}</li>

                <li>{t("afterTheMinimumTermTheAgreementIsAutomatically")}</li>

                <li>{t("noticeOfTerminationMustBeGivenInWriting")}</li>

                <li>{t("uponTerminationTheRightToUseTheServices")}</li>

                <li>{t("upxeroReservesTheRightToTerminateTheAgreement")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text6CustomerObligations")}</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("provideAccurateInformationOnTime")}</li>
                <li>{t("reportChangesImmediately")}</li>
                <li>{t("useServicesInAccordanceWithTheLaw")}</li>
                <li>{t("doNotMisuseSystems")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text7IntellectualProperty")}</h2>
              <p>{t("allWebsitesConfigurationsAndAutomationsDevelopedRemainThe")}</p>
              <p className="mt-2">{t("theCustomerOnlyReceivesARightToUse")}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text8Liability")}</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("noGuaranteeOfUninterruptedAvailability")}</li>
                <li>{t("noLiabilityForIndirectDamageOrLossOf")}</li>
                <li>{t("maximumLiabilityIsLimitedToOneMonthOf")}</li>
                <li>{t("forceMajeureAndExternalDisruptionsAreExcluded")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text9PrivacyAndDataProcessing")}</h2>
              <p><Trans t={t} i18nKey="privacyInformation" components={{ policy: <a href={localize("/privacy-policy")} className="text-blue-900 underline hover:text-orange-500" /> }} />
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text10ApplicableLaw")}</h2>
              <p>{t("belgianLawAppliesToAllAgreementsAllDisputes")}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("text11ContactCompanyDetails")}</h2>
              <ul className="list-none space-y-2">
                <li><strong>{t("companyName")}</strong> Upxero OÜ</li>
                <li><strong>{t("registeredAddress")}</strong>{' '}{t("ahtri1210151TallinnEstonia")}</li>
                <li><strong>{t("countryOfEstablishment")}</strong>{' '}{t("estoniaEu")}</li>
                <li><strong>{t("commercialRegister")}</strong> 16534146</li>
                <li><strong>{t("vatNumber")}</strong> EE102522936</li>
                <li><strong>{t("email")}</strong> info@upxero.com</li>
                <li><strong>{t("website")}</strong> https://www.upxero.com</li>
                <li className="text-sm text-gray-500">{t("upxeroIsRegisteredInEstoniaThroughTheE")}</li>
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

export default TermsConditions;
