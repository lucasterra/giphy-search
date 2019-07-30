import React, {
  forwardRef,
  useMemo,
  HTMLAttributes,
  DetailedHTMLProps,
} from 'react';
import { imageGridContext, ImageGridContextProps } from './context';
import { ImageGridRoot } from './ImageGridRoot';

const { Provider } = imageGridContext;

export interface ImageGridProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode | React.ReactNodeArray;
  numOfColumns?: number;
  spacing?: number;
}

export const ImageGrid = forwardRef<HTMLDivElement, ImageGridProps>(
  ({ numOfColumns = 1, spacing = 8, ...props }, ref) => {
    const contextValue = useMemo<ImageGridContextProps>(
      () => ({ numOfColumns, spacing }),
      [numOfColumns, spacing]
    );

    return (
      <Provider value={contextValue}>
        <ImageGridRoot spacing={spacing} {...props} ref={ref} />
      </Provider>
    );
  }
);
