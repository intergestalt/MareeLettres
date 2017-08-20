import {
  LOAD_LETTERS,
  SUCCESS_LETTERS,
  NETWORK_ERROR_LOAD_LETTERS,
  PUT_LETTER_ERROR,
} from '../actions/letters';

import initialState from '../config/initialState';

const letters = (state = initialState.letters, action) => {
  switch (action.type) {


    case LOAD_LETTERS:
      console.log('Reducer: LOAD_LETTERS');
      return {
        ...state,
        isLoading: true,
        isInternalLoading: true,
        content: [],
      };

    case SUCCESS_LETTERS:
      console.log('Reducer: SUCCESS_LETTERS');
      return {
        ...state,
        isLoading: false,
        isInternalLoading: false,
        isError: false,
        content: action.result.letters,
      };

    case NETWORK_ERROR_LOAD_LETTERS:
      console.log('Reducer: NETWORK_ERROR_LOAD_LETTERS');
      return {
        ...state,
        isLoading: false,
        isInternalLoading: false,
        isError: true,
        content: [],
        error: action.error,
      };
    default:
      return state;
  }
};

export default letters;
