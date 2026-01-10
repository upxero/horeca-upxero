import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Award, TrendingUp, Heart, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Geen Commissies",
      description: "Wij geloven dat restaurants 100% van hun winst moeten behouden. Daarom werken we met transparante maandprijzen."
    },
    {
      icon: Heart,
      title: "Klantgericht",
      description: "Uw succes is ons succes. We bouwen langdurige relaties met onze klanten en denken mee over groei."
    },
    {
      icon: Zap,
      title: "Innovatie",
      description: "We blijven innoveren en verbeteren om u altijd de beste en modernste online besteloplossing te bieden."
    }
  ];

  const stats = [
    { number: "150+", label: "Tevreden Restaurants", icon: Users },
    { number: "25.000+", label: "Bestellingen/Maand", icon: TrendingUp },
    { number: "45%", label: "Gemiddelde Groei", icon: Award },
    { number: "98%", label: "Klanttevredenheid", icon: Heart }
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Over{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
                  Upxero
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Wij helpen horeca-ondernemers in België om meer online bestellingen te genereren 
                zonder hoge commissies te betalen aan bestelplatforms. Onze missie is om elke restaurant 
                toegang te geven tot professionele online ordering technologie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-lg font-semibold transition-all hover:shadow-xl hover:scale-105 inline-flex items-center gap-2">
                    Start Samenwerking
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg font-semibold transition-all">
                    Onze Diensten
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1762087577613-978bf9066d39"
                  alt="Upxero Team"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Onze Missie
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Wij geloven dat elke horeca-ondernemer de mogelijkheid moet hebben om direct 
              online bestellingen te ontvangen zonder afhankelijk te zijn van dure bestelplatforms. 
              Met Upxero maken we professionele online ordering technologie toegankelijk voor elk restaurant, 
              van kleine frituren tot grote brasseries.
            </p>
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
            <h2 className="text-4xl font-bold mb-4">
              Upxero in Cijfers
            </h2>
            <p className="text-xl text-blue-100">
              De resultaten spreken voor zich
            </p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ons Verhaal
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Upxero is ontstaan uit frustratie. Frustratie over hoe bestelplatforms zoals Deliveroo 
              en Uber Eats horeca-ondernemers uitknijpen met commissies tot 30% per bestelling. 
              We zagen restaurants hard werken om aan het einde van de maand nauwelijks winst over te houden.
            </p>
            <p className="text-lg leading-relaxed">
              Daarom hebben we Upxero opgericht: een complete online besteloplossing zonder commissies. 
              Restaurants betalen alleen een vast maandbedrag en houden 100% van hun winst. Zo simpel is het.
            </p>
            <p className="text-lg leading-relaxed">
              Vandaag helpen we meer dan 150 restaurants in België om succesvol online bestellingen te 
              ontvangen. Van kleine frituren tot grote restaurants - ze profiteren allemaal van meer 
              directe bestellingen en hogere winstmarges.
            </p>
            <p className="text-lg leading-relaxed">
              Onze aanpak is simpel: we leveren professionele technologie, maar houden het eenvoudig voor 
              de restaurateur. Geen technische kennis nodig, geen gedoe met updates of onderhoud. 
              Wij regelen alles, u ontvangt alleen bestellingen.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Waarom Kiezen Voor Upxero?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Volledig Beheerd",
                description: "Wij zorgen voor hosting, updates, onderhoud en support. U hoeft nergens aan te denken."
              },
              {
                title: "Snel Live",
                description: "Binnen 2 weken kunt u al online bestellingen ontvangen. Van setup tot live in recordtijd."
              },
              {
                title: "Persoonlijke Support",
                description: "Direct contact met ons team. Geen robots of automatische antwoorden, maar echte mensen die u helpen."
              },
              {
                title: "Bewezen Resultaten",
                description: "Onze klanten zien gemiddeld 45% meer online bestellingen. Die resultaten spreken voor zich."
              },
              {
                title: "Transparante Prijzen",
                description: "Vaste maandprijzen zonder verborgen kosten. U weet precies waar u aan toe bent."
              },
              {
                title: "Belgische Focus",
                description: "Wij begrijpen de Belgische markt en horeca-sector. Alles is afgestemd op lokale behoeften."
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Klaar om samen te werken?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Ontdek hoe Upxero uw restaurant kan helpen om meer te verdienen met online bestellingen
          </p>
          <Link to="/contact">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-6 text-lg rounded-lg font-semibold transition-all hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2">
              Vraag Gratis Demo Aan
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
