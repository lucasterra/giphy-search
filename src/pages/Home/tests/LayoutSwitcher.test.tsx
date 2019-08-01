import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LayoutSwitcher } from '../LayoutSwitcher';

const SwitcherTest = () => {
  const [mode, setMode] = useState('three_column');

  return (
    <>
      <LayoutSwitcher layoutMode={mode} setLayoutMode={setMode} />
      <span data-testid="layoutmode">{mode}</span>
    </>
  );
};

describe('LayoutSwitcher', () => {
  test('it should correctly switch between layouts', () => {
    const { getByTestId } = render(<SwitcherTest />);

    expect(getByTestId('layoutmode')).toHaveTextContent('three_column');

    fireEvent.click(getByTestId('single-column-button'));
    expect(getByTestId('layoutmode')).toHaveTextContent('single_column');

    fireEvent.click(getByTestId('three-column-button'));
    expect(getByTestId('layoutmode')).toHaveTextContent('three_column');
  });
});
