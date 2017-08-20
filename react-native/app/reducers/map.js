import {
  CHANGE_MAP_REGION,
  PUT_LETTER_ON_MAP
} from '../actions/map';

import initialState from '../config/initialState';

export default (state = initialState.user.map, action) => {
  switch (action.type) {
    case PUT_LETTER_ON_MAP: {
      console.log('Reducer: PUT_LETTER_ON_MAP');
      return state;
    }
    case CHANGE_MAP_REGION:
      console.log('Reducer: CHANGE_MAP_REGION');
      return {
        ...state,
        coordinates: action.region,
      };
    default:
      return state;
  }
}
