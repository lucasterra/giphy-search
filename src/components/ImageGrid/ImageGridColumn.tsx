import styled from '@emotion/styled';

interface ImageGridColumnProps {
  width?: number;
  spacing?: number;
}

export const ImageGridColumn = styled('div', {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'spacing',
})<ImageGridColumnProps>(
  ({ spacing = 0 }) => ({ padding: spacing, boxSizing: 'border-box' }),
  (props) =>
    props.width && {
      flexBasis: `${props.width}%`,
      width: `${props.width}%`,
      overflow: 'hidden',
    }
);
