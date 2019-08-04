import styled from '@emotion/styled';

interface GridRootProps {
  spacing?: number;
}

export const GridRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'spacing',
})<GridRootProps>(({ spacing = 0 }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: `calc(100% + ${spacing * 2}px)`,
  margin: -spacing,
  padding: `${spacing * 2}px 0`,
}));

interface GridColumnProps {
  width?: number;
  spacing?: number;
}

export const GridColumn = styled('div', {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'spacing',
})<GridColumnProps>(
  ({ spacing = 0 }) => ({ padding: spacing, boxSizing: 'border-box' }),
  (props) =>
    props.width && {
      flexBasis: `${props.width}%`,
      width: `${props.width}%`,
      overflow: 'hidden',
    }
);
