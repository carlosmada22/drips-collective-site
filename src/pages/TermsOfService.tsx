import React from 'react';
import privacyBg from '../assets/bg/9h.png';

const TermsOfService: React.FC = () => {
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
            Terms of Service
          </h1>
          <div className="mt-4 h-px w-20 bg-white/70"></div>
        </div>

        <div className="mt-10 max-w-3xl space-y-10 text-base md:text-lg leading-relaxed text-white/90 font-body">
          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">Introduction</h2>
            <p>
              DRIPS is a cultural collective and event platform dedicated to underground music, art,
              and community.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">
              Use of the Website
            </h2>
            <ul className="space-y-2 list-disc list-inside text-white/85">
              <li>This website is for informational purposes.</li>
              <li>Users must not misuse the site or its content.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">
              Intellectual Property
            </h2>
            <ul className="space-y-2 list-disc list-inside text-white/85">
              <li>All content (logos, images, videos, texts) belongs to DRIPS or its collaborators.</li>
              <li>No reuse is permitted without prior written permission.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">
              External Links
            </h2>
            <p>
              DRIPS is not responsible for third-party platforms, including Resident Advisor,
              SoundCloud, Spotify, and other services linked from this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">
              Limitation of Liability
            </h2>
            <p>DRIPS is not liable for damages arising from use of the website.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">Changes</h2>
            <p>These terms may be updated without prior notice.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-heading uppercase tracking-[0.35em] text-white">Contact</h2>
            <p>
              For questions about these terms, email{' '}
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

export default TermsOfService;
