import React from 'react';
import { useParams } from 'react-router-dom';
import PageHero from '../../components/PageHero';

const ResidentDetail: React.FC = () => {
  const { slug } = useParams();
  const title = slug ? slug.replace(/-/g, ' ').toUpperCase() : 'RESIDENT';

  return (
    <>
      <PageHero
        title={title}
        description="Artist bios, mixes, and features will appear here."
      />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 max-w-2xl font-body">
            We are building out the full profile for this resident.
          </p>
        </div>
      </section>
    </>
  );
};

export default ResidentDetail;
