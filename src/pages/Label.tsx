import React from 'react';
import PageHero from '../../components/PageHero';

const Label: React.FC = () => {
  return (
    <>
      <PageHero
        title="LABEL"
        description="Releases, compilations, and collaborations from the DRIPS label."
      />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 max-w-2xl font-body">
            Stay tuned for upcoming drops and featured artists.
          </p>
        </div>
      </section>
    </>
  );
};

export default Label;
