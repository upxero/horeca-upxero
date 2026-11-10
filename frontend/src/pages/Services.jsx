import { Trans, useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ShoppingCart, Smartphone, Settings, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Services = () => {
  const { t } = useTranslation('services');
  const { localize } = useLanguage();


  const detailedServices = [
    {
      id: 1,
      icon: Globe,
      title: t("professionalHospitalityWebsite"),
      description:
        t("aFastMobileFirstWebsiteThatClearlyGuides"),
      image: "https://images.pexels.com/photos/12935074/pexels-photo-12935074.jpeg",
      features: [
      t("modernProfessionalHospitalityDesign"),
      t("optimisedForMobileUse"),
      t("clearCallsToActionOrderingContact"),
      t("fastLoadingTimesForHigherConversion"),
      t("clearWellOrganisedMenuPresentation"),
      t("aStrongFoundationForOnlineOrderingAndCustomer")
    ]
    },
    {
      id: 2,
      icon: ShoppingCart,
      title: t("orderingTitle"),
      description:
        t("orderingDescription"),
      image: "https://images.pexels.com/photos/12935041/pexels-photo-12935041.jpeg",
      features: [
        t("freeAvailable"),
        t("collectionAndTakeaway"),
        t("freePlanLimits"),
        t("payOnCollection"),
        t("proOptions"),
        t("standaloneAccess")
      ]
    },
    {
      id: 3,
      icon: Smartphone,
      title: t("maintenanceTitle"),
      description:
        t("maintenanceDescription"),
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      features: [
        t("maintenanceService"),
        t("contentChanges"),
        t("openingHours"),
        t("contactDetails"),
        t("scopeAgreement"),
        t("personalContact")
      ]
    },
    {
      id: 4,
      icon: Settings,
      title: t("fullyManagedSupported"),
      description:
        t("weHandleEverythingTechnicallyAndPracticallyYouFocus"),
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9",
      features: [
        t("hostingSecurityAndUpdatesIncluded"),
        t("technicalMonitoringAndFollowUp"),
        t("menuOrContentChangesOnRequest"),
        t("fastPersonalSupportByEmailAndWhatsapp"),
        t("ongoingOptimisation"),
        t("noTechnicalKnowledgeNeeded")
      ]
    }
  ];


  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" tabIndex={-1}>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <Trans t={t} i18nKey="heroTitle" components={{ accent: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700" /> }} />
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">{t("servicesIntro")}</p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {detailedServices.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  {service.id === 2 ? <img src="/images/upxero-ordering-logo.png" alt="" width={2172} height={724} loading="lazy" className="w-64 max-w-full h-auto mb-6" /> : <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl mb-6">
                    <service.icon className="text-blue-900" size={32} />
                  </div>}
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-xl text-gray-600 mb-8">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Website Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-10 md:p-16 shadow-xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("notInHospitality")}</h2>
                <p className="text-xl text-gray-600 mb-6"><Trans t={t} i18nKey="customIntro" components={{ emphasis: <strong /> }} /></p>

                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    t("eCommerceWebsites"),
                    t("servicesLocalBusinesses"),
                    t("businessWebsites"),
                    t("onlinePlatforms"),
                    t("webAppsCustomDevelopment"),
                    t("uniqueProjects")
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="text-blue-700 mt-1" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-gray-600 mb-8"><Trans t={t} i18nKey="customQuote" components={{ emphasis: <strong /> }} />
                </p>

                <Button asChild className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-5 text-lg rounded-lg font-semibold inline-flex items-center gap-2"><Link to={localize("/contact")}>{t("getInTouch")}<ArrowRight size={20} />
                  </Link></Button>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt={t("customWebsitesAndWebApplications")}
                  className="rounded-2xl shadow-2xl w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("howItWorks")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("fromSignUpToLaunchIn4Simple")}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: t("freeDemo"), description: t("requestADemoAndDiscoverThePossibilities") },
              { step: "2", title: t("setup"), description: t("setupDescription") },
              { step: "3", title: t("content"), description: t("yourMenuAndPhotosAreAdded") },
              { step: "4", title: t("live"), description: t("launchDescription") }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("readyToGetStarted")}</h2>
          <p className="text-xl mb-8 text-blue-100">{t("requestAFreeDemoAndDiscoverHowOur")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-6 text-lg rounded-lg font-semibold transition-all hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"><Link to={localize("/contact")}>{t("requestAFreeDemo")}<ArrowRight size={20} />
              </Link></Button>
            <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-10 py-6 text-lg rounded-lg font-semibold transition-all"><Link to={localize("/pricing")}>{t("viewPricing")}</Link></Button>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default Services;
