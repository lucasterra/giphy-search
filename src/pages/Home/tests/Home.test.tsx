import React from 'react';
import { render, fireEvent, act, wait, cleanup } from '@testing-library/react';
import { Home } from '../Home';
import { MockedIntersectionObserver } from '../../../hooks/tests/mocks/MockedIntersectionObserver';

import trendingFirstPage from './fixtures/trending_0.json';
import trendingSecondPage from './fixtures/trending_1.json';
import kittenFirstPage from './fixtures/kitten_0.json';
import kittenSecondPage from './fixtures/kitten_1.json';

(global as any).IntersectionObserver = MockedIntersectionObserver;

const urls: { [key: string]: { url: string; data: any; error?: any } } = {
  trendingFirstPage: {
    url:
      'https://api.giphy.com/v1/gifs/trending?limit=24&offset=0&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6',
    data: trendingFirstPage,
  },
  trendingSecondPage: {
    url:
      'https://api.giphy.com/v1/gifs/trending?limit=24&offset=24&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6',
    data: trendingSecondPage,
  },
  kittenFirstPage: {
    url:
      'https://api.giphy.com/v1/gifs/search?q=kitten&limit=24&offset=0&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6',
    data: kittenFirstPage,
  },
  kittenSecondPage: {
    url:
      'https://api.giphy.com/v1/gifs/search?q=kitten&limit=24&offset=24&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6',
    data: kittenSecondPage,
  },
  kittenThirdPage: {
    url:
      'https://api.giphy.com/v1/gifs/search?q=kitten&limit=24&offset=48&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6',
    data: 'offline',
  },
};

let resolve: (() => void) | null = null;
const mockFetch = jest.fn();
(global as any).fetch = (url: string) => {
  mockFetch(url);

  let returnData = {};

  const keys = Object.keys(urls);
  for (let i = 0; i < keys.length; i++) {
    if (url === urls[keys[i]].url) {
      returnData = urls[keys[i]].data;
    }
  }

  return new Promise((_resolve, _reject) => {
    if (returnData === 'offline') {
      resolve = () => {
        _reject(new Error('offline'));
        resolve = null;
      };
      return;
    }

    resolve = () => {
      _resolve({
        json: () => Promise.resolve(returnData),
      });
      resolve = null;
    };
  });
};

describe('<Home />', () => {
  // let rendered: ReturnType<typeof render>;
  let queryAllByTestId: any;
  let queryByText: any;
  let getByTestId: any;

  beforeAll(() => {
    const tmp = render(<Home debounceTime={0} />);
    queryAllByTestId = tmp.queryAllByTestId;
    queryByText = tmp.queryByText;
    getByTestId = tmp.getByTestId;
  });

  afterAll(() => {
    cleanup();
  });

  test('initial render', async () => {
    await act(async () => {
      resolve!();
    });

    expect(mockFetch).toHaveBeenLastCalledWith(urls.trendingFirstPage.url);
    expect(queryAllByTestId('placeholder')).toHaveLength(24);
  });

  test('load more trending pictures', async () => {
    // load more trending pictures
    await act(async () => {
      fireEvent.click(queryByText('Load more'));
      await wait();
      resolve!();
    });

    expect(mockFetch).toHaveBeenLastCalledWith(urls.trendingSecondPage.url);
    expect(queryAllByTestId('placeholder')).toHaveLength(48);
  });

  test("search for 'kitten' images", async () => {
    // load kitten pictures :D
    await act(async () => {
      fireEvent.change(getByTestId('searchbox'), {
        target: { value: 'kitten' },
      });
      await wait();
      resolve!();
    });

    expect(mockFetch).toHaveBeenLastCalledWith(urls.kittenFirstPage.url);
    expect(queryAllByTestId('placeholder')).toHaveLength(24);
  });

  test("load more 'kitten' images and avoid double loading", async () => {
    mockFetch.mockClear();

    // load kitten pictures :D
    await act(async () => {
      fireEvent.click(queryByText('Load more'));
      await wait();
      fireEvent.click(queryByText('Loading'));
      await wait();
      resolve!();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenLastCalledWith(urls.kittenSecondPage.url);
    expect(queryAllByTestId('placeholder')).toHaveLength(48);
  });

  test('layout switching: 1 column', () => {
    fireEvent.click(getByTestId('single-column-button'));

    expect(queryAllByTestId(/column-\d+/)).toHaveLength(1);
    expect(queryAllByTestId('placeholder')).toHaveLength(48);
  });

  test('layout switching: 3 column', () => {
    fireEvent.click(getByTestId('three-column-button'));

    expect(queryAllByTestId(/column-\d+/)).toHaveLength(3);
    expect(queryAllByTestId('placeholder')).toHaveLength(48);
  });

  test('failed request API', async () => {
    // load kitten pictures :D
    await act(async () => {
      fireEvent.click(queryByText('Load more'));
      await wait();
      resolve!();
    });

    expect(mockFetch).toHaveBeenLastCalledWith(urls.kittenThirdPage.url);
    expect(
      queryByText(
        'Oops, something went wrong while getting your images. Please check your internet connection'
      )
    ).toBeInTheDocument();
  });
});
