import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { Home } from '../Home';

jest.spyOn(global as any, 'fetch').mockImplementation(() => {
  return Promise.reject(new Error());
});

describe('<Home />', () => {
  test('when offline, it shows an error message', async () => {
    const { getByText } = render(<Home debounceTime={0} />);

    const alert = await waitForElement(() =>
      getByText(
        'Oops, something went wrong while getting your images. Please check your internet connection'
      )
    );

    expect(alert).toBeInTheDocument();
  });
});
