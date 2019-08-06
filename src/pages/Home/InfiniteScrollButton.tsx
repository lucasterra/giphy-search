import React, { useRef, useEffect } from 'react';
import { Button } from '../../components/Button';
import { useInView } from 'react-intersection-observer';
import 'intersection-observer'; // polyfill

function useInfiniteScroll(loadMore: () => void) {
  const wasInView = useRef<boolean>(false);
  const [ref, inView] = useInView({ rootMargin: '50px' });

  useEffect(() => {
    if (!wasInView.current && inView) {
      loadMore();
    }
    wasInView.current = inView;
  }, [inView, loadMore]);

  return ref;
}

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
      tabIndex={-1}
      ref={ref}
      style={hidden ? { display: 'none' } : undefined}
      onClick={loadMore}
      {...props}
    >
      {isLoading ? 'Loading' : 'Load more'}
    </Button>
  );
};
