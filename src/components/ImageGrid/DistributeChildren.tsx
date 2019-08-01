import React, { memo } from 'react';
import { ImageGridColumn } from './ImageGridColumn';
import PriorityQueue from 'tinyqueue';

interface DistributeChildrenProps {
  numOfColumns: number;
  spacing: number;
  childrenHeights?: number[];
  children: React.ReactNode[];
}

export function distributeOnHeight(
  children: React.ReactNode[],
  childrenHeights: number[],
  numOfColumns: number
) {
  // distribute based on height
  const queue = new PriorityQueue<{ height: number; index: number }>(
    [],
    (a, b) => {
      if (a.height === b.height) {
        return a.index - b.index;
      }
      return a.height - b.height;
    }
  );

  let columns: React.ReactNode[][] = [];
  for (let i = 0; i < numOfColumns; i++) {
    columns[i] = [];
    queue.push({ height: 0, index: i });
  }

  children.forEach((child, idx) => {
    const next = queue.pop();
    if (!next) {
      return;
    }

    const { index: columnIndex, height } = next;

    columns[columnIndex].push(child);
    queue.push({
      height: height + childrenHeights[idx],
      index: columnIndex,
    });
  });

  return columns;
}

export function distributeEvenly(
  children: React.ReactNode[],
  numOfColumns: number
) {
  let columns: React.ReactNode[][] = [];
  for (let i = 0; i < numOfColumns; i++) {
    columns[i] = [];
  }

  // just distribute evenly
  children.forEach((child, idx) => {
    columns[idx % numOfColumns].push(child);
  });

  return columns;
}

export const DistributeChildren = memo<DistributeChildrenProps>((props) => {
  const { children, childrenHeights, numOfColumns, spacing } = props;

  if (numOfColumns < 2) {
    return (
      <ImageGridColumn width={100} spacing={spacing}>
        {children}
      </ImageGridColumn>
    );
  }

  let columns: React.ReactNode[][];
  if (childrenHeights && childrenHeights.length === children.length) {
    columns = distributeOnHeight(children, childrenHeights, numOfColumns);
  } else {
    columns = distributeEvenly(children, numOfColumns);
  }

  return (
    <>
      {columns.map((column, idx) => (
        <ImageGridColumn
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
