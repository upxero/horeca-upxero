import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Button } from './ui/button';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t-2 border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="text-orange-500 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Deze website gebruikt cookies</h3>
              <p className="text-sm text-gray-600">
                We gebruiken essentiële cookies om de functionaliteit van deze website te garanderen. 
                Door deze website te gebruiken, gaat u akkoord met ons{' '}
                <a href="/cookie-policy" className="text-blue-900 underline hover:text-orange-500">
                  cookiebeleid
                </a>
                .
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleAccept}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Accepteren
            </Button>
            <button
              onClick={handleAccept}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Sluiten"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
