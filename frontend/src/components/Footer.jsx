import React from 'react';
import { useCurrentYear } from '../hooks/useCurrentYear';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();
  const { localize } = useLanguage();
  const currentYear = useCurrentYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <img
                  src="/images/logo-white.png"
                  alt={t('logoAlt')}
                  className="w-6 h-6"
                />
              </div>
              <span className="text-2xl font-bold text-white">UPXERO</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-3">
              <a
                aria-label="Facebook"
                href="https://www.facebook.com/upxero"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/upxero"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                aria-label="LinkedIn"
                href="https://www.linkedin.com/company/upxero"
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
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to={localize("/")} className="text-sm hover:text-orange-500 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to={localize("/services")} className="text-sm hover:text-orange-500 transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to={localize("/pricing")} className="text-sm hover:text-orange-500 transition-colors">
                  {t('nav.pricing')}
                </Link>
              </li>
              <li>
                <Link to={localize("/contact")} className="text-sm hover:text-orange-500 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to={localize("/about")} className="text-sm hover:text-orange-500 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('nav.services')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-orange-500 transition-colors cursor-pointer">{t('footer.website')}</li>
              <li><a href="https://ordering.upxero.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">{t('footer.ordering')}</a></li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">{t('footer.maintenance')}</li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">{t('footer.hosting')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@upxero.com" className="hover:text-orange-500 transition-colors">
                  info@upxero.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MessageCircle size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/3197010268675"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
              <span>{t('footer.region')}</span>
            </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 pr-20 sm:pr-0">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link to={localize("/privacy-policy")} className="hover:text-orange-500 transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to={localize("/terms-conditions")} className="hover:text-orange-500 transition-colors">
                {t('footer.terms')}
              </Link>
              <Link to={localize("/cookie-policy")} className="hover:text-orange-500 transition-colors">
                {t('footer.cookies')}
              </Link>
              <button type="button" className="hover:text-orange-500 transition-colors" onClick={event => {
                window.dispatchEvent(new CustomEvent('upxero:privacy-settings', { detail: event.currentTarget }));
              }}>{t('cookie.settings')}</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
