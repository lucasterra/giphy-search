import React from 'react';
import { Global } from '@emotion/core';
import { render } from '@testing-library/react';
import { styles } from '../global';
import '@testing-library/react/cleanup-after-each';

test('renders without crashing', () => {
  const { container } = render(<Global styles={styles} />);

  expect(container).toMatchInlineSnapshot(`<div />`);
});
