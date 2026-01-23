import React from 'react';
import { useParams } from 'react-router-dom';
import PageHero from '../../components/PageHero';

const BlogDetail: React.FC = () => {
  const { slug } = useParams();
  const title = slug ? slug.replace(/-/g, ' ').toUpperCase() : 'BLOG POST';

  return (
    <>
      <PageHero
        title={title}
        description="Longform stories, interviews, and photo recaps live here."
      />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 max-w-2xl font-body">
            We are assembling visuals, quotes, and audio references for this post.
          </p>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
