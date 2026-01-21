import React from 'react';
import PageHero from '../../components/PageHero';

const Blog: React.FC = () => {
  return (
    <>
      <PageHero
        title="BLOG"
        description="Stories, interviews, and recaps from the DRIPS community."
      />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 max-w-2xl">
            New posts will land here soon. Catch up on the latest DRIPS news.
          </p>
        </div>
      </section>
    </>
  );
};

export default Blog;
