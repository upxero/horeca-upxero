import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
                U
              </div>
              <span className="text-2xl font-bold text-white">Upxero</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              De complete, commissievrije online besteloplossing voor horeca in België.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Snelle Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-orange-500 transition-colors">
                  Diensten
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm hover:text-orange-500 transition-colors">
                  Prijzen
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-orange-500 transition-colors">
                  Over Ons
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Diensten</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Horeca Website</li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Online Bestelsysteem</li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Marketing & SEO</li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Support & Onderhoud</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@upxero.com" className="hover:text-orange-500 transition-colors">
                  info@upxero.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <a href="tel:+32123456789" className="hover:text-orange-500 transition-colors">
                  +32 123 456 789
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <span>België</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Upxero. Alle rechten voorbehouden.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="hover:text-orange-500 transition-colors">
                Privacybeleid
              </Link>
              <Link to="/terms-conditions" className="hover:text-orange-500 transition-colors">
                Algemene Voorwaarden
              </Link>
              <Link to="/cookie-policy" className="hover:text-orange-500 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
