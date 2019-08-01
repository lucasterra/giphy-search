import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders without crashing', () => {
    const { container, rerender } = render(<Button>Hello</Button>);
    expect(container).toHaveTextContent('Hello');

    rerender(<Button active={true}>Hello</Button>);
    expect(container).toHaveTextContent('Hello');
  });
});
