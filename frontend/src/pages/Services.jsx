import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ShoppingCart, Smartphone, Settings, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { services } from '../mock';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

const Services = () => {

  useSEO({
    title: "Horeca website, online bestellen & WhatsApp | Diensten Upxero",
    description:
      "Ontdek alle Upxero diensten voor restaurants: professionele horeca websites, online bestellen zonder commissie en een slimme WhatsApp bestel-assistent voor België & Nederland.",
    canonical: "https://www.upxero.com/services",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Diensten voor restaurants",
      "url": "https://www.upxero.com/services",
      "description":
        "Overzicht van diensten voor restaurants: horeca websites, online bestellen zonder commissie en WhatsApp automatisatie.",
      "publisher": {
        "@type": "Organization",
        "name": "Upxero",
        "url": "https://www.upxero.com"
      },
      "mainEntity": {
        "@type": "Service",
        "provider": {
          "@type": "Organization",
          "name": "Upxero"
        },
        "areaServed": [
          { "@type": "Country", "name": "Belgium" },
          { "@type": "Country", "name": "Netherlands" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Upxero Diensten",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Maatwerk websites & webapplicaties",
                "description":
                  "Op maat gemaakte websites en weboplossingen voor niet-horeca bedrijven, uitgewerkt via persoonlijke offerte."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Professionele horeca website",
                "description":
                  "Snelle, mobile-first horeca website met focus op online bestellingen en conversie."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Online bestellen zonder commissie",
                "description":
                  "Online bestelsysteem voor afhaling en takeaway, volledig commissievrij."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "WhatsApp bestel-assistent",
                "description":
                  "Automatische WhatsApp assistent die klanten doorstuurt naar online bestellen."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Volledig beheer & support",
                "description":
                  "Hosting, updates, beveiliging en technische opvolging inbegrepen."
              }
            }
          ]
        }
      }
    }
  });

  const detailedServices = [
    {
      id: 1,
      icon: Globe,
      title: "Professionele Horeca Website",
      description:
        "Een snelle, mobile-first website die bezoekers duidelijk begeleidt naar bestellen of contact opnemen.",
      image: "https://images.pexels.com/photos/12935074/pexels-photo-12935074.jpeg",
      features: [
      "Modern en professioneel horeca-design",
      "Geoptimaliseerd voor mobiel gebruik",
      "Duidelijke call-to-actions (bestellen & contact)",
      "Snelle laadtijden voor hogere conversie",
      "Overzichtelijke en duidelijke menupresentatie",
      "Sterke basis voor online bestellen en klantdoorverwijzing"
    ]
    },
    {
      id: 2,
      icon: ShoppingCart,
      title: "Online Bestellen Zonder Commissie",
      description:
        "Klanten bestellen rechtstreeks via uw eigen website, zonder tussenplatformen of kosten per bestelling.",
      image: "https://images.pexels.com/photos/12935041/pexels-photo-12935041.jpeg",
      features: [
        "100% commissievrij bestellen",
        "Afhaling en takeaway",
        "Realtime bestelmeldingen",
        "Veilige online betalingen",
        "Minder fouten dan telefonische bestellingen",
        "Volledig geïntegreerd in uw eigen website"
      ]
    },
    {
      id: 3,
      icon: Smartphone,
      title: "WhatsApp Flow & AI Assistent",
      description:
        "Een slimme WhatsApp-oplossing die klanten automatisch begeleidt. De standaard flow stuurt door naar online bestellen, uitbreidbaar met een AI-assistent voor 24/7 klantvragen.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      features: [
        "Vaste WhatsApp-flow met vooraf ingestelde antwoorden",
        "Automatische doorverwijzing naar online bestellen",
        "Geen bestellingen via WhatsApp (minder fouten)",
        "Minder telefoons en onderbrekingen tijdens service",
        "Optioneel uitbreidbaar met AI-assistent",
        "AI-assistent beantwoordt vragen 24/7, ook buiten openingsuren"
      ]
    },
    {
      id: 4,
      icon: Settings,
      title: "Volledig Beheerd & Ondersteund",
      description:
        "Wij regelen alles technisch en praktisch. U focust op uw zaak, wij zorgen voor de rest.",
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9",
      features: [
        "Hosting, beveiliging en updates inbegrepen",
        "Technische monitoring en opvolging",
        "Aanpassingen aan menu of content op aanvraag",
        "Snelle en persoonlijke support via email en WhatsApp",
        "Doorlopende optimalisatie",
        "Geen technische kennis nodig"
      ]
    }
  ];

  const additionalServices = [
    {
      title: "Marketing & Zichtbaarheid",
      description: "Meer bezoekers en meer directe bestellingen via uw eigen kanalen",
      items: [
        "Google Business optimalisatie",
        "Betere lokale vindbaarheid",
        "Conversiegerichte content",
        "Doorverwijzing vanuit WhatsApp naar bestellen"
      ]
    },
    {
      title: "Inzichten & Optimalisatie",
      description: "Inzicht in wat werkt en waar klanten afhaken",
      items: [
        "Overzicht van online bestellingen",
        "Populairste gerechten en momenten",
        "Conversie-inzichten",
        "Maandelijkse optimalisatie"
      ]
    },
    {
      title: "Slimme Koppelingen & Flow",
      description: "Alles werkt samen in één duidelijke bestelervaring",
      items: [
        "WhatsApp → online bestellen",
        "Website → directe bestelling",
        "Minder telefonische druk",
        "Consistente klantenervaring",
        "Optioneel uitbreidbaar met AI-assistent (Boost)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Onze{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
                Diensten
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ontdek hoe uw restaurant meer directe bestellingen ontvangt
              zonder commissies, zonder extra telefoons en zonder chaos.
              Met Upxero werken uw website, online bestellen en een slimme
              AI-gestuurde WhatsApp-assistent samen in één automatische flow.
            </p>
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
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl mb-6">
                    <service.icon className="text-blue-900" size={32} />
                  </div>
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

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Extra Diensten
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Optionele services om uw online aanwezigheid nog verder te versterken
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Ook geen horeca?
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Upxero is gespecialiseerd in horecawebsites en online bestellingen,
                  maar we bouwen ook <strong>op maat gemaakte websites</strong> voor andere sectoren.
                </p>

                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    "E-commerce websites",
                    "Diensten & lokale handelaars",
                    "Bedrijfssites",
                    "Online platformen",
                    "Webapps & maatwerk",
                    "Unieke projecten"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="text-blue-700 mt-1" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-gray-600 mb-8">
                  Deze projecten vallen buiten onze vaste horeca-pakketten
                  en worden altijd uitgewerkt via een <strong>persoonlijke offerte</strong>.
                </p>

                <Link to="/contact">
                  <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-5 text-lg rounded-lg font-semibold inline-flex items-center gap-2">
                    Neem contact op
                    <ArrowRight size={20} />
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt="Maatwerk websites en webapplicaties"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Hoe het werkt
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van aanmelding tot live gaan in 4 eenvoudige stappen
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Gratis Demo", description: "Vraag een demo aan en ontdek de mogelijkheden" },
              { step: "2", title: "Setup", description: "Wij richten uw website en bestelsysteem in" },
              { step: "3", title: "Content", description: "Uw menu en foto's worden toegevoegd" },
              { step: "4", title: "Live!", description: "Binnen 2 weken kunt u online bestellingen ontvangen" }
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Klaar om te beginnen?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Vraag een gratis demo aan en ontdek hoe onze diensten uw restaurant kunnen helpen groeien
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-6 text-lg rounded-lg font-semibold transition-all hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2">
                Vraag Gratis Demo Aan
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-10 py-6 text-lg rounded-lg font-semibold transition-all">
                Bekijk Prijzen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
