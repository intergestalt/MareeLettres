import {
  CHANGE_MAP_REGION,
  PUT_LETTER_ON_MAP,
  LOAD_MY_LETTERS
} from '../actions/map';

import initialState from '../config/initialState';
import store from '../config/store';

export default (state = initialState.myLetters, action) => {
  switch (action.type) {
    case LOAD_MY_LETTERS:
      console.log('Reducer: LOAD_MY_LETTERS');
      return {
        ...state,
        isLoading: true,
      };

    case PUT_LETTER_ON_MAP:
      console.log('Reducer: PUT_LETTER_ON_MAP');

      // calculate lat & long
      let user = store.getState().user;
      let c = user.map.coordinates;
      let lat = c.latitude + action.y * c.latitudeDelta;
      let lng = c.longitude + action.x * c.longitudeDelta;

      return {
        ...state,
        content: [
          ...state.content,
          {
            _id: user.origin_id,
            character: action.character,
            coords: {
              lat: lat,
              lng: lng,
            },
            acquired_at: 0,
            last_used_at: (new Date()).toISOString(),
          },
        ]
      };

    default:
      return state;
  }
};
