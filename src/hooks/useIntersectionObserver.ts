import { useState, useEffect, useRef } from 'react';
import 'intersection-observer'; // polyfill

export const useIntersectionObserver = <T extends HTMLElement>(
  target: React.MutableRefObject<T | null>,
  rootMargin: string = '0px',
  threshold: number = 0.3,
  container: HTMLElement | null = null
) => {
  const [isVisible, setIsVisible] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    if (!target.current) {
      setIsVisible(false);
      return;
    }

    observer.current = new IntersectionObserver(
      ([data]) => {
        setIsVisible(data.isIntersecting);
      },
      {
        root: container,
        rootMargin,
        threshold,
      }
    );

    observer.current.observe(target.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [container, rootMargin, target, threshold]);

  return isVisible;
};
