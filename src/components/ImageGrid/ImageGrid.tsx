import React, {
  forwardRef,
  useMemo,
  HTMLAttributes,
  DetailedHTMLProps,
  Children,
} from 'react';
import { imageGridContext, ImageGridContextProps } from './context';
import { GridRoot } from './styledComponents';
import { MasonryGrid } from './MasonryGrid';

const { Provider } = imageGridContext;

export interface ImageGridProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode | React.ReactNodeArray;
  childrenHeights?: number[];
  numOfColumns?: number;
  spacing?: number;
}

export const ImageGrid = forwardRef<HTMLDivElement, ImageGridProps>(
  (
    { numOfColumns = 1, spacing = 8, children, childrenHeights, ...props },
    ref
  ) => {
    const contextValue = useMemo<ImageGridContextProps>(
      () => ({ numOfColumns, spacing }),
      [numOfColumns, spacing]
    );

    return (
      <Provider value={contextValue}>
        <GridRoot spacing={spacing} {...props} ref={ref}>
          <MasonryGrid childrenHeights={childrenHeights}>
            {Children.toArray(children)}
          </MasonryGrid>
        </GridRoot>
      </Provider>
    );
  }
);
