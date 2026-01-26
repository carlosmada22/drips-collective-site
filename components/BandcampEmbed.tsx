import React from 'react';

type BandcampEmbedProps = {
  src: string;
  title: string;
  href: string;
};

const BandcampEmbed: React.FC<BandcampEmbedProps> = ({ src, title, href }) => {
  return (
    <div className="space-y-6">
      <div className="w-full overflow-hidden border border-white/10 bg-black">
        <div className="aspect-[4/5] sm:aspect-square">
          <iframe
            src={src}
            title={title}
            className="w-full h-full border-0"
            scrolling="no"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-10 py-4 min-w-[200px] bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white transition-colors duration-300 uppercase tracking-widest text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        >
          OPEN ON BANDCAMP
        </a>
      </div>
    </div>
  );
};

export default BandcampEmbed;
