import { useState, useEffect } from 'react';

export const useImageLoad = (src: string, enabled: boolean) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // set loaded to false when changing src
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    if (src) {
      if (!enabled) {
        return;
      }

      const img = new Image();
      img.onload = () => {
        setLoaded(true);
      };
      img.src = src;

      return () => {
        img.onload = null;
      };
    }
  }, [src, enabled]);

  return loaded;
};
