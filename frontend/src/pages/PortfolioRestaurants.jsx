import React, { useState } from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { useSEO } from '../hooks/useSEO';

const PortfolioRestaurants = () => {
  const [lang, setLang] = useState('nl'); // <-- correct voor .jsx

  // SEO
  useSEO({
    title:
      lang === 'nl'
        ? 'Portfolio | Upxero – horeca & maatwerk websites'
        : 'Portfolio | Upxero – hospitality & custom websites',
    description:
      lang === 'nl'
        ? 'Bekijk een selectie van horecawebsites en andere maatwerk webprojecten ontwikkeld door Upxero.'
        : 'Browse a selection of hospitality websites and other custom web projects developed by Upxero.',
    canonical: 'https://www.upxero.com/restaurant-portfolio',
  });

  // Teksten per taal
  const texts = {
    heroTitle: lang === 'nl' ? 'Portfolio' : 'Portfolio',
    heroSubtitle:
      lang === 'nl'
        ? 'Horecawebsites en maatwerkprojecten met focus op gebruiksvriendelijkheid, snelheid en conversie.'
        : 'Hospitality websites and custom projects focused on usability, speed and conversion.',
    liveRestaurants: lang === 'nl' ? 'Live restaurants' : 'Live restaurants',
    upcoming: lang === 'nl' ? 'Binnenkort live' : 'Coming soon',
    otherProjects: lang === 'nl' ? 'Andere projecten' : 'Other projects',
    otherProjectsDesc:
      lang === 'nl'
        ? 'Naast horecawebsites realiseren we ook maatwerkprojecten voor andere sectoren, van webplatformen tot React-applicaties.'
        : 'Besides hospitality websites, we also build custom projects for other sectors, from web platforms to React applications.',
    viewWebsite: lang === 'nl' ? 'Bekijk website' : 'View website',
    viewPreview: lang === 'nl' ? 'Bekijk preview' : 'View preview',
    viewProject: lang === 'nl' ? 'Bekijk project' : 'View project',
  };

  // Data arrays (blijven hetzelfde, alleen teksten via texts)
  const liveRestaurants = [
    { name: 'Korat Thai Sint-Niklaas', url: 'https://www.korat-thai-sint-niklaas.be/', note: 'Website + online reservatie', logo: '/assets/logos/korat-logo.jpg' },
    { name: 'New Edo Sushi', url: 'https://www.new-edo-sushi.be/', note: 'Website + online reservatie', logo: '/assets/logos/home-sushi-rolls.png' },
    { name: 'Janya Thai Wok', url: 'https://janya.be/', note: 'Website + reservatieformulier', logo: '/assets/logos/janya-logo.png' },
    { name: 'Akira Sushi', url: 'https://akirasushi.be/', note: 'Website + reservatieformulier', logo: '/assets/logos/akirasushi.png' },
    { name: 'Nakhon Thai', url: 'https://nakhon-thai.be/', note: 'Website + online reservatie', logo: '/assets/logos/nakhon-logo.png' },
    { name: 'Little Thai by Sanito', url: 'https://littlethaibysanito.be/', note: 'Website + online reservatie (Happy Chef)', logo: '/assets/logos/logo-sanito.png' },
    { name: 'Aroma Cubana', url: 'https://www.aroma-cubana.be/', note: 'Nieuwe website online', logo: '/assets/logos/logo-aroma-cubana.jpg' },
  ];

  const upcomingRestaurants = [
    { name: 'Copper75', url: 'https://copper75.vercel.app/', note: 'Nieuwe website – oplevering volgt', logo: '/assets/logos/copper75.png' },
    { name: 'Okaya Sushi Restaurant', url: 'https://okaya-sushi.vercel.app/', note: 'Nieuwe website – oplevering volgt', logo: '/assets/logos/logo-okaya.jpg' },
    { name: 'Armenian House', url: 'https://armenianhouse.netlify.app/', note: 'Nieuwe website – oplevering volgt', logo: '/assets/logos/armenian-house-logo.jpeg' },
    { name: 'Taverne Kopenhagen', url: 'https://tavernekopenhagen.com/', note: 'Bijna klaar – website in afronding', logo: '/assets/logos/logo-kopenhagen.jpg' },
  ];

  const otherProjects = [
    { name: 'KJ Events', url: 'https://www.kj-events.eu/', type: 'Web Development', logo: '/assets/logos/kj-logo.jpg' },
    { name: 'Meijin Ryu Karate', url: 'https://meijinryu.com/', type: 'Web Development', logo: '/assets/logos/meijin-logo.jpg' },
    { name: 'Donovan Tack', url: 'https://donovan-tack.be/', type: 'Bedrijfswebsite', logo: '/assets/logos/dt-logo.png' },
    { name: 'De Flexi Jobber', url: 'https://de-flexi-jobber.be/', type: 'WordPress platform', logo: '/assets/logos/flexi-jobber-logo.png' },
    { name: 'Learn Dutch BBB', url: 'https://www.learn-dutch-bbb.eu/', type: 'BigBlueButton setup', logo: '/assets/logos/bbb-logo.jpg' },
    { name: 'Learn Dutch Online', url: 'https://www.learn-dutch-online.com/', type: 'React app development', logo: '/assets/logos/learn-dutch.png' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Language toggle */}
      <div className="text-center mt-20 mb-8">
        <button
          className={`px-4 py-2 rounded-l ${lang === 'nl' ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}
          onClick={() => setLang('nl')}
        >
          NL
        </button>
        <button
          className={`px-4 py-2 rounded-r ${lang === 'en' ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}
          onClick={() => setLang('en')}
        >
          EN
        </button>
      </div>

      {/* Hero */}
      <section className="pt-0 pb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 leading-tight">
          {texts.heroTitle}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
            Upxero
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{texts.heroSubtitle}</p>
      </section>

      {/* Live restaurants */}
      <section className="pb-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{texts.liveRestaurants}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {liveRestaurants.map((r, i) => (
              <Card key={i} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-5">
                  <div className="h-36 bg-gray-50 rounded mb-4 flex items-center justify-center p-4">
                    <img src={r.logo} alt={`${r.name} logo`} className="max-h-full max-w-full object-contain" />
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
                    {texts.viewWebsite} <ExternalLink size={16} />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{texts.upcoming}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingRestaurants.map((r, i) => (
              <Card key={i} className="shadow hover:shadow-md transition-shadow opacity-90">
                <CardContent className="p-5">
                  <div className="h-36 bg-gray-50 rounded mb-4 flex items-center justify-center p-4">
                    <img src={r.logo} alt={`${r.name} logo`} className="max-h-full max-w-full object-contain" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{r.name}</h3>
                  <p className="text-gray-600 mt-2">{r.note}</p>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-700 font-medium mt-4"
                  >
                    {texts.viewPreview} <ExternalLink size={16} />
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{texts.otherProjects}</h2>
          <p className="text-gray-600 max-w-3xl mb-10">{texts.otherProjectsDesc}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {otherProjects.map((p, i) => (
              <Card key={i} className="shadow hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="h-36 bg-gray-50 rounded mb-4 flex items-center justify-center p-4">
                    <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-full object-contain" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                  <p className="text-gray-600 mt-2">{p.type}</p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-900 font-semibold mt-4"
                  >
                    {texts.viewProject} <ExternalLink size={16} />
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