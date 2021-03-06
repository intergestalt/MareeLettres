import {
  CHANGE_MAP_REGION,
  PUT_LETTER_ON_MAP,
  LOAD_MY_LETTERS,
  SET_MY_LETTERS_IS_LOADING_FROM_STORAGE,
  SET_MY_LETTERS,
  CLEAR_MY_LETTERS,
} from '../actions/map';

import initialState from '../config/initialState';
import store from '../config/store';
import { saveMyLettersToStorage } from '../helper/localStorage';

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
        let newContent = {...state.content};
        let id = user.origin_id + '_' + Object.keys(newContent).length;

        newContent[id] = {
          _id: user.origin_id,
          character: action.character,
          coords: {
            lat: action.x,
            lng: action.y,
          },
          created_at: new Date().toISOString(),
        };
        const result = {
          ...state,
          content: newContent,
        };
        saveMyLettersToStorage(result);
        return result;
      }
      case CLEAR_MY_LETTERS: {
        console.log('Reducer: CLEAR_MY_LETTERS');

        const result = {
          ...state,
          content: {},
        };
        saveMyLettersToStorage(result);
        return result;
      }
      case SET_MY_LETTERS: {
        const myLetters = action.myLetters;
        return myLetters;
      }
      // Redux local storage
      case SET_MY_LETTERS_IS_LOADING_FROM_STORAGE: {
        return { ...state, myLettersIsLoadingFromStorage: action.yes };
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
