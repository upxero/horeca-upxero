import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { useSEO } from '../hooks/useSEO';

const PortfolioRestaurants = () => {
  useSEO({
    title: 'Portfolio | Upxero – horeca & maatwerk websites',
    description:
      'Bekijk een selectie van horecawebsites en andere maatwerk webprojecten ontwikkeld door Upxero.',
    canonical: 'https://www.upxero.com/restaurant-portfolio',
  });

  const liveRestaurants = [
    {
      name: 'Korat Thai Sint-Niklaas',
      url: 'https://www.korat-thai-sint-niklaas.be/',
      note: 'Website + online reservatie',
      logo: '/assets/logos/korat-logo.jpg',
    },
    {
      name: 'New Edo Sushi',
      url: 'https://www.new-edo-sushi.be/',
      note: 'Website + online reservatie',
      logo: '/assets/logos/home-sushi-rolls.png',
    },
    {
      name: 'Janya Thai Wok',
      url: 'https://janya.be/',
      note: 'Website + reservatieformulier',
      logo: '/assets/logos/janya-logo.png',
    },
    {
      name: 'Akira Sushi',
      url: 'https://akirasushi.be/',
      note: 'Website + reservatieformulier',
      logo: '/assets/logos/akirasushi.png',
    },
    {
      name: 'Nakhon Thai',
      url: 'https://nakhon-thai.be/',
      note: 'Website + online reservatie',
      logo: '/assets/logos/nakhon-logo.png',
    },
    {
      name: 'Little Thai by Sanito',
      url: 'https://littlethaibysanito.be/',
      note: 'Website + online reservatie (Happy Chef)',
      logo: '/assets/logos/logo-sanito.png',
    },
  ];

  const upcomingRestaurants = [
    {
      name: 'Aroma Cubana',
      url: 'https://aromacubana.netlify.app/',
      note: 'Bijna klaar – nieuwe website',
      logo: '/assets/logos/logo-aroma-cubana.jpg',
    },
    {
      name: 'Taverne Kopenhagen',
      url: 'https://tavernekopenhagen.com/',
      note: 'Bijna klaar – website in afronding',
      logo: '/assets/logos/logo-kopenhagen.jpg',
    },
    {
      name: 'Armenian House',
      url: 'https://armenianhouse.netlify.app/',
      note: 'Nieuwe website – oplevering volgt',
      logo: '/assets/logos/armenian-house-logo.jpeg',
    },
  ];

  const otherProjects = [
    {
      name: 'KJ Events',
      url: 'https://www.kj-events.eu/',
      type: 'Web Development',
      logo: '/assets/logos/kj-logo.jpg',
    },
    {
      name: 'Meijin Ryu Karate',
      url: 'https://meijinryu.com/',
      type: 'Web Development',
      logo: '/assets/logos/meijin-logo.jpg',
    },
    {
      name: 'Donovan Tack',
      url: 'https://donovan-tack.be/',
      type: 'Bedrijfswebsite',
      logo: '/assets/logos/dt-logo.png',
    },
    {
      name: 'De Flexi Jobber',
      url: 'https://de-flexi-jobber.be/',
      type: 'WordPress platform',
      logo: '/assets/logos/flexi-jobber-logo.png',
    },
    {
      name: 'Learn Dutch BBB',
      url: 'https://www.learn-dutch-bbb.eu/',
      type: 'BigBlueButton setup',
      logo: '/assets/logos/bbb-logo.jpg',
    },
    {
      name: 'Learn Dutch Online',
      url: 'https://www.learn-dutch-online.com/',
      type: 'React app development',
      logo: '/assets/logos/learn-dutch.png',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 leading-tight">
          Portfolio{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
            Upxero
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Horecawebsites en maatwerkprojecten met focus op gebruiksvriendelijkheid,
          snelheid en conversie.
        </p>
      </section>

      {/* Live restaurants */}
      <section className="pb-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Live restaurants
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {liveRestaurants.map((r, i) => (
              <Card key={i} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-5">
                  <div className="h-36 bg-gray-50 rounded mb-4 flex items-center justify-center p-4">
                    <img
                        src={r.logo}
                        alt={`${r.name} logo`}
                        className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">{r.name}</h3>

                  <p className="text-gray-600 flex items-center gap-2 mt-2">
                    <CheckCircle size={16} className="text-green-500" />
                    {r.note}
                  </p>

                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-900 font-semibold mt-4"
                  >
                    Bekijk website <ExternalLink size={16} />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Binnenkort live
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingRestaurants.map((r, i) => (
              <Card key={i} className="shadow hover:shadow-md transition-shadow opacity-90">
                <CardContent className="p-5">
                  <div className="h-36 bg-gray-50 rounded mb-4 flex items-center justify-center p-4">
                    <img
                        src={r.logo}
                        alt={`${r.name} logo`}
                        className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">{r.name}</h3>
                  <p className="text-gray-600 mt-2">{r.note}</p>

                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-700 font-medium mt-4"
                  >
                    Bekijk preview <ExternalLink size={16} />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other projects */}
      <section className="pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Andere projecten
          </h2>
          <p className="text-gray-600 max-w-3xl mb-10">
            Naast horecawebsites realiseren we ook maatwerkprojecten voor andere
            sectoren, van webplatformen tot React-applicaties.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {otherProjects.map((p, i) => (
              <Card key={i} className="shadow hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="h-36 bg-gray-50 rounded mb-4 flex items-center justify-center p-4">
                    <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                  <p className="text-gray-600 mt-2">{p.type}</p>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-900 font-semibold mt-4"
                  >
                    Bekijk project <ExternalLink size={16} />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioRestaurants;

