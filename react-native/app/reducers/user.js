import {
  USER_SET_ID,
  USER_SET_COORDINATES,
  USER_SET_SECONDARY_LETTERS,
  USER_SET_PRIMARY_LETTER,
  USER_DELETE_LETTERS,
  USER_UPDATE_ERROR,
} from '../actions/user';

import initialState from '../config/initialState';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case USER_SET_ID:
      console.log('Reducer: USER_SET_ID');
      return state;

    case USER_SET_COORDINATES:
      console.log('Reducer: USER_SET_COORDINATES');
      return state;

    case USER_SET_PRIMARY_LETTER:
      console.log('Reducer: USER_SET_PRIMARY_LETTER');
      return state;

    case USER_SET_SECONDARY_LETTERS:
      console.log('Reducer: USER_SET_SECONDARY_LETTERS');
      return state;

    case USER_DELETE_LETTERS:
      console.log('Reducer: USER_DELETE_LETTERS');
      return {
        ...state,
        secondary_letters: [],
      };

    case USER_UPDATE_ERROR:
      console.log('Reducer: USER_UPDATE_ERROR')
      return state;

    default:
      return state;
  }
};
