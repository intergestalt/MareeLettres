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

      let user = store.getState().user;
      let c = user.map.coordinates;

      const lat = c.latitude + action.y * c.latitudeDelta;
      const lng = c.longitude + action.x * c.longitudeDelta;

      console.log(action, lat, lng)

      return {
        ...state,
        content: [
          ...state.content,
          {
            _id: 'temp_id',
            character: action.character,
            coords: {
              lat: lat,
              lng: lng,
            },
          }
        ]
      };

    default:
      return state;
  }
};
