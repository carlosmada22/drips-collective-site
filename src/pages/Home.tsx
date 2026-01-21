import React from 'react';
import Hero from '../../components/Hero';
import EventsSection from '../../components/EventsSection';
import ResidentsSection from '../../components/ResidentsSection';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <EventsSection />
      <ResidentsSection />
    </>
  );
};

export default Home;
