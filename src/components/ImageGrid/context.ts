import { createContext } from 'react';

export interface ImageGridContextProps {
  numOfColumns: number;
  spacing: number;
}

export const imageGridContext = createContext({ numOfColumns: 1, spacing: 8 });
