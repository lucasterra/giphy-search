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

export interface ProgressiveImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  thumbSrc: string;
  backgroundColor: string;
  width?: number;
  height?: number;
}

export const ProgressiveImage = forwardRef<
  HTMLImageElement,
  ProgressiveImageProps
>(({ alt, src, thumbSrc, backgroundColor, width, height, ...props }, ref) => {
  const context = useContext(imageGridContext);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useIsIntersecting(wrapperRef);
  const mainImgLoaded = useImageLoad(src, isVisible);
  const thumbImgLoaded = useImageLoad(thumbSrc, isVisible);

  return (
    <ImageWrapper ref={wrapperRef} spacing={context.spacing}>
      {thumbImgLoaded || mainImgLoaded ? (
        <Image
          data-testid="image"
          alt={alt}
          src={mainImgLoaded && isVisible ? src : thumbSrc}
          {...props}
          ref={ref}
        />
      ) : (
        <Placeholder
          data-testid="placeholder"
          style={{
            paddingTop: width && height ? `${height / (width / 100)}%` : '75%',
            backgroundColor,
          }}
        />
      )}
    </ImageWrapper>
  );
});
