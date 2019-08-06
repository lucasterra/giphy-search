import React from 'react';
import { render } from '@testing-library/react';
import { ImageGrid } from '../ImageGrid';
import '@testing-library/react/cleanup-after-each';

const images = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];
const imageHeights = [
  56,
  61,
  62,
  48,
  30,
  74,
  23,
  26,
  56,
  33,
  27,
  35,
  31,
  55,
  34,
  24,
  64,
  46,
  31,
  78,
];

describe('ImageGrid', () => {
  describe('with heights', () => {
    it('renders 3 columns correctly', () => {
      const { getByTestId } = render(
        <ImageGrid childrenHeights={imageHeights} spacing={10} numOfColumns={3}>
          {images.map((img, idx) => (
            <div key={`${idx}/${3}`}>{String(img)}|</div>
          ))}
        </ImageGrid>
      );

      const firstColumn = getByTestId('column-0');
      expect(firstColumn).toHaveTextContent('1|4|8|10|12|16|17|');

      const secondColumn = getByTestId('column-1');
      expect(secondColumn).toHaveTextContent('2|5|7|9|14|18|');

      const thirdColumn = getByTestId('column-2');
      expect(thirdColumn).toHaveTextContent('3|6|11|13|15|19|20|');
    });

    it('renders 1 column correctly', () => {
      const { getByTestId } = render(
        <ImageGrid childrenHeights={imageHeights}>
          {images.map((img, idx) => (
            <div key={`${idx}/${3}`}>{String(img)}|</div>
          ))}
        </ImageGrid>
      );

      const firstColumn = getByTestId('column-0');
      expect(firstColumn).toHaveTextContent(
        '1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|'
      );
    });
  });

  describe('without heights', () => {
    it('renders 3 columns correctly', () => {
      const { getByTestId } = render(
        <ImageGrid spacing={10} numOfColumns={3}>
          {images.map((img, idx) => (
            <div key={`${idx}/${3}`}>{String(img)}|</div>
          ))}
        </ImageGrid>
      );

      const firstColumn = getByTestId('column-0');
      expect(firstColumn).toHaveTextContent('1|4|7|10|13|16|19|');

      const secondColumn = getByTestId('column-1');
      expect(secondColumn).toHaveTextContent('2|5|8|11|14|17|20');

      const thirdColumn = getByTestId('column-2');
      expect(thirdColumn).toHaveTextContent('3|6|9|12|15|18|');
    });

    it('renders 1 column correctly', () => {
      const { getByTestId } = render(
        <ImageGrid numOfColumns={1}>
          {images.map((img, idx) => (
            <div key={`${idx}/${3}`}>{String(img)}|</div>
          ))}
        </ImageGrid>
      );

      const firstColumn = getByTestId('column-0');
      expect(firstColumn).toHaveTextContent(
        '1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|'
      );
    });
  });
});
