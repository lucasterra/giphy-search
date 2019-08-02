import { GIFObject } from '../../api/GIPHY/schema';
import { LayoutMode } from './LayoutSwitcher';

export function getMainUrl(img: GIFObject, layoutMode: LayoutMode) {
  return layoutMode === 'single_column'
    ? [
        img.images.fixed_height.webp,
        img.images.fixed_height.mp4,
        img.images.fixed_height.url,
      ]
    : [
        img.images.fixed_width.webp,
        img.images.fixed_width.mp4,
        img.images.fixed_width.url,
      ];
}

export function getThumbnailUrl(img: GIFObject, layoutMode: LayoutMode) {
  return layoutMode === 'single_column'
    ? img.images.fixed_height_still.url
    : img.images.fixed_width_still.url;
}

export function getImageDimensions(img: GIFObject, layoutMode: LayoutMode) {
  const selected =
    layoutMode === 'single_column'
      ? img.images.fixed_height
      : img.images.fixed_width;

  return {
    width: parseInt(selected.width, 10) || 0,
    height: parseInt(selected.height, 10) || 0,
  };
}
