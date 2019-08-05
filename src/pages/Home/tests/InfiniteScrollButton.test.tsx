import React from 'react';
import { render, act } from '@testing-library/react';
import {
  MockedIntersectionObserver,
  mockIsIntersecting,
} from '../../../hooks/tests/mocks/MockedIntersectionObserver';
import { InfiniteScrollButton } from '../InfiniteScrollButton';
import '@testing-library/react/cleanup-after-each';

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
      mockIsIntersecting(true);
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
