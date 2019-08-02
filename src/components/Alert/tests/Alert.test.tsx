import React from 'react';
import { render } from '@testing-library/react';
import { Alert } from '../Alert';

describe('Alert', () => {
  it('renders without crashing', () => {
    const { container } = render(<Alert>A really alarming error</Alert>);
    expect(container).toHaveTextContent('A really alarming error');
  });
});
