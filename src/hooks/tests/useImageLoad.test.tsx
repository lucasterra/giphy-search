import React from 'react';
import { render, waitForDomChange, act, wait } from '@testing-library/react';
import { useImageLoad } from '../useImageLoad';
import '@testing-library/react/cleanup-after-each';

const DumbImage: React.FC<{ src: string[] | string; enabled: boolean }> = ({
  src,
  enabled,
}) => {
  const loaded = useImageLoad(Array.isArray(src) ? src : [src], enabled);

  return <div data-testid="img">{String(loaded)}</div>;
};

const webpImage = 'https://example.com/image.webp';
const jpgImage = 'https://example.com/image.jpg';
const badImage = 'https://example.com/fake_image.jpg';

describe('useImageLoad hook', () => {
  beforeAll(() => {
    // Mocking Image.prototype.src to call the onload or onerror
    // callbacks depending on the src passed to it
    Object.defineProperty((global as any).Image.prototype, 'src', {
      // Define the property setter
      set(src) {
        if (src === jpgImage || src === webpImage) {
          this.onload();
        } else {
          // do not load...
          this.onerror();
        }
      },
    });
  });

  test('hook disabled', () => {
    const ret = render(<DumbImage src={jpgImage} enabled={false} />);

    expect(ret.getByTestId('img')).toHaveTextContent('undefined');
  });

  test('hook enabled', async () => {
    const ret = render(<DumbImage src={jpgImage} enabled={true} />);

    await waitForDomChange({ container: ret.getByTestId('img') });

    expect(ret.getByTestId('img')).toHaveTextContent(jpgImage);
  });

  test('hook enabled, with fallback, webp not available', async () => {
    const ret = render(
      <DumbImage src={[webpImage, jpgImage]} enabled={true} />
    );

    await waitForDomChange({ container: ret.getByTestId('img') });

    expect(ret.getByTestId('img')).toHaveTextContent(jpgImage);
  });

  test('hook enabled, with fallback, webp enabled', async () => {
    let resolveCreateBitmap: any;
    let resolveFetch: any;
    (global as any).createImageBitmap = () =>
      new Promise((_resolve) => {
        resolveCreateBitmap = _resolve;
      });
    (global as any).fetch = () =>
      new Promise((_resolve) => {
        resolveFetch = _resolve;
      });

    const ret = render(
      <DumbImage src={[webpImage, jpgImage]} enabled={true} />
    );

    await act(async () => {
      resolveFetch({ blob: () => 'some blob' });
      await wait();
      resolveCreateBitmap();
    });

    expect(ret.getByTestId('img')).toHaveTextContent(webpImage);
  });

  test("hook enabled, image won't load", () => {
    const ret = render(<DumbImage src={badImage} enabled={true} />);

    expect(ret.getByTestId('img')).toHaveTextContent('undefined');
  });
});
