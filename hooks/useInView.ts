import { useEffect, useRef, useState } from 'react';

interface InViewOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

const useInView = (options: InViewOptions = {}) => {
  const { root = null, rootMargin, threshold, once = true } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, once]);

  return { ref, inView };
};

export default useInView;
