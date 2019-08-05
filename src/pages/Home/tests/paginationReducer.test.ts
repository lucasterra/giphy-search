import {
  reducer,
  NEXT_PAGE,
  SET_ERROR,
  SET_IMAGE_DATA,
  SET_TEXT,
  ReducerState,
} from '../paginationReducer';

describe('paginationReducer', () => {
  let state: ReducerState = {
    text: '',
    page: 0,
    isLoading: false,
    imageData: null,
    error: null,
  };
  const dispatch = (action: any) => {
    state = reducer(state, action);
  };

  test('SET_TEXT', () => {
    dispatch({ type: SET_TEXT, payload: 'hellow' });
    expect(state.text).toBe('hellow');
    expect(state.isLoading).toBe(true);
    expect(state.page).toBe(0);

    dispatch({ type: SET_TEXT, payload: 'world' });
    expect(state.text).toBe('world');

    dispatch({ type: SET_TEXT, payload: '' });
    expect(state.text).toBe('');
  });

  test('NEXT_PAGE', () => {
    dispatch({ type: NEXT_PAGE });
    expect(state.page).toBe(1);

    dispatch({ type: NEXT_PAGE });
    expect(state.page).toBe(2);
  });

  test('SET_TEXT again', () => {
    dispatch({ type: SET_TEXT, payload: 'something' });
    expect(state.page).toBe(0);
    expect(state.text).toBe('something');
  });

  test('SET_IMAGE_DATA', () => {
    dispatch({ type: SET_IMAGE_DATA, payload: { data: true } });
    expect(state.imageData).toEqual({ data: true });
    expect(state.isLoading).toBe(false);
  });

  test('SET_ERROR', () => {
    dispatch({ type: NEXT_PAGE });
    expect(state.page).toBe(1);
    expect(state.isLoading).toBe(true);

    dispatch({
      type: SET_ERROR,
      payload: { message: 'bad error', status: 'really bad' },
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual({ message: 'bad error', status: 'really bad' });
  });

  test('UNKNOWN_ACTION', () => {
    const curState = state;
    dispatch({ type: 'UNKNOWN_ACTION' });
    expect(state).toBe(curState);
  });
});
