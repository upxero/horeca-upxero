import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';
import { LanguageSelector } from './LanguageSelector';

export const Header = () => {
  const { t } = useTranslation();
  const { localize } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuButton = useRef(null);
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const close = event => {
      if (event.key === 'Escape') { setIsMobileMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.pricing'), path: '/pricing' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.portfolio'), path: '/restaurant-portfolio' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <a href="#main-content" className="skip-link">{t('skip')}</a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-20">
          {/* Logo */}
          <Link to={localize("/")} className="flex shrink-0 items-center space-x-2 group">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="/images/logo-white.png"
                alt={t('logoAlt')}
                className="w-6 h-6"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-blue-900">UPXERO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label={t("header.navigation")} className="hidden xl:flex items-center gap-4 whitespace-nowrap">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                aria-current={location.pathname === localize(link.path) ? "page" : undefined}
                to={localize(link.path)}
                className={`text-base font-medium transition-colors relative group ${
                  location.pathname === localize(link.path)
                    ? 'text-blue-900'
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full ${
                    location.pathname === localize(link.path) ? 'w-full' : ''
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons Desktop */}
          <div className="hidden xl:flex items-center gap-2 whitespace-nowrap">

            {/* Upxero Ordering */}
            <Button asChild variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-3 py-2.5 rounded-lg font-semibold transition-all hover:shadow-md">
            <a
              href="https://ordering.upxero.com"
              target="_blank"
              rel="noopener noreferrer"
            >
                {t('header.startForFree')}
            </a>
            </Button>

            {/* Vraag Gratis Preview */}
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105">
              <Link to={localize("/contact")}>
                {t('header.preview')}
              </Link>
            </Button>

          </div>

          <LanguageSelector />

          {/* Mobile Menu Button */}
          <button
            ref={menuButton}
            type="button"
            aria-label={t(isMobileMenuOpen ? 'header.closeMenu' : 'header.openMenu')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="xl:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto bg-white border-t border-gray-200 shadow-lg">
          <nav aria-label={t("header.mobileNavigation")} className="px-4 py-4 space-y-3">

            {/* Navigatie links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                aria-current={location.pathname === localize(link.path) ? "page" : undefined}
                to={localize(link.path)}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === localize(link.path)
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Divider */}
            <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col gap-4">

              {/* Upxero Ordering */}
              <Button asChild variant="outline" className="w-full whitespace-normal h-auto min-h-11 border-2 border-blue-900 text-blue-900 hover:bg-blue-50 py-2.5 rounded-lg font-semibold">
              <a
                href="https://ordering.upxero.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                  {t('header.startForFree')}
              </a>
              </Button>

              {/* Vraag Gratis Preview */}
              <Button asChild className="w-full whitespace-normal h-auto min-h-11 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold">
              <Link
                to={localize("/contact")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                  {t('header.preview')}
              </Link>
              </Button>

            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
