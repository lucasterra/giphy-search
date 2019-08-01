import { useEffect, useCallback, useReducer } from 'react';
import { useDebounce } from 'use-debounce';
import { searchImages, Root } from '../../api/GIPHY';
import {
  reducer,
  SET_TEXT,
  NEXT_PAGE,
  SET_IMAGE_DATA,
} from './paginationReducer';

const cache = {};
const useImageFetcher = (data: {
  searchTerm: string;
  count: number;
  offset: number;
  imageData: Root | null;
  setImageData: (data: Root | null, mergeData?: boolean) => void;
}) => {
  const { searchTerm, count, offset, imageData, setImageData } = data;

  useEffect(() => {
    let isFresh = true;
    searchImages(searchTerm, count, offset, cache).then((result) => {
      if (isFresh) {
        if (offset === 0) {
          // first page, just override all the results
          setImageData(result);
        } else {
          // second or more page, merge image data
          setImageData(result, true);
        }
      }
    });

    return () => {
      isFresh = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, count, offset]);

  return imageData;
};

export const useImageSearch = (imagesPerPage: number) => {
  const [reducerData, dispatch] = useReducer(reducer, {
    text: '',
    page: 0,
    isLoading: false,
    imageData: null,
  });
  const { text, isLoading, page, imageData } = reducerData;

  // debounce text changes, to avoid calling GIPHY API on every keystroke
  const [debouncedText] = useDebounce(text, 250);

  // functions passed on hook return
  const setSearchTerm = useCallback((text: string) => {
    dispatch({ type: SET_TEXT, payload: text });
  }, []);

  // called to load more images
  const loadMore = useCallback(() => {
    if (isLoading) {
      return;
    }

    dispatch({ type: NEXT_PAGE });
  }, [isLoading]);

  // update image data object
  const setImageData = useCallback(
    (data: Root | null, mergeData?: boolean) => {
      if (mergeData && imageData !== null && data !== null) {
        dispatch({
          type: SET_IMAGE_DATA,
          payload: { ...data, data: [...imageData.data, ...data.data] },
        });
      } else {
        dispatch({ type: SET_IMAGE_DATA, payload: data });
      }
    },
    [imageData]
  );

  // fetch data from the API
  useImageFetcher({
    searchTerm: debouncedText,
    count: imagesPerPage,
    offset: page * imagesPerPage,
    imageData,
    setImageData,
  });

  // whether we have more images to load or not
  const hasMoreImages = Boolean(
    imageData && imageData.data.length < imageData.pagination.total_count
  );

  return { ...reducerData, setSearchTerm, loadMore, hasMoreImages };
};
