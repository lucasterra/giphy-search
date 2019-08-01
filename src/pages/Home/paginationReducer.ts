import { Root } from '../../api/GIPHY';

// Update the search input
export const SET_TEXT = 'SET_TEXT';

// Fetch more images with infinite scrolling
export const NEXT_PAGE = 'NEXT_PAGE';

// Set image data, the data returned from GIPHY
export const SET_IMAGE_DATA = 'SET_IMAGE_DATA';

// Actions
interface SetTextAction {
  type: typeof SET_TEXT;
  payload: string;
}

interface NextPageAction {
  type: typeof NEXT_PAGE;
}

interface SetImageDataAction {
  type: typeof SET_IMAGE_DATA;
  payload: Root | null;
}

export type Action = SetTextAction | NextPageAction | SetImageDataAction;

// State
export interface ReducerState {
  text: string;
  page: number;
  isLoading: boolean;
  imageData: Root | null;
}

export const reducer = (state: ReducerState, action: Action) => {
  switch (action.type) {
    case NEXT_PAGE:
      return { ...state, page: state.page + 1, isLoading: true };
    case SET_TEXT:
      return { ...state, page: 0, text: action.payload, isLoading: true };
    case SET_IMAGE_DATA:
      return { ...state, imageData: action.payload, isLoading: false };
    default:
      return state;
  }
};
