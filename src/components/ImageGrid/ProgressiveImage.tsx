import React, {
  forwardRef,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useContext,
} from 'react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import { imageGridContext } from './context';
import { useImageLoad } from '../../hooks/useImageLoad';
import 'intersection-observer'; // polyfill

const Image = styled.img({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
});

export const Placeholder = styled('div', {
  shouldForwardProp: (prop) => prop !== 'spacing',
})<{ spacing?: number }>(
  {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'self-start',
    justifyContent: 'center',
    width: '100%',
  },
  ({ spacing = 0 }) => ({ marginBottom: spacing * 2 })
);

// Based on this: https://danieljones.design/css-aspect-ratio-calculator/
function getPlaceholderPadding(width: number, height: number) {
  return `${height / (width / 100)}%`;
}

export interface ProgressiveImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  mainSrc: string[];
  thumbSrc: string;
  backgroundColor: string;
  width?: number;
  height?: number;
}

export const ProgressiveImage = forwardRef<
  HTMLImageElement,
  ProgressiveImageProps
>(
  (
    { alt, mainSrc, thumbSrc, backgroundColor, width, height, ...props },
    ref
  ) => {
    const context = useContext(imageGridContext);
    const [wrapperRef, isVisible] = useInView();
    const mainImgLoaded = useImageLoad(mainSrc, isVisible);
    const thumbImgLoaded = useImageLoad([thumbSrc], isVisible);
    const showPlaceholder = !mainImgLoaded && !thumbImgLoaded;

    return (
      <Placeholder
        data-testid="placeholder"
        ref={wrapperRef}
        spacing={context.spacing}
        style={{
          paddingTop:
            width && height ? getPlaceholderPadding(width, height) : '75%',
          backgroundColor,
        }}
      >
        {!showPlaceholder && (
          <Image
            data-testid="image"
            alt={alt}
            src={mainImgLoaded && isVisible ? mainImgLoaded : thumbImgLoaded}
            {...props}
            ref={ref}
          />
        )}
      </Placeholder>
    );
  }
);
