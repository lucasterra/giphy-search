import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import { Home } from '../Home';

import trendingFirstPage from './fixtures/trending_0.json';
import trendingSecondPage from './fixtures/trending_1.json';
import kittenFirstPage from './fixtures/kitten_0.json';
import kittenSecondPage from './fixtures/kitten_1.json';

const mockFetch = jest.fn();
jest.spyOn(global as any, 'fetch').mockImplementation((url: string) => {
  mockFetch(url);

  switch (url) {
    case 'https://api.giphy.com/v1/gifs/trending?limit=24&offset=0&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6':
      return Promise.resolve({
        json: () => Promise.resolve(trendingFirstPage),
      });
    case 'https://api.giphy.com/v1/gifs/trending?limit=24&offset=24&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6':
      return Promise.resolve({
        json: () => Promise.resolve(trendingSecondPage),
      });
    case 'https://api.giphy.com/v1/gifs/search?q=kitten&limit=24&offset=0&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6':
      return Promise.resolve({
        json: () => Promise.resolve(kittenFirstPage),
      });
    case 'https://api.giphy.com/v1/gifs/search?q=kitten&limit=24&offset=24&rating=G&lang=en&api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6':
      return Promise.resolve({
        json: () => Promise.resolve(kittenSecondPage),
      });
    default:
      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
  }
});

describe('<Home />', () => {
  test('it renders correctly', async () => {
    // initial render
    const { getByTestId, queryByTestId } = render(<Home debounceTime={0} />);

    await waitForDomChange({
      container: getByTestId('infinite-scroll-button'),
    });

    expect(getByTestId('column-0')).toMatchSnapshot();
    expect(getByTestId('column-1')).toMatchSnapshot();
    expect(getByTestId('column-2')).toMatchSnapshot();

    // load more trending pictures
    fireEvent.click(getByTestId('infinite-scroll-button'));

    await waitForDomChange({
      container: getByTestId('infinite-scroll-button'),
    });

    expect(getByTestId('column-0')).toMatchSnapshot();
    expect(getByTestId('column-1')).toMatchSnapshot();
    expect(getByTestId('column-2')).toMatchSnapshot();

    // load kitten pictures :D
    fireEvent.change(getByTestId('searchbox'), {
      target: { value: 'kitten' },
    });

    await waitForDomChange({
      container: getByTestId('infinite-scroll-button'),
    });

    expect(getByTestId('column-0')).toMatchSnapshot();
    expect(getByTestId('column-1')).toMatchSnapshot();
    expect(getByTestId('column-2')).toMatchSnapshot();
  });
});
