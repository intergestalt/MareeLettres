import {
  LOAD_LETTERS,
  SUCCESS_LETTERS,
  NETWORK_ERROR_LOAD_LETTERS,
  PUT_LETTER_ON_MAP
} from '../actions/letters';

import initialState from '../config/initialState';

const placeLetter = (state, character, user) => {
  let success = false;
  let letters = [...state.content];

  // letter exists, move it

  for (var i=0; i<letters.length; i+=1) {
    if (letters[i]._id === user.origin_id && letters[i].character === character) {
      success = true;
      letters[i].coords = user.map.coords;
      break;
    }
  }

  // letter does not yet exist, push to array

  if (!success) {
    letters.unshift({
      _id: user.origin_id,
      character: character,
      coords: user.map.coords,
    })
  }

  return {
    ...state,
    content: letters,
  }
};

export default (state = initialState.letters, action) => {
  switch (action.type) {
    case PUT_LETTER_ON_MAP:
      console.log('Reducer: PUT_LETTER_ON_MAP');
      return placeLetter(state, action.character, action.user);

    case LOAD_LETTERS:
      console.log('Nuke letters array.');
      return {
        isLoading: true,
        isInternalLoading: true,
        isError: false,
        content: [],
      };

    case SUCCESS_LETTERS:
      console.log('LETTERS LOADED.');
      return {
        isLoading: false,
        isInternalLoading: false,
        isError: false,
        content: action.result.letters,
      };

    case NETWORK_ERROR_LOAD_LETTERS:
      console.log('NETWORK ERROR LETTERS');
      return {
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
