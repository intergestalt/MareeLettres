import {
  CHANGE_MAP_REGION,
  PUT_LETTER_ON_MAP
} from '../actions/map';

import initialState from '../config/initialState';

const placeLetter = (state, action) => {
  let next = [ ...state.letters.my_letters ];
  next.push({
    _id: state.user.origin_id,
    character: action.character,
    coords: {
      lat: state.user.map.coordinates.latitude,
      lng: state.user.map.coordinates.longitude,
    },
  })

  return {
    ...state,
    letters: {
      ...state.letters,
      my_letters: [ ...next ],
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MAP_REGION:
      console.log('Reducer: CHANGE_MAP_REGION');
      return {
        ...state,
        user: {
          ...state.user,
          map: {
            ...state.user.map,
            coordinates: action.region,
          }
        }
      };
    case PUT_LETTER_ON_MAP:
      console.log('Reducer: PUT_LETTER_ON_MAP');
      return placeLetter(state, action);
    default:
      return state;
  }
}
