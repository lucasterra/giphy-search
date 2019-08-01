import React, { memo } from 'react';
import { getPlaceholderColor } from './placeholderColor';
import { getMainUrl, getThumbnailUrl, getImageDimensions } from './imageUrls';
import {
  ImageGrid as Grid,
  ProgressiveImage,
} from '../../components/ImageGrid';
import { LayoutMode } from './LayoutSwitcher';
import { GIFObject } from '../../api/GIPHY';

interface ImageGridProps {
  layoutMode: LayoutMode;
  images: GIFObject[];
}

export const ImageGrid = memo<ImageGridProps>(({ layoutMode, images }) => {
  let heights: number[] = [];
  let children: React.ReactNode[] = [];

  images.forEach((img, idx) => {
    const dimensions = getImageDimensions(img, layoutMode);

    heights.push(dimensions.height);
    children.push(
      <ProgressiveImage
        key={img.id}
        alt={img.title}
        thumbSrc={getThumbnailUrl(img, layoutMode)}
        src={getMainUrl(img, layoutMode)}
        backgroundColor={getPlaceholderColor(idx)}
        width={dimensions.width}
        height={dimensions.height}
      />
    );
  });

  return (
    <Grid
      numOfColumns={layoutMode === 'single_column' ? 1 : 3}
      childrenHeights={heights}
      children={children}
    />
  );
});
