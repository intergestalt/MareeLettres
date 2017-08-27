import { CHANGE_MAP_REGION, PUT_LETTER_ON_MAP, LOAD_MY_LETTERS } from '../actions/map';

import initialState from '../config/initialState';
import store from '../config/store';

export default (state = initialState.myLetters, action) => {
  try {
    switch (action.type) {
      case LOAD_MY_LETTERS: {
        console.log('Reducer: LOAD_MY_LETTERS');
        return {
          ...state,
          isLoading: true,
        };
      }

      case PUT_LETTER_ON_MAP: {
        console.log('Reducer: PUT_LETTER_ON_MAP');

        const user = store.getState().user;

        return {
          ...state,
          content: [
            ...state.content,
            {
              _id: user.origin_id,
              character: action.character,
              coords: {
                lat: action.x,
                lng: action.y,
              },
            },
          ],
        };
      }

      default:
        return state;
    }
  } catch (e) {
    console.log('Reducer myLetters');
    console.log(e);
    throw e;
  }
};
