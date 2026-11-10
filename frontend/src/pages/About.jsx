import { Trans, useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Award, TrendingUp, Heart, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const About = () => {
  const { t } = useTranslation('about');
  const { localize } = useLanguage();


  const values = [
    {
      icon: Target,
      title: t("coreWebsiteServices"),
      description: t("coreWebsiteDescription")
    },
    {
      icon: Heart,
      title: t("customerFocus"),
      description: t("yourSuccessIsOurSuccessWeBuildLasting")
    },
    {
      icon: Zap,
      title: t("innovation"),
      description: t("weKeepInnovatingAndImprovingToOfferYou")
    }
  ];

  const stats = [
    { number: "€19", label: t("startMonthly"), icon: Users },
    { number: "€29", label: t("growMonthly"), icon: TrendingUp },
    { number: "€49", label: t("boostMonthly"), icon: Award },
    { number: "€0", label: t("orderingFreeMonthly"), icon: Heart }
  ];

  const team = [
    {
      name: "Team Upxero",
      role: "Dedicated Experts",
      image: "https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY3Nzc4ODcwfDA&ixlib=rb-4.1.0&q=85",
      description: "Ons team bestaat uit ervaren developers, designers en horeca-experts die samen werken aan uw succes."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" tabIndex={-1}>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <Trans t={t} i18nKey="heroTitle" components={{ accent: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700" /> }} />
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">{t("businessIntro")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-lg font-semibold transition-all hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"><Link to={localize("/contact")}>{t("workWithUs")}<ArrowRight size={20} />
                  </Link></Button>
                <Button asChild variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg font-semibold transition-all"><Link to={localize("/services")}>{t("ourServices")}</Link></Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1762087577613-978bf9066d39"
                  alt={t("upxeroTeam")}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("ourMission")}</h2>
            <p className="text-xl text-gray-600 leading-relaxed">{t("missionDescription")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t("packageOverview")}</h2>
            <p className="text-xl text-blue-100">{t("packageOverviewIntro")}</p>
            <p className="text-sm text-blue-100 mt-3">{t('content:vat')}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white" size={32} />
                </div>
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("ourStory")}</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">{t("upxeroBeganWithOneClearFrustrationTooMany")}</p>
            <p className="text-lg leading-relaxed">{t("websiteStory")}</p>
            <p className="text-lg leading-relaxed">{t("todayWeHelpHospitalityBusinessesInBelgiumAnd")}</p>
            <p className="text-lg leading-relaxed">{t("ourPhilosophyIsSimpleTechnologyCanBePowerful")}</p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("whoIsBehindUpxero")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("teamDescription")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Michael */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="/images/michael.png"
                    alt={t("portraitOfMike")}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Michael
                </h3>
                <p className="text-blue-900 font-semibold mb-4">{t("webDevelopmentTechnicalInfrastructure")}</p>
                <p className="text-gray-600 leading-relaxed">{t("michaelDescription")}</p>
              </CardContent>
            </Card>

            {/* Safi */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="/images/safi.png"
                    alt={t("portraitOfSafi")}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Safi
                </h3>

                <p className="text-blue-900 font-semibold mb-4">{t("fullStackDevelopmentSoftwareArchitecture")}</p>

                <p className="text-gray-600 leading-relaxed">{t("safiSupportsUpxeroInDevelopingScalableDigitalSolutions")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> 

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("whyChooseUpxero")}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: t("fullyManaged"),
                description:
                  t("weTakeCareOfHostingUpdatesMaintenanceAnd")
              },
              {
                title: t("launchQuickly"),
                description:
                  t("startReceivingOnlineOrdersWithin1To2")
              },
              {
                title: t("personalSupport"),
                description:
                  t("contactOurTeamDirectlyRealPeopleReadyTo")
              },
              {
                title: t("websiteMaintenance"),
                description:
                  t("maintenanceDescription")
              },
              {
                title: t("transparentPricing"),
                description:
                  t("websitePricesDescription")
              },
              {
                title: t("standaloneOrdering"),
                description:
                  t("standaloneDescription")
              }
            ].map((item, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("readyToWorkTogether")}</h2>
          <p className="text-xl mb-8 text-blue-100">{t("discussServices")}</p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-6 text-lg rounded-lg font-semibold transition-all hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"><Link to={localize("/contact")}>{t("requestAFreePreview")}<ArrowRight size={20} />
            </Link></Button>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;
