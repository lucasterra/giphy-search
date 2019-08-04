import React from 'react';
import { render } from '@testing-library/react';
import { Layout } from '../Layout';
import '@testing-library/react/cleanup-after-each';

describe('Layout', () => {
  it('renders without crashing', () => {
    const { container } = render(<Layout>Hello</Layout>);
    expect(container).toHaveTextContent('Hello');
  });
});
