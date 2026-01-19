import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">
            Algemene Voorwaarden
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-lg text-gray-600">
              Laatst bijgewerkt: 7 januari 2025
            </p>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                1. Definities
              </h2>
              <p>In deze algemene voorwaarden wordt verstaan onder:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Upxero:</strong> De dienstverlener die digitale oplossingen
                  aanbiedt voor horecazaken binnen België en Nederland.
                </li>
                <li>
                  <strong>Klant:</strong> De natuurlijke of rechtspersoon die gebruik
                  maakt van de diensten van Upxero.
                </li>
                <li>
                  <strong>Diensten:</strong> Alle door Upxero aangeboden diensten,
                  waaronder websites, online bestelsystemen, WhatsApp-automatisatie,
                  hosting en onderhoud.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                2. Toepasselijkheid
              </h2>
              <p>
                Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen,
                overeenkomsten en dienstverlening tussen Upxero en de Klant.
                Afwijkingen zijn uitsluitend geldig indien schriftelijk overeengekomen.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                3. Dienstverlening
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ontwikkeling en hosting van professionele horeca websites</li>
                <li>Integratie van online bestelsystemen</li>
                <li>WhatsApp-assistenten via externe providers (zoals Twilio)</li>
                <li>Technische ondersteuning en onderhoud</li>
              </ul>
              <p>
                Upxero behoudt zich het recht voor om diensten technisch te wijzigen
                of te optimaliseren.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                4. Prijzen en betaling
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Alle prijzen zijn exclusief btw, tenzij anders vermeld</li>
                <li>Betaling gebeurt maandelijks vooraf</li>
                <li>
                  Bij niet-tijdige betaling kan Upxero de dienstverlening opschorten
                </li>
                <li>
                  Prijswijzigingen worden minimaal 30 dagen vooraf aangekondigd
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                5. Looptijd en opzegging
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Overeenkomsten worden aangegaan voor een minimumduur van 6 maanden
                </li>
                <li>Daarna maandelijks opzegbaar</li>
                <li>Opzegging dient schriftelijk per e-mail te gebeuren</li>
                <li>
                  Bij beëindiging vervalt het gebruiksrecht op de geleverde diensten
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                6. Verplichtingen van de Klant
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tijdig correcte informatie aanleveren</li>
                <li>Wijzigingen onmiddellijk doorgeven</li>
                <li>Diensten gebruiken conform wetgeving</li>
                <li>Geen misbruik maken van systemen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                7. Intellectueel eigendom
              </h2>
              <p>
                Alle ontwikkelde websites, configuraties en automatisaties blijven
                eigendom van Upxero, tenzij schriftelijk anders overeengekomen.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                8. Aansprakelijkheid
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Geen garantie op ononderbroken beschikbaarheid</li>
                <li>Geen aansprakelijkheid voor indirecte schade of omzetverlies</li>
                <li>
                  Maximale aansprakelijkheid is beperkt tot één maand dienstverlening
                </li>
                <li>Overmacht en externe storingen zijn uitgesloten</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                9. Privacy en gegevensverwerking
              </h2>
              <p>
                Persoonsgegevens worden verwerkt conform GDPR. Zie ons{' '}
                <a
                  href="/privacy-policy"
                  className="text-blue-900 underline hover:text-orange-500"
                >
                  privacybeleid
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                10. Toepasselijk recht
              </h2>
              <p>
                Op alle overeenkomsten is Belgisch recht van toepassing.
                Geschillen worden voorgelegd aan de bevoegde rechtbank in België.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                11. Contact & bedrijfsgegevens
              </h2>
              <ul className="list-none space-y-2">
                <li><strong>Bedrijfsnaam:</strong> Upxero OÜ</li>
                <li><strong>Registratieadres:</strong> Ahtri 12, 10151 Tallinn, Estland</li>
                <li><strong>Land van vestiging:</strong> Estland (EU)</li>
                <li><strong>Handelsregister:</strong> 16534146</li>
                <li><strong>BTW-nummer:</strong> EE102522936</li>
                <li><strong>Email:</strong> info@upxero.com</li>
                <li><strong>Website:</strong> https://www.upxero.com</li>
                <li className="text-sm text-gray-500">
                  Upxero is geregistreerd in Estland via het e-Residency-programma.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsConditions;
