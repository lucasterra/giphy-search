import React, {
  forwardRef,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useContext,
  useRef,
} from 'react';
import styled from '@emotion/styled';
import { imageGridContext } from './context';
import { ImageWrapper } from './ImageWrapper';
import { useIsIntersecting } from '../../hooks/useIntersectionObserver';
import { useImageLoad } from '../../hooks/useImageLoad';

const Image = styled.img({
  width: '100%',
  height: 'auto',
});

const Placeholder = styled.div({
  width: '100%',
});

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
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const isVisible = useIsIntersecting(wrapperRef);
    const mainImgLoaded = useImageLoad(mainSrc, isVisible);
    const thumbImgLoaded = useImageLoad([thumbSrc], isVisible);

    return (
      <ImageWrapper ref={wrapperRef} spacing={context.spacing}>
        {thumbImgLoaded || mainImgLoaded ? (
          <Image
            data-testid="image"
            alt={alt}
            src={mainImgLoaded && isVisible ? mainImgLoaded : thumbImgLoaded}
            {...props}
            ref={ref}
          />
        ) : (
          <Placeholder
            data-testid="placeholder"
            style={{
              paddingTop:
                width && height ? getPlaceholderPadding(width, height) : '75%',
              backgroundColor,
            }}
          />
        )}
      </ImageWrapper>
    );
  }
);
