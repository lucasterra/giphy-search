/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const loadImage = (src: string) => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;

    img.src = src;
  });
};

const loadImages = (srcImgs: string[]) => {
  return new Promise<string>(async (resolve, reject) => {
    if (!srcImgs || srcImgs.length === 0) {
      reject(new Error());
      return;
    }

    let i = 0;
    const tryLoadImg = (src: string) => {
      loadImage(srcImgs[i])
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

      loadImages(srcImgsArray)
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
