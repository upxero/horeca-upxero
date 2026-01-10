import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Cookiebeleid</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-lg text-gray-600">
              Laatst bijgewerkt: 7 januari 2025
            </p>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Wat zijn cookies?</h2>
              <p>
                Cookies zijn kleine tekstbestanden die op uw computer of mobiele apparaat worden 
                geplaatst wanneer u een website bezoekt. Ze helpen websites om informatie over uw 
                bezoek te onthouden, zoals uw voorkeuren en instellingen.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Hoe we cookies gebruiken</h2>
              <p>
                Upxero gebruikt alleen essentiële cookies die noodzakelijk zijn voor het correct 
                functioneren van de website. Deze cookies verzamelen geen persoonlijke informatie 
                en kunnen niet worden uitgeschakeld.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Soorten cookies die we gebruiken</h2>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-6">Essentiële cookies</h3>
              <p>Deze cookies zijn noodzakelijk voor de basisfunctionaliteit van de website:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cookie consent:</strong> Onthoudt dat u de cookiebanner heeft geaccepteerd, 
                  zodat deze niet bij elk bezoek opnieuw verschijnt
                </li>
                <li>
                  <strong>Sessie cookies:</strong> Zorgen ervoor dat de website correct functioneert 
                  tijdens uw bezoek
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-6">Cookies die we NIET gebruiken</h3>
              <p>We gebruiken momenteel geen:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Analytische cookies (zoals Google Analytics)</li>
                <li>Marketing of tracking cookies</li>
                <li>Social media cookies</li>
                <li>Cookies van derden voor advertenties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Cookie overzicht</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">Naam</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">Doel</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">Looptijd</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">cookieConsent</td>
                      <td className="border border-gray-300 px-4 py-2">
                        Onthoudt cookievoorkeuren
                      </td>
                      <td className="border border-gray-300 px-4 py-2">1 jaar</td>
                      <td className="border border-gray-300 px-4 py-2">Essentieel</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Cookies beheren</h2>
              <p>
                U kunt cookies beheren via de instellingen van uw browser. Let op: als u alle cookies 
                uitschakelt, werken sommige delen van de website mogelijk niet correct.
              </p>
              <p className="mt-4">
                <strong>Instructies per browser:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <a 
                    href="https://support.google.com/chrome/answer/95647" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-900 underline hover:text-orange-500"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-900 underline hover:text-orange-500"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.apple.com/nl-be/guide/safari/sfri11471/mac" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-900 underline hover:text-orange-500"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-900 underline hover:text-orange-500"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Updates van dit cookiebeleid</h2>
              <p>
                We kunnen dit cookiebeleid van tijd tot tijd bijwerken om nieuwe ontwikkelingen of 
                wettelijke vereisten te weerspiegelen. Controleer deze pagina regelmatig voor updates.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Meer informatie</h2>
              <p>
                Voor meer informatie over hoe we uw gegevens verwerken, raadpleeg ons{' '}
                <a href="/privacy-policy" className="text-blue-900 underline hover:text-orange-500">
                  privacybeleid
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Contact</h2>
              <p>Voor vragen over ons cookiebeleid kunt u contact met ons opnemen:</p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> info@upxero.com</li>
                <li><strong>Telefoon:</strong> +32 123 456 789</li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
