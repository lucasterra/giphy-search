import React from 'react';
import { render } from '@testing-library/react';
import { useImageLoad } from '../useImageLoad';

const DumbImage: React.FC<{ src: string; enabled: boolean }> = ({
  src,
  enabled,
}) => {
  const loaded = useImageLoad(src, enabled);

  return <div data-testid="img">{String(loaded)}</div>;
};

describe('useImageLoad hook', () => {
  beforeAll(() => {
    // Mocking Image.prototype.src to call the onload or onerror
    // callbacks depending on the src passed to it
    Object.defineProperty((global as any).Image.prototype, 'src', {
      // Define the property setter
      set(src) {
        if (src !== 'https://example.com/fake_image.jpg') {
          this.onload();
        }
      },
    });
  });

  test('hook disabled', () => {
    const ret = render(
      <DumbImage src="https://example.com/image.jpg" enabled={false} />
    );

    expect(ret.getByTestId('img')).toHaveTextContent('false');
  });

  test('hook enabled', () => {
    const ret = render(
      <DumbImage src="https://example.com/image.jpg" enabled={true} />
    );

    expect(ret.getByTestId('img')).toHaveTextContent('true');
  });

  test("hook enabled, image won't load", () => {
    const ret = render(
      <DumbImage src="https://example.com/fake_image.jpg" enabled={true} />
    );

    expect(ret.getByTestId('img')).toHaveTextContent('false');
  });
});
