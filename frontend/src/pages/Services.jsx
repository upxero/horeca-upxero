import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ShoppingCart, Smartphone, Settings, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { services } from '../mock';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Services = () => {
  const detailedServices = [
    {
      id: 1,
      icon: Globe,
      title: "Professionele Horeca Website",
      description: "Een moderne, mobile-first website die uw restaurant perfect presenteert aan potentiële klanten.",
      image: "https://images.pexels.com/photos/12935074/pexels-photo-12935074.jpeg",
      features: [
        "Modern en responsive design",
        "Geoptimaliseerd voor mobiele apparaten",
        "SEO-vriendelijk voor betere vindbaarheid",
        "Snelle laadtijden",
        "Menu presentatie met foto's",
        "Openingstijden en locatie-informatie"
      ]
    },
    {
      id: 2,
      icon: ShoppingCart,
      title: "Online Bestelsysteem",
      description: "Een geïntegreerd bestelsysteem waarmee klanten direct bij u kunnen bestellen zonder commissies.",
      image: "https://images.pexels.com/photos/12935041/pexels-photo-12935041.jpeg",
      features: [
        "0% commissie per bestelling",
        "Real-time ordernotificaties",
        "Afhaling en takeaway opties",
        "Meerdere betaalmethoden",
        "Orderhistorie en tracking",
        "Klantaccounts met herhalingsbestellingen"
      ]
    },
    {
      id: 3,
      icon: Smartphone,
      title: "Gebrande Bestelapp",
      description: "Uw eigen iOS en Android app met uw huisstijl en logo voor maximale klantloyaliteit.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      features: [
        "Volledig in uw huisstijl",
        "Push notificaties voor aanbiedingen",
        "Loyaliteitsprogramma integratie",
        "iOS en Android beschikbaar",
        "Eenvoudig bestellen met één klik",
        "Offline menu beschikbaar"
      ]
    },
    {
      id: 4,
      icon: Settings,
      title: "Volledig Beheerd & Support",
      description: "Wij zorgen voor alles - van hosting tot updates en technische ondersteuning.",
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9",
      features: [
        "24/7 hosting en uptime monitoring",
        "Automatische updates en backups",
        "Technische support via email en telefoon",
        "Menu aanpassingen en wijzigingen",
        "Veilige betaalverwerking",
        "Regelmatige performance optimalisatie"
      ]
    }
  ];

  const additionalServices = [
    {
      title: "Marketing & SEO",
      description: "Verhoog uw online zichtbaarheid en trek meer klanten aan",
      items: ["Google Business optimalisatie", "Lokale SEO", "Social media integratie", "Email marketing"]
    },
    {
      title: "Rapportage & Analytics",
      description: "Inzicht in uw online bestellingen en klantgedrag",
      items: ["Verkooprapporten", "Populairste gerechten", "Klantstatistieken", "Conversie tracking"]
    },
    {
      title: "Integraties",
      description: "Koppel uw bestaande systemen aan uw online platform",
      items: ["Kassasysteem integratie", "Boekhoud software", "Keukenprinters", "Externe bezorgdiensten"]
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
              Een complete, commissievrije online besteloplossing voor uw horeca business. 
              Alles wat u nodig heeft onder één dak.
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
