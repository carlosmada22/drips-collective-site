import React from 'react';

interface PageHeroProps {
  title: string;
  description: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, description }) => {
  return (
    <section className="pt-32 pb-16 bg-black text-white">
      <div className="container mx-auto px-6 md:px-12">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-4 font-body">DRIPS Collective</p>
        <h1 className="font-heading text-4xl md:text-6xl tracking-widest mb-4">{title}</h1>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl font-body">{description}</p>
      </div>
    </section>
  );
};

export default PageHero;
