import React from 'react';
import privacyBg from '../assets/bg/9h.png';

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div
        className="absolute -inset-10 bg-cover bg-center blur-[4px] scale-[1.4] transform-gpu"
        style={{ backgroundImage: `url(${privacyBg})` }}
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl tracking-[0.35em] uppercase">
            Privacy Policy
          </h1>
          <div className="mt-4 h-px w-20 bg-white/70"></div>
        </div>

        <div className="mt-10 max-w-3xl space-y-10 text-base md:text-lg leading-relaxed text-white/90 drips-body font-normal tracking-normal normal-case">
          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">Introduction</h2>
            <p>
              DRIPS Collective respects your privacy and processes personal data in accordance with
              the General Data Protection Regulation (GDPR).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">Data We Collect</h2>
            <ul className="space-y-2 list-disc list-inside text-white/85">
              <li>Email address (newsletter / Telegram sign-up)</li>
              <li>Technical data (IP address, browser, device)</li>
              <li>Cookies (see Cookie Policy)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">How We Use Your Data</h2>
            <ul className="space-y-2 list-disc list-inside text-white/85">
              <li>Communication about events and releases</li>
              <li>Website improvement and analytics</li>
              <li>Legal compliance</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">Third-Party Services</h2>
            <p>
              This site embeds or links to Resident Advisor, SoundCloud, Spotify, and Bandcamp.
              These platforms may collect data independently under their own policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">Data Storage</h2>
            <p>We store data securely and never sell your personal information.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">User Rights</h2>
            <p>Under the GDPR, you have the right to:</p>
            <ul className="space-y-2 list-disc list-inside text-white/85">
              <li>Access</li>
              <li>Rectification</li>
              <li>Deletion</li>
              <li>Objection</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">Contact</h2>
            <p>
              For privacy-related requests, email{' '}
              <a
                href="mailto:collectivedrips@gmail.com"
                className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                collectivedrips@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
