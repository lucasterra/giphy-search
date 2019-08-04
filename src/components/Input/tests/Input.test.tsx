import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '../Input';
import '@testing-library/react/cleanup-after-each';

describe('Input', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Input data-testid="input" type="text" defaultValue="hello" />
    );
    expect(getByTestId('input')).toHaveAttribute('value', 'hello');
  });
});
