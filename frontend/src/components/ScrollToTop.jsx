import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="
            floating-support-control
            fixed
            bottom-4
            left-4
            z-40
            bg-blue-900
            hover:bg-orange-500
            text-white
            w-12
            h-12
            flex
            items-center
            justify-center
            rounded-full
            shadow-lg
            transition
            hover:scale-110
          "
          aria-label={t('scrollTop')}
        >
          <ChevronUp size={22} />
        </button>
      )}
    </>
  );
};
