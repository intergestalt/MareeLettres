import { GET_USER_ID, GET_USER_LETTER } from '../actions/user';

import initialState from '../config/initialState';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case GET_USER_ID:
      console.log('GET_USER_ID');
      return state;
    case GET_USER_LETTER:
      console.log('GET_USER_LETTER');
      return state;
    default:
      return state;
  }
};
