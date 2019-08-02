import { getImageDimensions, getMainUrl, getThumbnailUrl } from '../imageUrls';
import kittenFirstPage from './fixtures/kitten_0.json';
import { GIFObject } from '../../../api/GIPHY';

const imgData: GIFObject = kittenFirstPage.data[0] as any;

test('getMainUrl', () => {
  expect(getMainUrl(imgData, 'single_column')).toMatchInlineSnapshot(`
    Array [
      "https://media3.giphy.com/media/VIPdgcooFJHtC/200.webp",
      "https://media3.giphy.com/media/VIPdgcooFJHtC/200.mp4",
      "https://media3.giphy.com/media/VIPdgcooFJHtC/200.gif",
    ]
  `);

  expect(getMainUrl(imgData, 'three_column')).toMatchInlineSnapshot(`
    Array [
      "https://media3.giphy.com/media/VIPdgcooFJHtC/200w.webp",
      "https://media3.giphy.com/media/VIPdgcooFJHtC/200w.mp4",
      "https://media3.giphy.com/media/VIPdgcooFJHtC/200w.gif",
    ]
  `);
});

test('getThumbnailUrl', () => {
  expect(getThumbnailUrl(imgData, 'single_column')).toMatchInlineSnapshot(
    `"https://media3.giphy.com/media/VIPdgcooFJHtC/200_s.gif"`
  );

  expect(getThumbnailUrl(imgData, 'three_column')).toMatchInlineSnapshot(
    `"https://media3.giphy.com/media/VIPdgcooFJHtC/200w_s.gif"`
  );
});

test('getImageDimensions', () => {
  expect(getImageDimensions(imgData, 'single_column')).toMatchInlineSnapshot(`
        Object {
          "height": 200,
          "width": 257,
        }
    `);

  expect(getImageDimensions(imgData, 'three_column')).toMatchInlineSnapshot(`
        Object {
          "height": 156,
          "width": 200,
        }
    `);
});
