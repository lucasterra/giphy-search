import React from 'react';
import styled from '@emotion/styled';
import { Button } from '../../components/Button';

export type LayoutMode = 'single_column' | 'three_column';

interface LayoutSwitcherProps {
  setLayoutMode: (layoutMode: LayoutMode) => void;
  layoutMode: LayoutMode;
}

const Wrapper = styled.div({
  display: 'flex',
  paddingTop: 12,
});

export const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({
  setLayoutMode,
  layoutMode,
}) => (
  <Wrapper>
    <Button
      active={layoutMode === 'single_column'}
      onClick={() => setLayoutMode('single_column')}
    >
      Single column
    </Button>
    <Button
      active={layoutMode === 'three_column'}
      onClick={() => setLayoutMode('three_column')}
    >
      Three columns
    </Button>
  </Wrapper>
);
