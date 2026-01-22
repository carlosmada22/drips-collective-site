import React, { useEffect, useRef, useState } from 'react';
import useScrollLock from '../hooks/useScrollLock';
// @ts-ignore: imported image has no type declarations
import DropIcon from '../src/assets/logos/ISOTIPO-ORIGINAL.png';
// @ts-ignore: imported image has no type declarations
import Logo1 from '../src/assets/logos/LOGO1.png';

type LoaderPhase = 'drop' | 'logo' | 'done';

interface IntroLoaderProps {
  onDone: () => void;
}

const ACCENT_TEAL = '#1DA0A0';
const DROP_DURATION_MS = 1400;
const LOGO_HOLD_MS = 1100;
const FADE_DURATION_MS = 200;
const REDUCED_LOGO_HOLD_MS = 700;
const REDUCED_FADE_MS = 200;

const IntroLoader: React.FC<IntroLoaderProps> = ({ onDone }) => {
  const [phase, setPhase] = useState<LoaderPhase>('drop');
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const doneRef = useRef(false);

  useScrollLock(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setPrefersReducedMotion(false);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion === null) {
      return;
    }

    if (prefersReducedMotion) {
      setProgress(100);
      setPhase('logo');
      return;
    }

    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const nextProgress = Math.min(100, (elapsed / DROP_DURATION_MS) * 100);
      setProgress(nextProgress);
      if (elapsed < DROP_DURATION_MS) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setPhase('logo');
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (phase !== 'logo' || prefersReducedMotion === null) {
      return;
    }

    const holdDuration = prefersReducedMotion ? REDUCED_LOGO_HOLD_MS : LOGO_HOLD_MS;
    const fadeDuration = prefersReducedMotion ? REDUCED_FADE_MS : FADE_DURATION_MS;

    const holdTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, holdDuration);

    const doneTimer = window.setTimeout(() => {
      if (doneRef.current) {
        return;
      }
      doneRef.current = true;
      setPhase('done');
      onDone();
    }, holdDuration + fadeDuration);

    return () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone, phase, prefersReducedMotion]);

  const fillPercent = Math.min(100, Math.max(0, progress));
  const fillStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to top, ${ACCENT_TEAL} ${fillPercent}%, transparent ${fillPercent}%)`,
    WebkitMaskImage: `url(${DropIcon})`,
    maskImage: `url(${DropIcon})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-300 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative h-52 w-52 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-96 lg:w-96 xl:h-[420px] xl:w-[420px]">
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            phase === 'drop' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0" style={fillStyle} />
          <img src={DropIcon} alt="DRIPS drop icon" className="absolute inset-0 h-full w-full object-contain" />
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            phase === 'logo' && !isExiting ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={Logo1}
            alt="DRIPS logo"
            className="w-60 sm:w-72 md:w-96 lg:w-[480px] xl:w-[560px] h-auto max-w-[85vw] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroLoader;
