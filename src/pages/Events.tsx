import React from 'react';
import EventsSection from '../../components/EventsSection';
import PageHero from '../../components/PageHero';

const Events: React.FC = () => {
  return (
    <>
      <PageHero
        title="EVENTS"
        description="Upcoming nights, pop-ups, and warehouse sessions from DRIPS."
      />
      <EventsSection />
    </>
  );
};

export default Events;
