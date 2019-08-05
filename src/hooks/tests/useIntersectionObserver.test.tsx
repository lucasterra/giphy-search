import React, { useRef } from 'react';
import { render, act } from '@testing-library/react';
import { useIsIntersecting } from '../useIntersectionObserver';
import {
  MockedIntersectionObserver,
  mockIsIntersecting,
} from './mocks/MockedIntersectionObserver';
import '@testing-library/react/cleanup-after-each';

const Comp: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const visible = useIsIntersecting(hidden ? { current: null } : targetRef);

  return (
    <>
      <div style={{ width: 100, minHeight: 5000 }} />
      <div
        key={String(hidden)}
        ref={targetRef}
        data-testid="target"
        style={{ width: 100, height: 100 }}
      >
        {String(visible)}
      </div>
    </>
  );
};

describe('useIntersectionObserver', () => {
  beforeAll(() => {
    (global as any).IntersectionObserver = MockedIntersectionObserver;
  });

  test('object visibility', () => {
    let { getByTestId, rerender } = render(<Comp hidden={false} />);

    expect(getByTestId('target')).toHaveTextContent('false');

    act(() => {
      mockIsIntersecting(true);
    });

    expect(getByTestId('target')).toHaveTextContent('true');

    // fake hide element
    rerender(<Comp hidden={true} />);
    expect(getByTestId('target')).toHaveTextContent('false');
  });
});
