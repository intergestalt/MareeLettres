import { LOAD_LETTERS, SUCCESS_LETTERS, NETWORK_ERROR_LOAD_LETTERS } from '../actions/letters';

import initialState from '../config/initialState';

export default (state = initialState.letters, action) => {
  switch (action.type) {
    case LOAD_LETTERS:
      console.log('Nuke letters array.');
      return {
        isLoading: true,
        isError: false,
        content: [],
      };
    
    case SUCCESS_LETTERS:
      console.log('LETTERS LOADED.');
      return {
        isLoading: false,
        isError: false,
        content: action.result.letters,
      };

    case NETWORK_ERROR_LOAD_LETTERS:
      console.log('NETWORK ERROR LETTERS');
      return {
        isLoading: false,
        isError: true,
        content: [],
        error: action.error,
      };
    default:
      return state;
  }
};
