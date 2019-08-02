import { getPlaceholderColor } from '../placeholderColor';

test('getPlaceholderColor', () => {
  const colors = [];
  for (let i = 0; i < 20; i++) {
    colors.push(getPlaceholderColor(i));
  }

  expect(colors).toMatchInlineSnapshot(`
    Array [
      "#c4b7d2",
      "#9f5a57",
      "#4329ad",
      "#ae2955",
      "#335dad",
      "#60a372",
      "#ad7905",
      "#87cabf",
      "#f2a970",
      "#c4b7d2",
      "#9f5a57",
      "#4329ad",
      "#ae2955",
      "#335dad",
      "#60a372",
      "#ad7905",
      "#87cabf",
      "#f2a970",
      "#c4b7d2",
      "#9f5a57",
    ]
  `);
});
