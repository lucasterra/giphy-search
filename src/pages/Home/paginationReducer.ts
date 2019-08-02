import { Root } from '../../api/GIPHY';

// Update the search input
export const SET_TEXT = 'SET_TEXT';

// Fetch more images with infinite scrolling
export const NEXT_PAGE = 'NEXT_PAGE';

// Fetching failed, for some reason
export const SET_ERROR = 'SET_ERROR';

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

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: { message: string; status: string };
}

export type Action =
  | SetTextAction
  | NextPageAction
  | SetImageDataAction
  | SetErrorAction;

// State
export interface ReducerState {
  text: string;
  page: number;
  isLoading: boolean;
  error: { message: string; status: string } | null;
  imageData: Root | null;
}

export const reducer = (state: ReducerState, action: Action) => {
  switch (action.type) {
    case NEXT_PAGE:
      return { ...state, page: state.page + 1, isLoading: true, error: null };
    case SET_TEXT:
      return {
        ...state,
        page: 0,
        text: action.payload,
        isLoading: true,
        error: null,
      };
    case SET_IMAGE_DATA:
      return { ...state, imageData: action.payload, isLoading: false };
    case SET_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
