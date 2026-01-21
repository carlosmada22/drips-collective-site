import React from 'react';
import PageHero from '../../components/PageHero';

const Tickets: React.FC = () => {
  return (
    <>
      <PageHero
        title="TICKETS"
        description="Secure entry for upcoming DRIPS sessions and special events."
      />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 max-w-2xl">
            Ticket drops will be posted here with direct links and access codes.
          </p>
        </div>
      </section>
    </>
  );
};

export default Tickets;
