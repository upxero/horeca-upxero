import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

const Contact = () => {

  useSEO({
    title: "Contact | Vraag een gratis demo aan voor uw restaurant | Upxero",
    description:
      "Vraag een gratis demo aan bij Upxero. Ontdek hoe restaurants in België en Nederland meer directe online bestellingen krijgen zonder commissies.",
    canonical: "https://www.upxero.com/contact",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Upxero",
      "url": "https://www.upxero.com/contact",
      "mainEntity": {
        "@type": "Organization",
        "name": "Upxero",
        "url": "https://www.upxero.com/",
        "logo": "https://www.upxero.com/logo.png",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "sales",
            "url": "https://wa.me/3197010268675",
            "availableLanguage": ["Dutch"],
            "areaServed": ["BE", "NL"]
          }
        ],
        "areaServed": [
          { "@type": "Country", "name": "Belgium" },
          { "@type": "Country", "name": "Netherlands" }
        ],
        "sameAs": [
          "https://www.facebook.com/upxero",
          "https://www.instagram.com/upxero",
          "https://www.linkedin.com/company/upxero"
        ]
      }
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    source: '',
    message: '',
    planInterest: 'grow'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Bedankt voor uw aanvraag! We nemen binnen 24 uur contact met u op.');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          business: '',
          source: '',
          message: '',
          planInterest: 'grow'
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      toast.error('Er is een fout opgetreden. Probeer het later opnieuw of neem direct contact met ons op.');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "info@upxero.com",
      link: "mailto:info@upxero.com"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: "Chat via WhatsApp",
      link: "https://wa.me/3197010268675"
    },
    {
      icon: MapPin,
      title: "Regio",
      content: "België & Nederland",
      link: null
    },
    {
      icon: Clock,
      title: "Werkdagen",
      content: "Ma-Vr: 8:00 - 17:00",
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Vraag een{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
                Gratis Demo
              </span>
              {' '}aan
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ontdek hoe uw restaurant meer directe bestellingen kan krijgen,
              zonder commissies en zonder extra telefoons.
              We tonen u hoe uw website, online bestellen en een slimme WhatsApp-assistent
              samenwerken in één eenvoudige flow.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="bg-white border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Vraag uw gratis demo aan
                  </h2>
                  <p className="text-gray-600 mb-8">
                    We laten u zien hoe klanten automatisch worden geholpen
                    en rechtstreeks online bestellen, zonder onderbrekingen in uw zaak.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-900 font-semibold mb-2 block">
                        Uw Naam *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jan Janssens"
                        className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-900 font-semibold mb-2 block">
                        Email Adres *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jan@restaurant.be"
                        className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-900 font-semibold mb-2 block">
                        Telefoonnummer *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+32 123 456 789"
                        className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <Label htmlFor="business" className="text-gray-900 font-semibold mb-2 block">
                        Naam Restaurant/Zaak *
                      </Label>
                      <Input
                        id="business"
                        name="business"
                        type="text"
                        required
                        value={formData.business}
                        onChange={handleChange}
                        placeholder="Brasserie De Gouden Leeuw"
                        className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <Label htmlFor="planInterest" className="text-gray-900 font-semibold mb-2 block">
                        Welk Plan Interesseert U?
                      </Label>
                      <select
                        id="planInterest"
                        name="planInterest"
                        value={formData.planInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                      >
                        <option value="start">Start - €29/maand</option>
                        <option value="grow">Grow - €49/maand</option>
                        <option value="boost">Boost - €79/maand</option>
                        <option value="not-sure">Nog niet zeker</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="source" className="text-gray-900 font-semibold mb-2 block">
                        Hoe heeft u ons gevonden?
                      </Label>
                      <select
                        id="source"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                      >
                        <option value="">Selecteer een optie</option>
                        <option value="google">Google</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="facebook">Facebook</option>
                        <option value="mario">Persoonlijk contact via Mario</option>
                        <option value="referral">Via een andere horecazaak</option>
                        <option value="other">Overige</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-900 font-semibold mb-2 block">
                        Uw Bericht (Optioneel)
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Bijvoorbeeld: veel telefonische bestellingen, vragen via WhatsApp, of te veel commissie via platformen"
                        className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className={`w-full py-6 text-lg font-semibold rounded-lg transition-all ${
                        isSubmitted
                          ? 'bg-green-600 hover:bg-green-600'
                          : 'bg-orange-500 hover:bg-orange-600'
                      } text-white hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Versturen...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle size={20} />
                          Verzonden!
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Verstuur Aanvraag
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-gray-600 text-center">
                      Uw gegevens worden enkel gebruikt om contact op te nemen over uw demo.
                      Geen spam, geen verplichtingen.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Image */}
            <div className="space-y-8">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 lg:h-80">
                <img
                  src="https://images.unsplash.com/photo-1685040235380-a42a129ade4e"
                  alt="Contact Upxero"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Eenvoudige flow</h3>
                  <p className="text-blue-100">Website, online bestellen en WhatsApp perfect op elkaar afgestemd</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="bg-gradient-to-br from-blue-50 to-white border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                        <info.icon className="text-white" size={24} />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-blue-900 hover:text-orange-500 transition-colors font-medium"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-700 font-medium">{info.content}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Wat gebeurt er na uw aanvraag?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                        1
                      </div>
                      <span className="text-gray-700">
                        We nemen contact op om uw huidige situatie te begrijpen
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                        2
                      </div>
                      <span className="text-gray-700">
                        U krijgt een demo van de website, het bestelsysteem en de WhatsApp-assistent
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                        3
                      </div>
                      <span className="text-gray-700">
                        We stellen een oplossing voor die past bij uw restaurant
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                        4
                      </div>
                      <span className="text-gray-700">
                        Binnen 2 weken kunnen klanten automatisch bestellen
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
