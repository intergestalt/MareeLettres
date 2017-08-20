import {
  LOAD_LETTERS,
  SUCCESS_LETTERS,
  NETWORK_ERROR_LOAD_LETTERS,
} from '../actions/letters';

import initialState from '../config/initialState';

const letters = (state = initialState.letters, action) => {
  switch (action.type) {
    case LOAD_LETTERS:
      console.log('Nuke letters array.');
      return {
        ...state,
        isLoading: true,
        isInternalLoading: true,
        isError: false,
        content: [],
      };

    case SUCCESS_LETTERS:
      console.log('LETTERS LOADED.');
      return {
        ...state,
        isLoading: false,
        isInternalLoading: false,
        isError: false,
        content: action.result.letters,
      };

    case NETWORK_ERROR_LOAD_LETTERS:
      console.log('NETWORK ERROR LETTERS');
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
