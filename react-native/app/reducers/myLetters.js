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
      let content = [ ...state.content ];
      let match = false;
      
      for (var i=0; i<content.length; i+=1) {
        // TODO replace origin_id with transaction_id

        if (content[i]._id === user.origin_id && content[i].character === action.character) {
          match = true;
          content[i].coords.lat = lat;
          content[i].coords.lng = lng;
          break;
        }
      }

      // add new letter
      if (!match) {
        content.push({
          _id: user.origin_id,
          character: action.character,
          coords: {
            lat: lat,
            lng: lng,
          }
        });
      }

      return {
        ...state,
        content: [
          ...content
        ]
      };

    default:
      return state;
  }
};
