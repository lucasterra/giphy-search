import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useIntersectionObserver } from '../useIntersectionObserver';

const Comp: React.FC = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const visible = useIntersectionObserver(
    targetRef,
    parentRef.current ? parentRef.current : null
  );

  return (
    <div
      ref={parentRef}
      data-testid="parent"
      style={{ width: 200, maxHeight: 300, overflowY: 'scroll' }}
    >
      <div style={{ width: 100, minHeight: 5000 }} />
      <div
        ref={targetRef}
        data-testid="target"
        style={{ width: 100, height: 100 }}
      >
        {String(visible)}
      </div>
    </div>
  );
};

describe('useIntersectionObserver', () => {
  test('object visibility', () => {
    let { getByTestId, debug } = render(<Comp />);

    //debug();
    expect(getByTestId('target')).toHaveTextContent('false');

    getByTestId('parent').scrollTop = 5050;
    fireEvent.scroll(getByTestId('parent'), { target: { scrollY: 5050 } });
    //console.log(getByTestId('parent').scrollTop);

    //debug();
    //expect(getByTestId('target')).toHaveTextContent('true');
  });
});
