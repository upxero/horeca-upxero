import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Privacybeleid</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-lg text-gray-600">
              Laatst bijgewerkt: 7 januari 2025
            </p>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Inleiding</h2>
              <p>
                Upxero ("wij", "ons", "onze") respecteert uw privacy en zet zich in voor de bescherming 
                van uw persoonlijke gegevens. Dit privacybeleid beschrijft hoe we uw gegevens verzamelen, 
                gebruiken en beschermen wanneer u onze website bezoekt of gebruik maakt van onze diensten.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Gegevens die we verzamelen</h2>
              <p>We kunnen de volgende soorten gegevens verzamelen:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Contactgegevens:</strong> Naam, e-mailadres, telefoonnummer en bedrijfsnaam 
                  wanneer u een demo aanvraagt of contact met ons opneemt
                </li>
                <li>
                  <strong>Technische gegevens:</strong> IP-adres, browsertype, apparaatinformatie en 
                  websitegebruiksgegevens via cookies
                </li>
                <li>
                  <strong>Communicatiegegevens:</strong> Berichten en vragen die u naar ons stuurt
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Hoe we uw gegevens gebruiken</h2>
              <p>We gebruiken uw persoonlijke gegevens voor:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Het beantwoorden van uw vragen en demo-aanvragen</li>
                <li>Het verstrekken van informatie over onze diensten</li>
                <li>Het verbeteren van onze website en diensten</li>
                <li>Het voldoen aan wettelijke verplichtingen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Gegevensdeling</h2>
              <p>
                We verkopen of verhuren uw persoonlijke gegevens niet aan derden. We kunnen uw gegevens 
                alleen delen met:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dienstverleners die ons helpen bij het leveren van onze diensten (bijv. e-mailservices)</li>
                <li>Wetshandhavingsinstanties wanneer wettelijk vereist</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Gegevensbeveiliging</h2>
              <p>
                We nemen passende technische en organisatorische maatregelen om uw persoonlijke gegevens 
                te beschermen tegen ongeoorloofde toegang, verlies of wijziging.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Uw rechten</h2>
              <p>Volgens de AVG heeft u de volgende rechten:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Recht op inzage van uw persoonlijke gegevens</li>
                <li>Recht op rectificatie van onjuiste gegevens</li>
                <li>Recht op verwijdering van uw gegevens</li>
                <li>Recht op beperking van de verwerking</li>
                <li>Recht op gegevensoverdraagbaarheid</li>
                <li>Recht van bezwaar tegen verwerking</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Cookies</h2>
              <p>
                We gebruiken essentiële cookies om de functionaliteit van onze website te waarborgen. 
                Raadpleeg ons <a href="/cookie-policy" className="text-blue-900 underline hover:text-orange-500">cookiebeleid</a> voor 
                meer informatie.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Bewaartermijn</h2>
              <p>
                We bewaren uw persoonlijke gegevens niet langer dan noodzakelijk is voor de doeleinden 
                waarvoor ze zijn verzameld, of zoals wettelijk vereist.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Wijzigingen in dit beleid</h2>
              <p>
                We kunnen dit privacybeleid van tijd tot tijd bijwerken. De meest recente versie is 
                altijd beschikbaar op deze pagina.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Contact</h2>
              <p>
                Voor vragen over dit privacybeleid of het uitoefenen van uw rechten, kunt u contact 
                met ons opnemen via:
              </p>
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

export default PrivacyPolicy;
