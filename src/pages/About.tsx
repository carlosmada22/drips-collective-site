import React from 'react';
import aboutBg from '../assets/footer-bg.jpg';

const About: React.FC = () => {
  const galleryImages = [
    { src: aboutBg, alt: 'Gallery image 1', height: 'h-72 md:h-80' },
    { src: aboutBg, alt: 'Gallery image 2', height: 'h-64 md:h-72' },
    { src: aboutBg, alt: 'Gallery image 3', height: 'h-80 md:h-96' },
    { src: aboutBg, alt: 'Gallery image 4', height: 'h-60 md:h-72' },
    { src: aboutBg, alt: 'Gallery image 5', height: 'h-72 md:h-80' },
    { src: aboutBg, alt: 'Gallery image 6', height: 'h-64 md:h-72' },
    { src: aboutBg, alt: 'Gallery image 7', height: 'h-80 md:h-96' },
    { src: aboutBg, alt: 'Gallery image 8', height: 'h-60 md:h-72' },
    { src: aboutBg, alt: 'Gallery image 9', height: 'h-72 md:h-80' },
    { src: aboutBg, alt: 'Gallery image 10', height: 'h-64 md:h-72' },
  ];

  return (
    <section
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="text-center">
          <h1 className="font-heading text-3xl md:text-4xl tracking-[0.4em] uppercase">ABOUT US</h1>
          <div className="mx-auto mt-4 h-px w-24 bg-white/70"></div>
        </div>

        <div className="mt-10 mx-auto max-w-4xl text-left space-y-6 text-base md:text-lg leading-relaxed text-white/90">
          <p>
            Born in Berlin, DRIPS is a meeting point of disciplines. We create audiovisual works,
            events, and urban interventions that explore the sensory and the conceptual—through a
            liquid, raw, and contemporary aesthetic.
          </p>
          <p>
            We move through techno and hard groove not just as genres, but as languages—tools to
            express tension, release, resistance. Every set becomes a space for something honest.
            Something that sweats, shifts, and refuses to let go.
          </p>
          <p>
            We believe in the slow build, the steady pressure. In sound as movement, and movement
            as meaning. From the floor to the booth, everything is connected.
          </p>
          <p>A ritual. A rupture. A reminder that we’re not alone in the noise.</p>
        </div>

        <div className="mt-12 h-px w-full bg-white/15"></div>

        <div className="mt-16 text-center">
          <h2 className="font-heading text-2xl md:text-3xl tracking-[0.35em] uppercase">
            PHOTO GALLERY
          </h2>
          <div className="mx-auto mt-4 h-px w-28 bg-white/70"></div>
        </div>

        <div className="mt-12 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
          {galleryImages.map((image) => (
            <a
              key={image.alt}
              href={image.src}
              target="_blank"
              rel="noreferrer"
              className="mb-6 block break-inside-avoid"
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full ${image.height} object-cover border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.45)]`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
