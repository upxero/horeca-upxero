import { useTranslation } from 'react-i18next';
import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';

const PortfolioRestaurants = () => {
  const { t } = useTranslation('portfolio');


  // Project identities and destinations stay independent of translated labels.
  const liveRestaurants = [
    { name: 'Korat Thai Sint-Niklaas', url: 'https://www.korat-thai-sint-niklaas.be/', note: t("websiteOnlineReservations"), logo: '/assets/logos/korat-logo.jpg' },
    { name: 'New Edo Sushi', url: 'https://www.new-edo-sushi.be/', note: t("websiteOnlineReservations"), logo: '/assets/logos/home-sushi-rolls.png' },
    { name: 'Janya Thai Wok', url: 'https://janya.be/', note: t("websiteReservationForm"), logo: '/assets/logos/janya-logo.png' },
    { name: 'Akira Sushi', url: 'https://akirasushi.be/', note: t("websiteReservationForm"), logo: '/assets/logos/akirasushi.png' },
    { name: 'Nakhon Thai', url: 'https://nakhon-thai.be/', note: t("websiteOnlineReservations"), logo: '/assets/logos/nakhon-logo.png' },
    { name: 'Little Thai by Sanito', url: 'https://littlethaibysanito.be/', note: t("websiteOnlineReservationsHappyChef"), logo: '/assets/logos/logo-sanito.png' },
    { name: 'Taverne Kopenhagen', url: 'https://tavernekopenhagen.com/', note: t("newWebsiteLive"), logo: '/assets/logos/logo-kopenhagen.jpg' },
    { name: 'Okaya Sushi Restaurant', url: 'https://okayasushi.be/', note: t("newWebsiteLive"), logo: '/assets/logos/logo-okaya.jpg' },
    { name: 'AK Taekwondo Pakchong', url: 'https://www.aktaekwondopakchong.com/', note: t("newWebsiteLive"), logo: '/assets/logos/ak-logo.jpg' },
  ];

  const upcomingRestaurants = [
    { name: 'De Grave VOF', url: 'https://de-grave-vof.vercel.app/', note: t("almostReadyWebsiteBeingFinalised"), logo: '/assets/logos/degrave.png' },
  ];

  const otherProjects = [
    { name: 'KJ Events', url: 'https://www.kj-events.eu/', type: t("webDevelopment"), logo: '/assets/logos/kj-logo.jpg' },
    { name: 'Meijin Ryu Karate', url: 'https://meijinryu.com/', type: t("webDevelopment"), logo: '/assets/logos/meijin-logo.jpg' },
    { name: 'Donovan Tack', url: 'https://donovan-tack.be/', type: t("businessWebsite"), logo: '/assets/logos/dt-logo.png' },
    { name: 'De Flexi Jobber', url: 'https://de-flexi-jobber.be/', type: t("wordpressPlatform"), logo: '/assets/logos/flexi-jobber-logo.png' },
    { name: 'Learn Dutch BBB', url: 'https://www.learn-dutch-bbb.eu/', type: t("bigbluebuttonSetup"), logo: '/assets/logos/bbb-logo.jpg' },
    { name: 'Learn Dutch Online', url: 'https://www.learn-dutch-online.com/', type: t("reactAppDevelopment"), logo: '/assets/logos/learn-dutch.png' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" tabIndex={-1}>

      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 leading-tight">
          {t("heroTitle")}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
            Upxero
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("heroSubtitle")}</p>
      </section>

      {/* Live restaurants */}
      <section className="pb-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("liveRestaurants")}</h2>
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
                    {t("viewWebsite")} <ExternalLink size={16} />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("upcoming")}</h2>
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
                    {t("viewPreview")} <ExternalLink size={16} />
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("otherProjects")}</h2>
          <p className="text-gray-600 max-w-3xl mb-10">{t("otherProjectsDesc")}</p>
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
                    {t("viewProject")} <ExternalLink size={16} />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default PortfolioRestaurants;
