import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Input data-testid="input" type="text" defaultValue="hello" />
    );
    expect(getByTestId('input')).toHaveAttribute('value', 'hello');
  });
});
