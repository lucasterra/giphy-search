import { searchImages } from '../index';

const globalAny: any = global;

const mockJsonPromise = Promise.resolve({});
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});
jest.spyOn(globalAny, 'fetch').mockImplementation(() => mockFetchPromise);

afterEach(() => {
  globalAny.fetch.mockClear();
});

describe('searchImages API client', () => {
  describe('search trending', () => {
    test('call with page 0', async () => {
      const result = await searchImages('', 20, 0);

      expect(globalAny.fetch).toHaveBeenCalledTimes(1);
      expect(globalAny.fetch).toHaveBeenLastCalledWith(
        'https://api.giphy.com/v1/gifs/trending?limit=20&offset=0&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6'
      );

      expect(result).toEqual({});
    });
  });

  describe('search kittens', () => {
    test('call with page 0', async () => {
      const result = await searchImages('kittens');

      expect(globalAny.fetch).toHaveBeenCalledTimes(1);
      expect(globalAny.fetch).toHaveBeenLastCalledWith(
        'https://api.giphy.com/v1/gifs/search?q=kittens&limit=20&offset=0&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6'
      );

      expect(result).toEqual({});
    });

    test('call with page 0, with cache', async () => {
      const cache: any = {};
      const expectedUrl =
        'https://api.giphy.com/v1/gifs/search?q=kittens&limit=20&offset=0&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6';
      let result = await searchImages('kittens', 20, 0, cache);

      expect(globalAny.fetch).toHaveBeenCalledTimes(1);
      expect(globalAny.fetch).toHaveBeenLastCalledWith(expectedUrl);

      result = await searchImages('kittens', 20, 0, cache);
      expect(globalAny.fetch).toHaveBeenCalledTimes(1);
      expect(Object.keys(cache)).toHaveLength(1);
      expect(cache[expectedUrl]).toEqual({});
      expect(result).toEqual({});
    });

    test('call with page 1', async () => {
      const result = await searchImages('kittens', 20, 20);

      expect(globalAny.fetch).toHaveBeenCalledTimes(1);
      expect(globalAny.fetch).toHaveBeenLastCalledWith(
        'https://api.giphy.com/v1/gifs/search?q=kittens&limit=20&offset=20&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6'
      );

      expect(result).toEqual({});
    });
  });

  describe('search marvel', () => {
    test('call with page 0 and 40 images', async () => {
      const result = await searchImages('marvel', 40, 0);

      expect(globalAny.fetch).toHaveBeenCalledTimes(1);
      expect(globalAny.fetch).toHaveBeenLastCalledWith(
        'https://api.giphy.com/v1/gifs/search?q=marvel&limit=40&offset=0&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6'
      );

      expect(result).toEqual({});
    });

    test('call with page 1 and 40 images', async () => {
      const result = await searchImages('marvel', 40, 40);

      expect(globalAny.fetch).toHaveBeenCalledTimes(1);
      expect(globalAny.fetch).toHaveBeenLastCalledWith(
        'https://api.giphy.com/v1/gifs/search?q=marvel&limit=40&offset=40&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6'
      );

      expect(result).toEqual({});
    });
  });
});
