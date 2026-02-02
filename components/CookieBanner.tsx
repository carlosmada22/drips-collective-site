import React from 'react';
import { Link } from 'react-router-dom';
import useCookieConsent from '../hooks/useCookieConsent';

const CookieBanner: React.FC = () => {
  const { consent, setConsent } = useCookieConsent();

  if (consent) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] bg-black/95 border-t border-white/10">
      <div className="container mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs md:text-sm text-white/80 font-body tracking-wide">
          We use cookies to improve your experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <button
            type="button"
            onClick={() => setConsent('accepted')}
            className="px-6 py-2 text-xs uppercase tracking-[0.3em] font-heading bg-white text-black border border-white hover:bg-black hover:text-white transition-colors duration-300"
          >
            ACCEPT ALL
          </button>
          <button
            type="button"
            onClick={() => setConsent('rejected')}
            className="px-6 py-2 text-xs uppercase tracking-[0.3em] font-heading border border-white/50 text-white/80 hover:text-white hover:border-white transition-colors duration-300"
          >
            REJECT
          </button>
          <Link
            to="/cookie-policy"
            className="px-6 py-2 text-xs uppercase tracking-[0.3em] font-heading border border-white/20 text-white/70 hover:text-white hover:border-white/60 transition-colors duration-300 text-center"
          >
            COOKIE PREFERENCES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
