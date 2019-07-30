import styled from '@emotion/styled';

interface ImageGridItemProps {
  width?: number;
  spacing?: number;
}

export const ImageGridItem = styled('div', {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'spacing',
})<ImageGridItemProps>(
  ({ spacing = 0 }) => ({ padding: spacing, boxSizing: 'border-box' }),
  (props) =>
    props.width && {
      flexBasis: `${props.width}%`,
      width: `${props.width}%`,
      overflow: 'hidden',
    }
);
