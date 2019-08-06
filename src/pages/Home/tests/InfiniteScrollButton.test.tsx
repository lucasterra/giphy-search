import React from 'react';
import { render, act } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { InfiniteScrollButton } from '../InfiniteScrollButton';
import '@testing-library/react/cleanup-after-each';

describe('InfiniteScrollButton', () => {
  test('renders correctly', () => {
    const mockLoadMore = jest.fn();
    const { container } = render(
      <InfiniteScrollButton
        loadMore={mockLoadMore}
        hidden={false}
        isLoading={false}
      />
    );

    expect(container).toHaveTextContent('Load more');

    act(() => {
      mockAllIsIntersecting(true);
    });

    expect(mockLoadMore).toHaveBeenCalled();
  });

  test('renders loading state', () => {
    const mockLoadMore = jest.fn();
    const { container } = render(
      <InfiniteScrollButton
        loadMore={mockLoadMore}
        hidden={false}
        isLoading={true}
      />
    );

    expect(container).toHaveTextContent('Loading');
  });

  test('hides itself when hidden', () => {
    const mockLoadMore = jest.fn();
    const { container } = render(
      <InfiniteScrollButton
        loadMore={mockLoadMore}
        hidden={true}
        isLoading={false}
      />
    );

    expect(container.querySelector('button')).toHaveAttribute(
      'style',
      'display: none;'
    );
  });
});
