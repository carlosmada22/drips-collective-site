import React from 'react';
import PageHero from '../../components/PageHero';

const About: React.FC = () => {
  return (
    <>
      <PageHero
        title="ABOUT"
        description="DRIPS is a collective dedicated to underground sounds and immersive nights."
      />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 max-w-2xl">
            We curate experiences that blur the line between club culture, art, and community.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
