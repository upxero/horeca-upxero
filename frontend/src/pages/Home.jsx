import { Trans, useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, TrendingUp, ShoppingBag, Users, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { testimonials, getPricingPlans, getStats, getBenefits } from '../mock';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Home = () => {
  const { t } = useTranslation('home');
  const { localize } = useLanguage();
  const pricingPlans = getPricingPlans(t);
  const stats = getStats(t);
  const benefits = getBenefits(t);

  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" tabIndex={-1}>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">{t("websiteAndOrdering")}</div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <Trans t={t} i18nKey="heroTitle" components={{ accent: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700" /> }} />
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{t("coreIntro")}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-lg font-semibold transition-all hover:shadow-xl hover:scale-105 flex items-center gap-2"><Link to={localize("/contact")}>{t("requestAFreePreview")}<ArrowRight size={20} />
                  </Link></Button>
                <Button asChild
                    variant="outline"
                    className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg font-semibold transition-all"
                  ><Link to={localize("/pricing")}>{t("viewPricing")}</Link></Button>
              </div>

              {/* Stats */}
              <p className="text-sm text-gray-600 mt-6">{t('content:vat')}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-blue-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                  alt={t("modernRestaurant")}
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">€0</div>
                    <div className="text-sm text-gray-600">{t("orderingFree")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("onlinePresenceTitle")}</h2>
            <p className="text-xl text-gray-600 leading-relaxed">{t("onlinePresenceIntro")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-3xl">💸</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t("websiteTitle")}</h3>
                <p className="text-gray-600">{t("websiteIntro")}</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t("maintenanceTitle")}</h3>
                <p className="text-gray-600">{t("maintenanceIntro")}</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-3xl">📞</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t("orderingTitle")}</h3>
                <p className="text-gray-600">{t("orderingIntro")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("theCompleteUpxeroSolution")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("solutionIntro")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <Card
                key={benefit.id}
                className="bg-gradient-to-br from-blue-50 to-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("transparentPricing")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("packageIntro")}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`bg-white border-2 transition-all hover:shadow-2xl hover:scale-105 ${
                  plan.popular ? 'border-orange-500 shadow-xl' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-orange-500 text-white text-center py-2 font-semibold text-sm">{t("mostPopular")}</div>
                )}

                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>

                  <div className="mb-2">
                    <span className="text-5xl font-bold text-blue-900">
                      €{plan.price}
                    </span>
                    <span className="text-gray-600">
                      /{plan.period}
                    </span>
                  </div>

                  {/* SETUP ACTIE */}
                  <p className="text-sm text-gray-600 mb-4">{t('content:setupCharge', { price: plan.setupPrice })}</p>
                  <p className="text-xs text-gray-600 mb-4">{t('content:vat')}</p>

                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check
                          className="text-green-600 flex-shrink-0 mt-0.5"
                          size={20}
                        />
                        <span className="min-w-0 break-words text-gray-700">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild
                      className={`w-full whitespace-normal h-auto min-h-12 py-3 rounded-lg font-semibold transition-all ${
                        plan.popular
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    ><Link to={localize(`/contact?plan=${plan.name.toLowerCase()}`)}>{t("content:discussPlan", { plan: plan.name })}</Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-xl bg-gray-50 p-5 sm:p-6 text-sm sm:text-base leading-relaxed text-gray-700 space-y-4" data-package-conditions>
            <h3 className="text-lg font-semibold text-gray-900">{t('content:detailsTitle')}</h3>
            {['pageCounting', 'domainDetails', 'emailDetails', 'changesDetails', 'yesThereIsAMinimumTermOf6'].map(key => <p key={key}>{t('content:' + key)}</p>)}
          </div>
          <div className="text-center mt-12">
            <Button asChild
                variant="outline"
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg font-semibold"
              ><Link to={localize("/pricing")}>{t("viewAllPricing")}</Link></Button>
          </div>
        </div>
      </section>

      {/* Testimonials 
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Wat onze klanten zeggen
            </h2>
            <p className="text-xl text-gray-600">
              Ontdek hoe Upxero restaurants helpt meer te verdienen
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.business}</div>
                      <div className="text-sm text-orange-600">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("discussWebsiteTitle")}</h2>
          <p className="text-xl mb-8 text-blue-100">{t("previewIntro")}</p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-6 text-lg rounded-lg font-semibold transition-all hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"><Link to={localize("/contact")}>{t("viewFreeDemo")}<ArrowRight size={20} />
            </Link></Button>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default Home;
