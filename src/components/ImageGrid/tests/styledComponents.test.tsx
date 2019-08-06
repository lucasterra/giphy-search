import React from 'react';
import { render } from '@testing-library/react';
import { GridColumn, GridRoot } from '../styledComponents';
import '@testing-library/react/cleanup-after-each';

describe('styledComponents', () => {
  test('GridColumn', () => {
    const { container } = render(<GridColumn>A grid column</GridColumn>);

    expect(container).toHaveTextContent('A grid column');
  });

  test('GridRoot', () => {
    const { container } = render(<GridRoot>A grid root</GridRoot>);

    expect(container).toHaveTextContent('A grid root');
  });
});
