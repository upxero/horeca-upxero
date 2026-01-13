import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { pricingPlans, faqs } from '../mock';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Pricing = () => {
  const comparisonFeatures = [
    {
      category: "Basis online bestellen",
      features: [
        {
          name: "Online bestelsysteem voor afhaling & takeaway",
          start: true,
          grow: true,
          boost: true,
        },
        {
          name: "Menu setup & volledige integratie",
          start: true,
          grow: true,
          boost: true,
        },
        {
          name: "Koppeling met GloriaFood (betrouwbaar & commissievrij)",
          start: true,
          grow: true,
          boost: true,
        },
        {
          name: "Hosting, updates & beveiliging volledig beheerd",
          start: true,
          grow: true,
          boost: true,
        },
      ],
    },
    {
      category: "Website & uitstraling",
      features: [
        {
          name: "Gebruik van bestaande website",
          start: true,
          grow: false,
          boost: false,
        },
        {
          name: "Professionele horeca website (mobile-first)",
          start: false,
          grow: true,
          boost: true,
        },
        {
          name: "SEO-basis voor lokale vindbaarheid",
          start: false,
          grow: true,
          boost: true,
        },
      ],
    },
    {
      category: "WhatsApp & klanten",
      features: [
        {
          name: "WhatsApp-knop op uw website",
          start: true,
          grow: true,
          boost: true,
        },
        {
          name: "Automatisch WhatsApp-antwoord met bestel-link",
          start: false,
          grow: true,
          boost: true,
        },
        {
          name: "Klanten worden gestuurd naar online bestellen (geen chaos)",
          start: false,
          grow: true,
          boost: true,
        },
      ],
    },
    {
      category: "Optimalisatie & groei",
      features: [
        {
          name: "Conversie-optimalisatie (meer bestellingen uit hetzelfde verkeer)",
          start: false,
          grow: false,
          boost: true,
        },
        {
          name: "Google Business integratie (bestellen via Google)",
          start: false,
          grow: false,
          boost: true,
        },
        {
          name: "Rapportage & continue optimalisatie",
          start: false,
          grow: false,
          boost: true,
        },
      ],
    },
    {
      category: "Support & ontzorging",
      features: [
        {
          name: "Email support",
          start: true,
          grow: true,
          boost: true,
        },
        {
          name: "Prioriteit support & persoonlijk advies",
          start: false,
          grow: false,
          boost: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transparante{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
                Prijzen
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Kies het plan dat bij uw restaurant past. Geen verborgen kosten, 
              geen commissies per bestelling. Maandelijks opzegbaar.
            </p>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
              <Check size={20} />
              Alle plannen zijn commissievrij
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative bg-white transition-all hover:shadow-2xl ${
                  plan.popular
                    ? 'border-2 border-orange-500 shadow-xl scale-105'
                    : 'border border-gray-200 hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      MEEST POPULAIR
                    </div>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-blue-900">€{plan.price}</span>
                      <span className="text-gray-600 text-lg">/{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <Button
                      className={`w-full py-6 rounded-lg font-semibold text-lg transition-all ${
                        plan.popular
                          ? 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-xl'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      {plan.popular ? 'Start Nu' : 'Kies Dit Plan'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Niet zeker welk plan bij u past? Neem contact met ons op voor persoonlijk advies.
            </p>
            <Link to="/contact">
              <Button variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg font-semibold">
                Ontvang Voorstel Op Maat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Alles inbegrepen, duidelijk vergeleken
            </h2>
            <p className="text-xl text-gray-600">
              Geen technische details, wel volledige duidelijkheid over wat wij voor u regelen.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                      Functie
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                      Start
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 bg-orange-50">
                      Grow
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">
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
                          <td className="px-6 py-4 text-gray-700">{feature.name}</td>
                          <td className="px-6 py-4 text-center">
                            {feature.start ? (
                              <Check className="text-green-600 mx-auto" size={20} />
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center bg-orange-50/30">
                            {feature.grow ? (
                              <Check className="text-green-600 mx-auto" size={20} />
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {feature.boost ? (
                              <Check className="text-green-600 mx-auto" size={20} />
                            ) : (
                              <span className="text-gray-300">—</span>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Veelgestelde Vragen
            </h2>
            <p className="text-xl text-gray-600">
              Antwoorden op de meest gestelde vragen over prijzen en diensten
            </p>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nog vragen?
            </h3>
            <p className="text-gray-600 mb-6">
              Neem contact met ons op en we helpen u graag verder
            </p>
            <Link to="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-lg font-semibold transition-all hover:shadow-xl inline-flex items-center gap-2">
                Contacteer Ons
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
