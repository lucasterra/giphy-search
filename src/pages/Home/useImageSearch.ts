import { useState, useEffect } from 'react';
import { searchImages, Root } from '../../api/GIPHY';

const cache = {};
export const useImageSearch = (
  searchTerm: string,
  count: number,
  offset: number
) => {
  const [images, setImages] = useState<Root | null>(null);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      let isFresh = true;
      searchImages(searchTerm, count, offset, cache).then((data) => {
        if (isFresh) {
          setImages(data);
        }
      });

      return () => {
        isFresh = false;
      };
    }
  }, [searchTerm, count, offset]);

  return images;
};
