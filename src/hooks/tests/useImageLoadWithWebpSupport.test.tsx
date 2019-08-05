import React from 'react';
import { render, act, wait } from '@testing-library/react';
import {
  DumbImage,
  jpgImage,
  mockImageLoad,
  webpImage,
} from './mocks/ImageLoad';
import '@testing-library/react/cleanup-after-each';

beforeAll(mockImageLoad);

describe('useImageLoad hook, with webp support', () => {
  let resolveCreateBitmap: any;
  beforeAll(() => {
    (global as any).createImageBitmap = () =>
      new Promise((_resolve) => {
        resolveCreateBitmap = _resolve;
      });
  });

  test('hook enabled, with fallback, webp enabled', async () => {
    const ret = render(
      <DumbImage src={[webpImage, jpgImage]} enabled={true} />
    );

    await act(async () => {
      await wait();
      resolveCreateBitmap();
    });

    expect(ret.getByTestId('img')).toHaveTextContent(webpImage);
  });

  test('render single jpg image', async () => {
    const ret = render(<DumbImage src={jpgImage} enabled={true} />);

    await wait();

    expect(ret.getByTestId('img')).toHaveTextContent(jpgImage);
  });

  test('render single webp image', async () => {
    const ret = render(<DumbImage src={webpImage} enabled={true} />);

    await wait();

    expect(ret.getByTestId('img')).toHaveTextContent(webpImage);
  });

  test('render empty array of images', async () => {
    const ret = render(<DumbImage src={[]} enabled={true} />);

    await wait();

    expect(ret.getByTestId('img')).toHaveTextContent('undefined');
  });
});
