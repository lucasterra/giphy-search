/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const supportsWebp = (() => {
  let hasWebpSupport = false;
  let tested = false;

  return async () => {
    if (tested) {
      return hasWebpSupport;
    }

    // taken from: https://davidwalsh.name/detect-webp
    tested = true;
    hasWebpSupport = await (async () => {
      if (!window.createImageBitmap) return false;

      const webpData =
        'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
      const blob = await fetch(webpData).then((r) => r.blob());
      return window.createImageBitmap(blob).then(() => true, () => false);
    })();

    return hasWebpSupport;
  };
})();

const loadImage = (src: string) => {
  return new Promise<string>(async (resolve, reject) => {
    if (src.endsWith('.webp') && (await supportsWebp()) === false) {
      reject(new Error());
      return;
    }

    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => {
      reject(new Error());
    };

    img.src = src;
  });
};

// Will try to load images from srcImgs... you can pass many strings, to make it
// fallback to a supported format. i.e.: ['img.webp', 'img.mp4', 'img.gif']
const loadImagesWithFallback = (srcImgs: string[]) => {
  return new Promise<string>(async (resolve, reject) => {
    let i = 0;
    const tryLoadImg = (src: string) => {
      loadImage(src)
        .then((img) => {
          resolve(img);
        })
        .catch(() => {
          // img format not supported, lets try the next image
          i += 1;
          if (i < srcImgs.length) {
            tryLoadImg(srcImgs[i]);
          } else {
            reject(new Error());
          }
        });
    };

    tryLoadImg(srcImgs[i]);
  });
};

// Will try to load images from srcImgs... you can pass many strings, to make it
// fallback to a supported format. i.e.: ['img.webp', 'img.mp4', 'img.gif']
export const useImageLoad = (srcImgs: string[] | string, enabled: boolean) => {
  const [src, setSrc] = useState<string | undefined>(undefined);
  const srcImgsArray = Array.isArray(srcImgs) ? srcImgs : [srcImgs];

  useEffect(() => {
    // set loaded to false when changing src
    setSrc(undefined);
  }, srcImgsArray);

  useEffect(() => {
    if (srcImgsArray && srcImgsArray.length > 0 && enabled) {
      let isFresh = true;

      loadImagesWithFallback(srcImgsArray)
        .then((img) => {
          if (isFresh) {
            setSrc(img);
          }
        })
        .catch(() => {});

      return () => {
        isFresh = false;
      };
    }
  }, [enabled, ...srcImgsArray]);

  return src;
};
