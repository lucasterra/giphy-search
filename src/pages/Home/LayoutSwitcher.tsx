import React from 'react';
import styled from '@emotion/styled';

export type LayoutMode = 'single_column' | 'three_column';

interface LayoutSwitcherProps {
  setLayoutMode: (layoutMode: LayoutMode) => void;
  layoutMode: LayoutMode;
}

const Wrapper = styled.div({
  display: 'flex',
});

const Button = styled.button({
  flexGrow: 1,
  color: 'white',
});

export const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({
  setLayoutMode,
  layoutMode,
}) => (
  <Wrapper>
    <Button onClick={() => setLayoutMode('single_column')}>1 column</Button>
    <Button onClick={() => setLayoutMode('three_column')}>3 column</Button>
  </Wrapper>
);
