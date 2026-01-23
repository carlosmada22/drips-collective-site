import React, { useRef } from 'react';
import Button from './ui/Button';
import { HERO_CTA_LINKS } from '../constants';
import Reveal from './Reveal';
import heroVideoMp4 from '../src/assets/videos/entre_risas.mp4';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover scale-[1.2] blur-[8px] transform-gpu"
        >
          <source src={heroVideoMp4} type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-40 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <Reveal as="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {HERO_CTA_LINKS.map((link) => (
            <div key={link.label} className="flex justify-center">
              <Button
                label={link.label}
                to={link.to}
                className="w-full max-w-[200px]"
              />
            </div>
          ))}
        </Reveal>
      </div>

      {/* Scroll indicator (optional but helpful) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </div>

    </section>
  );
};

export default Hero;
