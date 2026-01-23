import React from 'react';
import PageHero from '../../components/PageHero';

const Merch: React.FC = () => {
  return (
    <>
      <PageHero
        title="MERCH"
        description="Shop DRIPS merch."
      />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 max-w-2xl">
            Shop DRIPS merch.
          </p>
        </div>
      </section>
    </>
  );
};

export default Merch;
