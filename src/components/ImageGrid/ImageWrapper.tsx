import styled from '@emotion/styled';

interface ImageWrapperProps {
  spacing?: number;
}

export const ImageWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'spacing',
})<ImageWrapperProps>(
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
