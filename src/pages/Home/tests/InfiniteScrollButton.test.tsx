import React from 'react';
import { render, act } from '@testing-library/react';
import {
  MockedIntersectionObserver,
  mockScroll,
} from '../../../hooks/tests/mocks/MockedIntersectionObserver';
import { InfiniteScrollButton } from '../InfiniteScrollButton';

describe('InfiniteScrollButton', () => {
  beforeAll(() => {
    (global as any).IntersectionObserver = MockedIntersectionObserver;
  });

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
      mockScroll!(5500);
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
