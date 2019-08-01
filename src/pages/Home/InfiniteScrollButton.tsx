import React, { useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function useInfiniteScroll(loadMore: () => void) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const onIntersectionChanged = useCallback(
    (intersecting: boolean) => {
      if (intersecting) {
        loadMore();
      }
    },
    [loadMore]
  );
  useIntersectionObserver(ref, null, '50px', 0.1, onIntersectionChanged);

  return ref;
}

const Button = styled.button({});

export interface InfiniteScrollButtonProps {
  loadMore: () => void;
  hidden: boolean;
  isLoading: boolean;
}

export const InfiniteScrollButton: React.FC<InfiniteScrollButtonProps> = ({
  loadMore,
  hidden,
  isLoading,
  ...props
}) => {
  const ref = useInfiniteScroll(loadMore);

  return (
    <Button
      ref={ref}
      style={hidden ? { display: 'none' } : undefined}
      onClick={loadMore}
      {...props}
    >
      {isLoading ? 'Loading' : 'Load more'}
    </Button>
  );
};
