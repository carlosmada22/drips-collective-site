import React from 'react';
import PageHero from '../../components/PageHero';

const Gallery: React.FC = () => {
  return (
    <>
      <PageHero title="GALLERY" description="Coming soon." />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 max-w-2xl">
            Coming soon.
          </p>
        </div>
      </section>
    </>
  );
};

export default Gallery;
