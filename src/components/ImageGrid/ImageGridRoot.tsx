import styled from '@emotion/styled';

interface ImageGridRootProps {
  spacing?: number;
}

export const ImageGridRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'spacing',
})<ImageGridRootProps>(({ spacing = 0 }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: `calc(100% + ${spacing * 2}px)`,
  margin: -spacing,
  padding: `${spacing * 2}px 0`,
}));
