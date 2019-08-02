import React from 'react';
import {
  render,
  act,
  waitForElement,
  waitForDomChange,
} from '@testing-library/react';
import { ProgressiveImage } from '../ProgressiveImage';
import {
  MockedIntersectionObserver,
  mockScroll,
} from '../../../hooks/tests/mocks/MockedIntersectionObserver';

const thumbSrc = 'https://example.com/thumb_image.jpg';
const mainSrc = 'https://example.com/main_image.jpg';
const imagesStartingLoad: string[] = [];

describe('ProgressiveImage', () => {
  let loadThumbImg: any = null;
  let loadMainImg: any = null;

  beforeAll(() => {
    (global as any).IntersectionObserver = MockedIntersectionObserver;

    Object.defineProperty((global as any).Image.prototype, 'src', {
      set(src) {
        imagesStartingLoad.push(src);

        let self = this;
        if (src === thumbSrc) {
          loadThumbImg = () => {
            self.onload();
          };
        } else if (src === mainSrc) {
          loadMainImg = () => {
            self.onload();
          };
        }
      },
    });
  });

  test('it runs as expected: placeholder -> thumbImg -> mainImg', async () => {
    const { queryByTestId, getByTestId } = render(
      <ProgressiveImage
        mainSrc={[mainSrc]}
        thumbSrc={thumbSrc}
        backgroundColor="#fff"
      />
    );

    // it first renders the placeholder
    expect(queryByTestId('image')).toBeNull();
    expect(queryByTestId('placeholder')).not.toBeNull();

    // after the image is visibile in the screen, we start loading the images
    act(() => {
      mockScroll!(5500);
    });

    expect(imagesStartingLoad).toContain(mainSrc);
    expect(imagesStartingLoad).toContain(thumbSrc);
    expect(queryByTestId('image')).toBeNull();
    expect(queryByTestId('placeholder')).not.toBeNull();

    // then, after thumb is loaded, is renders an image
    act(() => {
      loadThumbImg();
    });

    const image = await waitForElement(() => queryByTestId('image'));

    expect(image).not.toBeNull();
    expect(image).toHaveAttribute('src', thumbSrc);
    expect(queryByTestId('placeholder')).toBeNull();

    // finally, after src is loaded, is renders the main image
    act(() => {
      loadMainImg();
    });

    await waitForDomChange({ container: getByTestId('image') });

    expect(image).not.toBeNull();
    expect(image).toHaveAttribute('src', mainSrc);
    expect(queryByTestId('placeholder')).toBeNull();

    // oh, after the image is out of sight, render the thumb image again
    act(() => {
      mockScroll!(0);
    });

    expect(queryByTestId('image')).not.toBeNull();
    expect(queryByTestId('image')).toHaveAttribute('src', thumbSrc);
    expect(queryByTestId('placeholder')).toBeNull();
  });

  test('placeholder will maintains the aspect ratio if you pass width/height', () => {
    const { queryByTestId } = render(
      <ProgressiveImage
        mainSrc={[mainSrc]}
        thumbSrc={thumbSrc}
        backgroundColor="#fff"
        width={50}
        height={30}
      />
    );

    expect(queryByTestId('placeholder')).toHaveAttribute(
      'style',
      'padding-top: 60%; background-color: rgb(255, 255, 255);'
    );
  });
});
