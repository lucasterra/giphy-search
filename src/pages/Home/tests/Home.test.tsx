import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import { Home } from '../Home';

import trendingFirstPage from './fixtures/trending_0.json';
import trendingSecondPage from './fixtures/trending_1.json';
import kittenFirstPage from './fixtures/kitten_0.json';
import kittenSecondPage from './fixtures/kitten_1.json';

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
    error: new Error('something is wrong'),
  },
};

const mockFetch = jest.fn();
jest.spyOn(global as any, 'fetch').mockImplementation((...args) => {
  const url: string = args[0] as any;
  mockFetch(url);

  const keys = Object.keys(urls);
  for (let i = 0; i < keys.length; i++) {
    if (url === urls[keys[i]].url) {
      return Promise.resolve({
        json: () => Promise.resolve(urls[keys[i]].data),
      });
    }
  }

  return Promise.resolve({
    json: () => Promise.resolve({}),
  });
});

describe('<Home />', () => {
  test('it renders correctly', async () => {
    // initial render
    const { getByTestId, queryAllByTestId } = render(<Home debounceTime={0} />);

    await waitForDomChange({
      container: getByTestId('column-0'),
    });

    expect(mockFetch).toHaveBeenLastCalledWith(urls.trendingFirstPage.url);
    expect(queryAllByTestId(/column-\d+/)).toHaveLength(3);
    expect(queryAllByTestId('placeholder')).toHaveLength(24);

    // load more trending pictures
    fireEvent.click(getByTestId('infinite-scroll-button'));

    await waitForDomChange({
      container: getByTestId('column-0'),
    });

    expect(mockFetch).toHaveBeenLastCalledWith(urls.trendingSecondPage.url);
    expect(queryAllByTestId(/column-\d+/)).toHaveLength(3);
    expect(queryAllByTestId('placeholder')).toHaveLength(48);

    // load kitten pictures :D
    fireEvent.change(getByTestId('searchbox'), {
      target: { value: 'kitten' },
    });

    await waitForDomChange({
      container: getByTestId('column-0'),
    });

    expect(mockFetch).toHaveBeenLastCalledWith(urls.kittenFirstPage.url);
    expect(queryAllByTestId(/column-\d+/)).toHaveLength(3);
    expect(queryAllByTestId('placeholder')).toHaveLength(24);

    // change to single column mode
    fireEvent.click(getByTestId('single-column-button'));

    await waitForDomChange({
      container: getByTestId('grid'),
    });

    expect(queryAllByTestId(/column-\d+/)).toHaveLength(1);
  });
});
