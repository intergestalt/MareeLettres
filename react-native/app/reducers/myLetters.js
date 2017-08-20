import {
  CHANGE_MAP_REGION,
  PUT_LETTER_ON_MAP,
  LOAD_MY_LETTERS
} from '../actions/map';

import initialState from '../config/initialState';

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
      return {
        ...state,
        content: [
          ...state.content,
          {
            _id: 'temp_id',
            character: action.character,
            coords: {
              lat: 52.4972,
              lng: 13.4377,
            },
          }
        ]
      };

    default:
      return state;
  }
};
