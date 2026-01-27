import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop = () => {
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
            fixed
            bottom-8
            left-8
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
          aria-label="Scroll naar boven"
        >
          <ChevronUp size={22} />
        </button>
      )}
    </>
  );
};
