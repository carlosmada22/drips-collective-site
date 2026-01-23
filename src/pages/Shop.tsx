import React from 'react';
import PageHero from '../../components/PageHero';

const Shop: React.FC = () => {
  return (
    <>
      <PageHero
        title="SHOP UNDER CONSTRUCTION"
        description="Follow our Instagram for drops."
      />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 max-w-2xl font-body">
            Limited merch and capsule releases will be announced here soon.
          </p>
        </div>
      </section>
    </>
  );
};

export default Shop;
