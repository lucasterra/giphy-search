import styled from '@emotion/styled';

interface ImageWrapperProps {
  width?: number;
  spacing?: number;
  backgroundColor?: string;
}

export const ImageWrapper = styled('div')<ImageWrapperProps>(
  {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'self-start',
    justifyContent: 'center',
    width: '100%',
    height: 0,
    paddingBottom: '75%',
  },
  ({ backgroundColor }) =>
    backgroundColor && {
      backgroundColor,
    }
);
