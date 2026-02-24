import React, { useEffect, useState } from 'react';
import aboutBg from '../assets/bg/1v.png';
import Reveal from '../../components/Reveal';
import useScrollLock from '../../hooks/useScrollLock';

const About: React.FC = () => {
  const galleryHeights = [
    'h-72 md:h-80',
    'h-64 md:h-72',
    'h-80 md:h-96',
    'h-60 md:h-72',
  ];

  const galleryImages = (
    Object.entries(
      import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,webp,JPEG,PNG,JPG}', {
        eager: true,
        import: 'default',
      })
    ) as Array<[string, string]>
  )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, src], index) => ({
      src,
      alt: `Gallery image ${index + 1}`,
      height: galleryHeights[index % galleryHeights.length],
    }));



  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useScrollLock(isLightboxOpen);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const activeImage = galleryImages[currentIndex];

  return (
    <section className="relative text-white overflow-hidden">
      <div
        className="absolute -inset-10 bg-cover bg-center bg-fixed blur-[5px] scale-[1.5] transform-gpu"
        style={{ backgroundImage: `url(${aboutBg})` }}
      />
      <div className="absolute inset-0 bg-blue-900/25 mix-blend-screen"></div>
      <div className="absolute inset-0 bg-black/35"></div>
      <div className="relative z-10 container mx-auto px-6 md:px-12 py-20 md:py-28">
        <Reveal as="div" className="text-center">
          <h1 className="font-heading text-3xl md:text-4xl tracking-[0.4em] uppercase">ABOUT US</h1>
          <div className="mx-auto mt-4 h-px w-24 bg-white/70"></div>
        </Reveal>

        <div className="mt-10 mx-auto max-w-4xl text-left space-y-6 text-lg sm:text-xl md:text-2xl leading-relaxed text-white/90 font-body font-normal text-justify tracking-normal normal-case">
          <Reveal as="p" delay={0}>
            Born in Berlin, DRIPS is a meeting point of disciplines. We create audiovisual works,
            events, and urban interventions that explore the sensory and the conceptual through a
            liquid, raw, and contemporary aesthetic.
          </Reveal>
          <Reveal as="p" delay={80}>
            We move through techno and hard groove not just as genres, but as languages tools to
            express tension, release, resistance. Every set becomes a space for something honest.
            Something that sweats, shifts, and refuses to let go.
          </Reveal>
          <Reveal as="p" delay={160}>
            We believe in the slow build, the steady pressure. In sound as movement, and movement
            as meaning. From the floor to the booth, everything is connected.
          </Reveal>
          <Reveal as="p" delay={240}>
            A ritual. A rupture. A reminder that we're not alone in the noise.
          </Reveal>
        </div>

        <Reveal as="div" className="mt-12 h-px w-full bg-white/15"></Reveal>

        <Reveal as="div" className="mt-24 md:mt-32 text-center">
          <h2 className="font-heading text-2xl md:text-3xl tracking-[0.35em] uppercase">
            PHOTO GALLERY
          </h2>
          <div className="mx-auto mt-4 h-px w-28 bg-white/70"></div>
        </Reveal>

        <div className="mt-12 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
          {galleryImages.map((image, index) => (
            <Reveal
              key={image.alt}
              as="button"
              type="button"
              onClick={() => handleOpenLightbox(index)}
              className="mb-6 block break-inside-avoid text-left"
              delay={Math.min(index * 60, 360)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full ${image.height} object-cover border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.45)]`}
              />
            </Reveal>
          ))}
        </div>

      </div>

      {isLightboxOpen && activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          onClick={handleCloseLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6 py-10"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleCloseLightbox();
            }}
            className="absolute right-6 top-6 text-xs uppercase tracking-[0.3em] text-white/80 hover:text-white transition-opacity"
            aria-label="Close gallery"
          >
            X
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-opacity"
            aria-label="Previous image"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-9 w-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            onClick={(event) => event.stopPropagation()}
            className="relative flex items-center justify-center"
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-opacity"
            aria-label="Next image"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-9 w-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default About;



