import React, {
  forwardRef,
  useMemo,
  HTMLAttributes,
  DetailedHTMLProps,
  Children,
} from 'react';
import { imageGridContext, ImageGridContextProps } from './context';
import { ImageGridRoot } from './ImageGridRoot';
import { DistributeChildren } from './DistributeChildren';

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
        <ImageGridRoot spacing={spacing} {...props} ref={ref}>
          <DistributeChildren
            numOfColumns={numOfColumns}
            spacing={spacing}
            childrenHeights={childrenHeights}
          >
            {Children.toArray(children)}
          </DistributeChildren>
        </ImageGridRoot>
      </Provider>
    );
  }
);
