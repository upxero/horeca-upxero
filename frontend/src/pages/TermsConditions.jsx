import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Algemene Voorwaarden</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-lg text-gray-600">
              Laatst bijgewerkt: 7 januari 2025
            </p>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Definities</h2>
              <p>In deze algemene voorwaarden wordt verstaan onder:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Upxero:</strong> De dienstverlener, gevestigd in België</li>
                <li><strong>Klant:</strong> De partij die gebruik maakt van de diensten van Upxero</li>
                <li><strong>Diensten:</strong> Het bouwen en beheren van horeca websites en online bestelsystemen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Toepasselijkheid</h2>
              <p>
                Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en 
                dienstverlening tussen Upxero en de Klant. Afwijkingen zijn alleen geldig indien 
                schriftelijk overeengekomen.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Dienstverlening</h2>
              <p>Upxero biedt de volgende diensten aan:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ontwikkeling en hosting van professionele horeca websites</li>
                <li>Integratie van online bestelsystemen</li>
                <li>Ontwikkeling van gebrande mobiele bestel-apps (optioneel)</li>
                <li>Technische ondersteuning en onderhoud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Prijzen en Betaling</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Alle prijzen zijn exclusief BTW, tenzij anders vermeld</li>
                <li>Betaling vindt plaats via automatische incasso op maandbasis</li>
                <li>Bij niet-betaling behoudt Upxero zich het recht voor de diensten op te schorten</li>
                <li>Prijswijzigingen worden minimaal 30 dagen van tevoren aangekondigd</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Looptijd en Opzegging</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Overeenkomsten worden aangegaan voor onbepaalde tijd</li>
                <li>Opzegging is mogelijk met een opzegtermijn van 1 maand</li>
                <li>Opzegging dient schriftelijk (per e-mail) te gebeuren</li>
                <li>Bij opzegging blijft de website eigendom van Upxero, tenzij anders overeengekomen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Verplichtingen van de Klant</h2>
              <p>De Klant is verplicht om:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tijdig de benodigde informatie en materialen (foto's, menu's) aan te leveren</li>
                <li>Correcte en actuele contactgegevens te verstrekken</li>
                <li>Upxero te informeren over wijzigingen in menu's of openingstijden</li>
                <li>De website te gebruiken conform de wet- en regelgeving</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Intellectueel Eigendom</h2>
              <p>
                Alle rechten met betrekking tot de geleverde websites, systemen en software blijven 
                eigendom van Upxero, tenzij schriftelijk anders overeengekomen. De Klant verkrijgt 
                alleen een gebruiksrecht voor de duur van de overeenkomst.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Aansprakelijkheid</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Upxero streeft naar een uptime van 99%, maar kan dit niet garanderen</li>
                <li>Upxero is niet aansprakelijk voor indirecte schade of gederfde inkomsten</li>
                <li>De aansprakelijkheid is beperkt tot het maandbedrag van de dienstverlening</li>
                <li>Force majeure situaties zijn uitgesloten van aansprakelijkheid</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Privacy en Gegevensverwerking</h2>
              <p>
                Voor informatie over hoe wij omgaan met persoonsgegevens, verwijzen we naar ons{' '}
                <a href="/privacy-policy" className="text-blue-900 underline hover:text-orange-500">privacybeleid</a>.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Wijzigingen</h2>
              <p>
                Upxero behoudt zich het recht voor om deze algemene voorwaarden te wijzigen. 
                Wijzigingen worden van tevoren aan de Klant meegedeeld.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Toepasselijk Recht</h2>
              <p>
                Op deze algemene voorwaarden en alle overeenkomsten tussen Upxero en de Klant is 
                Belgisch recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter 
                in België.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Contact</h2>
              <p>Voor vragen over deze algemene voorwaarden kunt u contact met ons opnemen:</p>
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

export default TermsConditions;
