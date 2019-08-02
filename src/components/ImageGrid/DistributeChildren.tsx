import React, { memo, useContext } from 'react';
import { ImageGridColumn } from './ImageGridColumn';
import { imageGridContext } from './context';

interface DistributeChildrenProps {
  childrenHeights?: number[];
  children: React.ReactNode[];
}

export function distributeChildren(
  children: React.ReactNode[],
  numOfColumns: number,
  childrenHeights?: number[]
) {
  // distribute based on height
  const columns: React.ReactNode[][] = [];
  const heights: number[] = [];
  for (let i = 0; i < numOfColumns; i++) {
    columns.push([]);
    heights.push(0); // each column gets a height starting with zero
  }

  children.forEach((child, idx) => {
    const next = heights.indexOf(Math.min(...heights)); // find column with lowest height using Math.min
    heights[next] += childrenHeights ? childrenHeights[idx] : 10; // increase the height there

    columns[next].push(child);
  });

  return columns;
}

export const DistributeChildren = memo<DistributeChildrenProps>((props) => {
  const { numOfColumns, spacing } = useContext(imageGridContext);
  const { children, childrenHeights } = props;

  if (numOfColumns < 2) {
    return (
      <ImageGridColumn data-testid={`column-0`} width={100} spacing={spacing}>
        {children}
      </ImageGridColumn>
    );
  }

  let columns = distributeChildren(children, numOfColumns, childrenHeights);

  return (
    <>
      {columns.map((column, idx) => (
        <ImageGridColumn
          data-testid={`column-${idx}`}
          key={`${idx}/${numOfColumns}`}
          width={100 / numOfColumns}
          spacing={spacing}
        >
          {column}
        </ImageGridColumn>
      ))}
    </>
  );
});
