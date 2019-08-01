// Colors used for placeholders while image is being loaded.
// Each image index will use a different color
export const placeholderColors = [
  '#c4b7d2',
  '#9f5a57',
  '#4329ad',
  '#ae2955',
  '#335dad',
  '#60a372',
  '#ad7905',
  '#87cabf',
  '#f2a970',
];

export function getPlaceholderColor(index: number) {
  return placeholderColors[index % placeholderColors.length];
}
