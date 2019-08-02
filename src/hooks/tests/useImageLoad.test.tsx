import React from 'react';
import { render, act, waitForDomChange } from '@testing-library/react';
import { useImageLoad } from '../useImageLoad';

const DumbImage: React.FC<{ src: string[] | string; enabled: boolean }> = ({
  src,
  enabled,
}) => {
  const loaded = useImageLoad(Array.isArray(src) ? src : [src], enabled);

  return <div data-testid="img">{String(loaded)}</div>;
};

const unsupportedImage = 'https://example.com/image.webp';
const goodImage = 'https://example.com/image.jpg';
const badImage = 'https://example.com/fake_image.jpg';

describe('useImageLoad hook', () => {
  beforeAll(() => {
    // Mocking Image.prototype.src to call the onload or onerror
    // callbacks depending on the src passed to it
    Object.defineProperty((global as any).Image.prototype, 'src', {
      // Define the property setter
      set(src) {
        if (src === unsupportedImage) {
          this.onerror();
        } else if (src === goodImage) {
          this.onload();
        } else {
          // do not load...
          this.onerror();
        }
      },
    });
  });

  test('hook disabled', () => {
    const ret = render(<DumbImage src={goodImage} enabled={false} />);

    expect(ret.getByTestId('img')).toHaveTextContent('undefined');
  });

  test('hook enabled', async () => {
    const ret = render(<DumbImage src={goodImage} enabled={true} />);

    await waitForDomChange({ container: ret.getByTestId('img') });

    expect(ret.getByTestId('img')).toHaveTextContent(goodImage);
  });

  test('hook enabled, with fallback', async () => {
    const ret = render(
      <DumbImage src={[unsupportedImage, goodImage]} enabled={true} />
    );

    await waitForDomChange({ container: ret.getByTestId('img') });

    expect(ret.getByTestId('img')).toHaveTextContent(goodImage);
  });

  test("hook enabled, image won't load", () => {
    const ret = render(<DumbImage src={badImage} enabled={true} />);

    expect(ret.getByTestId('img')).toHaveTextContent('undefined');
  });
});
