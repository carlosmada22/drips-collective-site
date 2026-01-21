import React from 'react';
import ResidentsSection from '../../components/ResidentsSection';
import PageHero from '../../components/PageHero';

const Residents: React.FC = () => {
  return (
    <>
      <PageHero
        title="RESIDENTS"
        description="The artists shaping the sound and energy of DRIPS."
      />
      <ResidentsSection />
    </>
  );
};

export default Residents;
