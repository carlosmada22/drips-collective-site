import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../constants';
import footerBg from '../src/assets/bg/3h.png';
import Reveal from './Reveal';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const footer = footerRef.current;
    const background = backgroundRef.current;

    if (!footer || !background || prefersReducedMotion) {
      return;
    }

    let frameId = 0;
    let isInView = false;
    const maxShift = 40;

    const updatePosition = () => {
      if (!footer || !background) {
        return;
      }

      const rect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 0;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));
      const translateY = (clamped - 0.5) * maxShift;

      background.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(1.35)`;
    };

    const onScroll = () => {
      if (!isInView || frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updatePosition();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) {
          updatePosition();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updatePosition();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-black text-white pt-24 pb-12 overflow-hidden">
      
      {/* Background with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <div
          ref={backgroundRef}
          className="absolute -inset-10 bg-cover bg-center opacity-90 blur-[4px] transform-gpu"
          style={{ backgroundImage: `url(${footerBg})`, transform: 'scale(1.35)' }}
        />
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Newsletter */}
        <Reveal as="div" className="w-full max-w-xl mb-20">
          <h3 className="text-2xl font-heading uppercase tracking-widest mb-4">JOIN OUR TELEGRAM CHANNEL</h3>
          <p className="text-gray-400 text-sm mb-8 tracking-wide font-body">
            Be the first to know about upcoming warehouse events and releases.
          </p>
          <a
            href="https://t.me/dripscollective"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center px-10 py-4 bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white transition-colors duration-300 uppercase tracking-widest text-sm font-medium"
          >
            JOIN TELEGRAM
          </a>
        </Reveal>

        {/* Socials */}
        <div className="flex items-center gap-8 mb-16">
          {SOCIAL_LINKS.map((social) => (
            <a 
              key={social.platform}
              href={social.url}
              className="hover:text-gray-400 transition-colors duration-300"
              aria-label={social.platform}
            >
              {social.iconSrc ? (
                <img
                  src={social.iconSrc}
                  alt={social.platform}
                  className="w-[20px] h-[20px] object-contain opacity-90 hover:opacity-60 transition-opacity duration-300"
                />
              ) : (
                social.icon && <social.icon size={20} />
              )}
            </a>
          ))}
        </div>

        {/* Brand & Info */}
        <div className="mb-12 space-y-2">
          <p className="text-sm text-gray-400 font-mono">BERLIN, GERMANY</p>
          <div className="flex flex-col gap-1 text-sm text-gray-400 font-mono mt-4">
             <a href="mailto:collectivedrips@gmail.com" className="hover:text-white transition-colors">
               collectivedrips@gmail.com
             </a>
          </div>
        </div>

        {/* Legal / Cookie */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] text-gray-600 uppercase tracking-widest">
           <span>&copy; {new Date().getFullYear()} DRIPS COLLECTIVE. ALL RIGHTS RESERVED.</span>
           <div className="flex gap-6 mt-4 sm:mt-0">
             <Link to="/privacy-policy" className="hover:text-gray-400 transition-colors">
               Privacy Policy
             </Link>
             <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
             <a href="#cookies" className="hover:text-gray-400 transition-colors underline decoration-gray-700 underline-offset-4">Cookie Preferences</a>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
