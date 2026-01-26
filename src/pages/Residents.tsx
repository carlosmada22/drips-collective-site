import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { RESIDENTS } from '../../constants';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';

const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="border-t border-white/10">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="w-full flex items-center justify-between py-4 text-xs uppercase tracking-[0.3em] font-body text-gray-200"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div id={contentId} className="pb-4 text-sm text-gray-300 font-body space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

const Residents: React.FC = () => {
  return (
    <>
      <PageHero
        title="RESIDENTS"
        description="The artists shaping the sound and energy of DRIPS."
      />
      <section className="bg-black text-white py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12 space-y-16">
          {RESIDENTS.map((resident, index) => (
            <Reveal
              key={resident.id}
              as="article"
              className="pb-16 border-b border-white/10 last:border-b-0 last:pb-0"
              delay={Math.min(index * 120, 240)}
            >
              <div className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] items-center">
                <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
                  <img
                    src={resident.images[0]}
                    alt={`${resident.name} portrait left`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center space-y-4 px-2">
                  <h2 className="text-2xl md:text-3xl font-heading tracking-[0.4em] uppercase">
                    {resident.name}
                  </h2>
                  <p className="text-sm md:text-base text-gray-300 font-body leading-relaxed">
                    {resident.bio}
                  </p>
                  <div className="mt-6 text-left">
                    <Accordion title="MUSIC">
                      <a
                        href={resident.links.music.soundcloudUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        SoundCloud
                      </a>
                      <a
                        href={resident.links.music.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        YouTube
                      </a>
                      <a
                        href={resident.links.music.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        Spotify
                      </a>
                    </Accordion>
                    <div className="border-b border-white/10">
                      <Accordion title="CONTACT">
                        <a
                          href={resident.links.contact.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-gray-300 hover:text-white transition-colors duration-300"
                        >
                          Instagram
                        </a>
                        <a
                          href={resident.links.contact.facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-gray-300 hover:text-white transition-colors duration-300"
                        >
                          Facebook
                        </a>
                        <a
                          href={`mailto:${resident.links.contact.email}`}
                          className="block text-gray-300 hover:text-white transition-colors duration-300"
                        >
                          Email
                        </a>
                      </Accordion>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
                  <img
                    src={resident.images[1] ?? resident.images[0]}
                    alt={`${resident.name} portrait right`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 max-w-4xl mx-auto border border-white/10 overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={resident.youtubeEmbedUrl}
                    title={`${resident.name} video`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Residents;
