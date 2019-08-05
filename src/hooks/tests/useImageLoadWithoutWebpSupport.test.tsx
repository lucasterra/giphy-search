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

describe('useImageLoad hook, without webp support', () => {
  let resolveCreateBitmap: any;
  beforeAll(() => {
    (global as any).createImageBitmap = () =>
      new Promise((_resolve, _reject) => {
        resolveCreateBitmap = _reject;
      });
  });

  test('hook enabled, with fallback, webp disabled', async () => {
    const ret = render(
      <DumbImage src={[webpImage, jpgImage]} enabled={true} />
    );

    await act(async () => {
      await wait();
      resolveCreateBitmap();
    });

    expect(ret.getByTestId('img')).toHaveTextContent(jpgImage);
  });
});
