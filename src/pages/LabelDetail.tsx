import React from 'react';
import { useParams } from 'react-router-dom';
import { BANDCAMP_EMBED_SRC, BANDCAMP_PUBLIC_URL } from '../../constants';
import BandcampEmbed from '../../components/BandcampEmbed';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';

const LabelDetail: React.FC = () => {
  const { slug } = useParams();
  const title = slug ? slug.replace(/-/g, ' ').toUpperCase() : 'RELEASE';
  const isConvergence = slug === 'convergence';

  return (
    <>
      <PageHero
        title={title}
        description="Tracklist, credits, and release notes will be available here."
      />
      {isConvergence && (
        <section className="bg-black text-white py-16 md:py-20 border-b border-white/10">
          <div className="container mx-auto px-6 md:px-12">
            <Reveal as="div">
              <h2 className="text-xl font-heading tracking-[0.35em] uppercase text-gray-200">
                BANDCAMP
              </h2>
            </Reveal>
            <div className="mt-8 max-w-3xl mx-auto">
              <BandcampEmbed
                src={BANDCAMP_EMBED_SRC}
                title="Convergence - Bandcamp player"
                href={BANDCAMP_PUBLIC_URL}
              />
            </div>
          </div>
        </section>
      )}
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 max-w-2xl font-body">
            This release page will include streaming links, visuals, and press notes.
          </p>
        </div>
      </section>
    </>
  );
};

export default LabelDetail;
