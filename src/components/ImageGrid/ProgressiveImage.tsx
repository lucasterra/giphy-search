import React, {
  forwardRef,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useContext,
  useRef,
} from 'react';
import { imageGridContext } from './context';
import { ImageRoot } from './ImageRoot';
import { ImageGridItem } from './ImageGridItem';
import { ImageWrapper } from './ImageWrapper';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useImageLoad } from '../../hooks/useImageLoad';

export interface ProgressiveImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  thumbSrc: string;
  backgroundColor: string;
}

export const ProgressiveImage = forwardRef<
  HTMLImageElement,
  ProgressiveImageProps
>(({ alt, src, thumbSrc, backgroundColor, ...props }, ref) => {
  const context = useContext(imageGridContext);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isIntersecting = useIntersectionObserver(wrapperRef);
  const loaded = useImageLoad(src, isIntersecting);
  const thumbLoaded = useImageLoad(thumbSrc, isIntersecting);

  return (
    <ImageGridItem width={100 / context.numOfColumns} spacing={context.spacing}>
      <ImageWrapper
        ref={wrapperRef}
        backgroundColor={thumbLoaded ? undefined : backgroundColor}
      >
        {isIntersecting || loaded ? (
          <ImageRoot
            alt={alt}
            src={loaded ? src : thumbSrc}
            {...props}
            ref={ref}
          />
        ) : (
          <div />
        )}
      </ImageWrapper>
    </ImageGridItem>
  );
});
