import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import {
  DumbImage,
  jpgImage,
  mockImageLoad,
  webpImage,
  badImage,
} from './mocks/ImageLoad';
import '@testing-library/react/cleanup-after-each';

beforeAll(mockImageLoad);

describe('useImageLoad hook, without webp support', () => {
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

  test("hook enabled, image won't load", () => {
    const ret = render(<DumbImage src={badImage} enabled={true} />);

    expect(ret.getByTestId('img')).toHaveTextContent('undefined');
  });
});
