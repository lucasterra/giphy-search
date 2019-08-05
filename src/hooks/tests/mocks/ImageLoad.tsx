import React from 'react';
import { useImageLoad } from '../../useImageLoad';

export const DumbImage: React.FC<{
  src: string[] | string;
  enabled: boolean;
}> = ({ src, enabled }) => {
  const loaded = useImageLoad(src, enabled);

  return <div data-testid="img">{String(loaded)}</div>;
};

export const webpImage = 'https://example.com/image.webp';
export const jpgImage = 'https://example.com/image.jpg';
export const badImage = 'https://example.com/fake_image.jpg';
export const mockImageLoad = () => {
  // Mocking Image.prototype.src to call the onload or onerror
  // callbacks depending on the src passed to it
  Object.defineProperty((global as any).Image.prototype, 'src', {
    // Define the property setter
    set(src) {
      if (src === jpgImage || src === webpImage) {
        this.onload();
      } else {
        // do not load...
        this.onerror();
      }
    },
  });
};
