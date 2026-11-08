import React, { useEffect, useState } from 'react';
import { BANDCAMP_EMBED_SRC, BANDCAMP_PUBLIC_URL } from '../../constants';
import BandcampEmbed from '../../components/BandcampEmbed';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';

type BandcampRelease = {
  id: string;
  slug: string;
  title: string;
  artist: string;
  artwork: string;
  url: string;
  embedSrc: string;
};

const convergenceFallback: BandcampRelease = {
  id: '657721235',
  slug: 'convergence',
  title: 'CONVERGENCE',
  artist: 'Various Artists',
  artwork: '',
  url: BANDCAMP_PUBLIC_URL,
  embedSrc: BANDCAMP_EMBED_SRC,
};

const Label: React.FC = () => {
  const [releases, setReleases] = useState<BandcampRelease[]>([convergenceFallback]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/media-feed', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (Array.isArray(data?.releases) && data.releases.length > 0) {
          setReleases(data.releases);
        }
      })
      .catch(() => {
        // Keep the existing Convergence fallback when the release feed is unavailable.
      });
    return () => controller.abort();
  }, []);

  return (
    <>
      <PageHero
        title="LABEL"
        description="Releases, compilations, and collaborations from the DRIPS label."
      />
      <section className="bg-black text-white py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal as="div">
            <h2 className="text-xl font-heading tracking-[0.35em] uppercase text-gray-200">
              BANDCAMP
            </h2>
          </Reveal>

          <div className="mt-10 space-y-20">
            {releases.map((release, index) => (
              <Reveal
                key={release.id}
                as="article"
                delay={Math.min(index * 80, 240)}
                className="mx-auto max-w-3xl"
              >
                <div className="mb-6 text-center">
                  <h3 className="font-heading text-2xl md:text-3xl tracking-[0.3em] uppercase">
                    {release.title}
                  </h3>
                  <p className="mt-2 text-xs font-mono tracking-[0.25em] uppercase text-gray-500">
                    {release.artist}
                  </p>
                </div>
                <BandcampEmbed
                  src={release.embedSrc}
                  title={`${release.title} - Bandcamp player`}
                  href={release.url}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-24 bg-black text-white border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 pt-16">
          <p className="text-gray-300 max-w-2xl font-body leading-relaxed tracking-normal normal-case">
            Stay tuned for upcoming drops and featured artists.
          </p>
        </div>
      </section>
    </>
  );
};

export default Label;
