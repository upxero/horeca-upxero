import { Trans, useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { getPricingPlans, getFaqs } from '../mock';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Pricing = () => {
  const { t } = useTranslation('pricing');
  const { localize } = useLanguage();
  const pricingPlans = getPricingPlans(t);
  const faqs = getFaqs(t);


  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const comparisonFeatures = [{ category: t('websitePackages'), features: [
    { name: t('content:pageLimit'), start: false, grow: '5', boost: '10' },
    { name: t('content:emailAccounts'), start: false, grow: '2', boost: '5' },
    ...['domainAllowance', 'hostingUpdatesSecurity', 'websiteMaintenance', 'technicalSeo'].map(key => ({ name: t('content:' + key), start: false, grow: true, boost: true })),
    ...['basicIntegration', 'setupAssistance', 'emailSupport'].map(key => ({ name: t('content:' + key), start: true, grow: true, boost: true })),
    ...['prioritySupport', 'monthlyChanges'].map(key => ({ name: t('content:' + key), start: false, grow: false, boost: true })),
  ] }, { category: t('orderingProduct'), features: [
    { name: t('content:orderingFreeAvailable'), start: true, grow: false, boost: false },
    { name: t('content:orderingProIncluded'), start: false, grow: true, boost: true },
  ] }];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" tabIndex={-1}>

      {/* Hero Section */}
      <section 
      id="plans"
      className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 break-words">
              <Trans t={t} i18nKey="heroTitle" components={{ accent: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700" /> }} />
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">{t("packageIntro")}</p>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
              <Check size={20} />{t("packageBadge")}</div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative min-w-0 bg-white transition-all hover:shadow-2xl ${
                  plan.popular
                    ? 'border-2 border-orange-500 shadow-xl scale-105'
                    : 'border border-gray-200 hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">{t("mostPopular")}</div>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>

                    <div className="mb-2">
                      <span className="text-5xl font-bold text-blue-900">
                        €{plan.price}
                      </span>
                      <span className="text-gray-600 text-lg">
                        /{plan.period}
                      </span>
                    </div>

                    {/* SETUP ACTIE */}
                    <p className="text-sm text-gray-600 mb-4">{t('content:setupCharge', { price: plan.setupPrice })}</p>
                  <p className="text-xs text-gray-600 mb-4">{t('content:vat')}</p>

                    <p className="text-gray-600">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                        <span className="min-w-0 break-words text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild
                      className={`w-full whitespace-normal h-auto min-h-12 py-3 rounded-lg font-semibold text-lg transition-all ${
                        plan.popular
                          ? 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-xl'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    ><Link to={localize(`/contact?plan=${plan.name.toLowerCase()}`)}>
                      {t("content:discussPlan", { plan: plan.name })}
                    </Link></Button>
                  {plan.id === 1 && (
                    <Link to={localize('/contact?subject=upgrade-grow')} className="block mt-4 text-center text-blue-900 underline font-semibold">
                      {t('requestGrowUpgrade')}
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-sm text-gray-700 space-y-3" data-package-conditions>
            <h3 className="font-bold">{t('content:detailsTitle')}</h3>
            {['pageCounting', 'domainDetails', 'emailDetails', 'changesDetails', 'yesThereIsAMinimumTermOf6'].map(key => <p key={key}>{t('content:' + key)}</p>)}
          </div>

          <div id="ordering" className="mt-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-10 text-center shadow-xl">
            <h3 className="text-3xl font-bold mb-4">{t("orderingFreeTitle")}</h3>
            <p className="text-4xl font-bold mb-4">{t("orderingFreePrice")}</p>
            <p className="text-lg mb-4 text-blue-100">{t("orderingFreeDescription")}</p>
            <p className="text-lg mb-6 text-blue-100">{t("orderingIndependent")}</p>

            <a
              href="https://ordering.upxero.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition shadow-lg"
            >{t("startForFree")}</a>
            <h4 className="text-2xl font-bold mt-8 mb-3">{t("orderingProTitle")}</h4>
            <p className="text-lg text-blue-100 mb-4">{t("orderingProDescription")}</p>
            <p className="text-lg text-blue-100">{t("proActivation")}</p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">{t("notSureWhichPlanSuitsYouContactUs")}</p>
            <Button asChild variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg font-semibold"><Link to={localize("/contact")}>{t("getATailoredProposal")}</Link></Button>
          </div>
        </div>
      </section>

      {/* Retain the existing hash for saved links. */}
      <section id="no-commissions" className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <Trans t={t} i18nKey="orderingSectionTitle" components={{ accent: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600" /> }} />
            </h2>
            <p className="text-xl text-gray-600">{t('orderingSectionIntro')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 text-gray-700 text-lg">
              <p>{t('websiteSectionDescription')}</p>
              <p>{t('orderingSectionDescription')}</p>
              <p>{t('proActivation')}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('websiteContact')}</h3>
              <Button asChild className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-5 text-lg rounded-lg font-semibold"><Link to={localize('/contact')}>{t('requestAFreePreview')}</Link></Button>
              <Link to={localize('/contact?subject=upgrade-grow')} className="block mt-6 text-blue-900 underline font-semibold">
                {t('requestGrowUpgrade')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("everythingIncludedClearlyCompared")}</h2>
            <p className="text-xl text-gray-600">{t("aClearOverviewOfWhatWeTakeCare")}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900">{t("feature")}</th>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                      Start
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-gray-900 bg-orange-50">
                      Grow
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                      Boost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <tr className="bg-blue-50">
                        <td
                          colSpan={4}
                          className="px-6 py-3 text-left font-bold text-blue-900 text-sm uppercase tracking-wide"
                        >
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr
                          key={featureIndex}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <th scope="row" className="px-6 py-4 text-left font-normal text-gray-700">{feature.name}</th>
                          <td className="px-6 py-4 text-center">
                            {typeof feature.start === 'string' ? feature.start : feature.start ? (
                              <><Check aria-hidden="true" className="text-green-600 mx-auto" size={20} /><span className="sr-only">{t('content:included')}</span></>
                            ) : (
                              <><span aria-hidden="true" className="text-gray-300">—</span><span className="sr-only">{t('content:notIncluded')}</span></>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center bg-orange-50/30">
                            {typeof feature.grow === 'string' ? feature.grow : feature.grow ? (
                              <><Check aria-hidden="true" className="text-green-600 mx-auto" size={20} /><span className="sr-only">{t('content:included')}</span></>
                            ) : (
                              <><span aria-hidden="true" className="text-gray-300">—</span><span className="sr-only">{t('content:notIncluded')}</span></>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof feature.boost === 'string' ? feature.boost : feature.boost ? (
                              <><Check aria-hidden="true" className="text-green-600 mx-auto" size={20} /><span className="sr-only">{t('content:included')}</span></>
                            ) : (
                              <><span aria-hidden="true" className="text-gray-300">—</span><span className="sr-only">{t('content:notIncluded')}</span></>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <HelpCircle className="text-blue-900" size={32} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("frequentlyAskedQuestions")}</h2>
            <p className="text-xl text-gray-600">{t("answersToCommonQuestionsAboutPricingAndServices")}</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="bg-gray-50 rounded-lg px-6 border-0"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-900 py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center p-8 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("stillHaveQuestions")}</h3>
            <p className="text-gray-600 mb-6">{t("contactUsAndWeWillBeHappyTo")}</p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-lg font-semibold transition-all hover:shadow-xl inline-flex items-center gap-2"><Link to={localize("/contact")}>{t("contactUs")}<ArrowRight size={20} />
              </Link></Button>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
