import React from 'react';
import { useParams } from 'react-router-dom';
import PageHero from '../../components/PageHero';

const EventDetail: React.FC = () => {
  const { slug } = useParams();
  const title = slug ? slug.replace(/-/g, ' ').toUpperCase() : 'EVENT';

  return (
    <>
      <PageHero
        title={title}
        description="Event details, lineup information, and ticket access will appear here."
      />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 max-w-2xl font-body">
            We are finalizing the schedule and artist announcements for this event.
          </p>
        </div>
      </section>
    </>
  );
};

export default EventDetail;
