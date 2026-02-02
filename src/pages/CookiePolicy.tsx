import React from 'react';
import useCookieConsent from '../../hooks/useCookieConsent';
import cookieBg from '../assets/bg/10h.png';

const CookiePolicy: React.FC = () => {
  const { setConsent } = useCookieConsent();

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div
        className="absolute -inset-10 bg-cover bg-center blur-[4px] scale-[1.4] transform-gpu"
        style={{ backgroundImage: `url(${cookieBg})` }}
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl tracking-[0.35em] uppercase">
            Cookie Policy
          </h1>
          <div className="mt-4 h-px w-20 bg-white/70"></div>
        </div>

        <div className="mt-10 max-w-3xl space-y-10 text-base md:text-lg leading-relaxed text-white/90 font-body">
          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">
              What Are Cookies
            </h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They
              help the site function properly, remember preferences, and support embedded services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">
              Cookies We Use
            </h2>
            <ul className="space-y-2 list-disc list-inside text-white/85">
              <li>Essential cookies (site functionality and security).</li>
              <li>Analytics cookies (if enabled) to understand site usage.</li>
              <li>
                Embedded content cookies (SoundCloud, Spotify, YouTube, Bandcamp) to play media.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">
              Managing Cookies
            </h2>
            <p>
              You can accept, reject, or change your preferences at any time. Use the Cookie
              Preferences link in the footer or reset your choice below to see the banner again.
            </p>
            <button
              type="button"
              onClick={() => setConsent(null)}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white transition-colors duration-300 uppercase tracking-[0.3em] text-xs font-heading"
            >
              RESET COOKIE CHOICE
            </button>
          </section>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicy;
