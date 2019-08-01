import { useEffect, useRef, useState, useCallback } from 'react';
import 'intersection-observer'; // polyfill

export const useIntersectionObserver = <T extends HTMLElement>(
  target: React.MutableRefObject<T | null>,
  parentContainer: HTMLElement | null = null,
  rootMargin: string = '0px',
  threshold: number = 0.3,
  onIntersectionChange?: (isIntersecting: boolean) => void
) => {
  const isIntersecting = useRef(false);
  const setIsIntersecting = useCallback(
    (value: boolean) => {
      if (isIntersecting.current !== value) {
        onIntersectionChange && onIntersectionChange(value);
      }
      isIntersecting.current = value;
    },
    [onIntersectionChange]
  );

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    if (!target.current) {
      setIsIntersecting(false);
      return;
    }

    observer.current = new IntersectionObserver(
      ([data]) => {
        setIsIntersecting(data.isIntersecting);
      },
      {
        root: parentContainer,
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
  }, [parentContainer, rootMargin, target, threshold, setIsIntersecting]);
};

export const useIsIntersecting = <T extends HTMLElement>(
  target: React.MutableRefObject<T | null>,
  parentContainer: HTMLElement | null = null,
  rootMargin: string = '0px',
  threshold: number = 0.3
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const onIntersectionChange = useCallback((value: boolean) => {
    setIsIntersecting(value);
  }, []);

  useIntersectionObserver(
    target,
    parentContainer,
    rootMargin,
    threshold,
    onIntersectionChange
  );

  return isIntersecting;
};
