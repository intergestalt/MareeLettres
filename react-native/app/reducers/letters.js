import {
  LOAD_LETTERS,
  SUCCESS_LETTERS,
  NETWORK_ERROR_LOAD_LETTERS,
  PUT_LETTER_ERROR,
  SET_LETTERS_IS_LOADING_FROM_STORAGE,
  SET_LETTERS,
} from '../actions/letters';
import { saveLettersToStorage } from '../helper/localStorage';

import initialState from '../config/initialState';

const letters = (state = initialState.letters, action) => {
  try {
    switch (action.type) {
      case LOAD_LETTERS: {
        console.log('Reducer: LOAD_LETTERS');
        return {
          ...state,
          isLoading: true,
          isInternalLoading: true,
        };
      }
      case SUCCESS_LETTERS: {
        console.log('Reducer: SUCCESS_LETTERS');

        let newContent = {...state.content};

        for (let i=0; i<action.result.letters.length; i+=1) {
          if (!newContent[action.result.letters[i]._id]) {
            newContent[action.result.letters[i]._id] = action.result.letters[i];
          }
        }

        const result = {
          ...state,
          isLoading: false,
          isInternalLoading: false,
          content: newContent,
        };
        saveLettersToStorage(result);
        return result;
      }
      case NETWORK_ERROR_LOAD_LETTERS: {
        console.log('Reducer: NETWORK_ERROR_LOAD_LETTERS');
        console.log(action.error);
        return {
          ...state,
          isLoading: false,
          isInternalLoading: false,
        };
      }
      case SET_LETTERS: {
        const myLetters = action.letters;
        return myLetters;
      }
      // Redux local storage
      case SET_LETTERS_IS_LOADING_FROM_STORAGE: {
        return { ...state, lettersIsLoadingFromStorage: action.yes };
      }
      default:
        return state;
    }
  } catch (e) {
    console.log('Reducer letters');
    console.log(e);
    throw e;
  }
};

export default letters;
