import { callLetters, callPostLetter, callLettersInterval } from '../helper/apiCalls';

export const POST_LETTER = 'POST_LETTER';
export const LOAD_LETTERS = 'LOAD_LETTERS';
export const LOAD_LETTERS_INTERVAL = 'LOAD_LETTERS_INTERVAL';
export const SUCCESS_POST_LETTER = 'SUCCESS_POST_LETTER';
export const SUCCESS_LETTERS = 'SUCCESS_LETTERS';
export const SUCCESS_LETTERS_INTERVAL = 'SUCCESS_LETTERS_INTERVAL';
export const NETWORK_ERROR_LOAD_LETTERS = 'NETWORK_ERROR_LOAD_LETTERS';
export const NETWORK_ERROR_LOAD_LETTERS_INTERVAL = 'NETWORK_ERROR_LOAD_LETTERS_INTERVAL';
export const SET_LETTERS = 'SET_LETTERS';
export const SET_LETTERS_IS_LOADING_FROM_STORAGE = 'SET_LETTERS_IS_LOADING_FROM_STORAGE';
export const NETWORK_ERROR_POST_LETTER = 'NETWORK_ERROR_POST_LETTER';

export const loadLettersInterval = () => ({
  type: LOAD_LETTERS_INTERVAL,
  successEvent: SUCCESS_LETTERS_INTERVAL,
  errorEvent: NETWORK_ERROR_LOAD_LETTERS_INTERVAL,
  apiCall: callLettersInterval,
});

export const loadLetters = () => ({
  type: LOAD_LETTERS,
  successEvent: SUCCESS_LETTERS,
  errorEvent: NETWORK_ERROR_LOAD_LETTERS,
  apiCall: callLetters,
});

export const setLetters = letters => ({
  type: SET_LETTERS,
  letters,
});

export const setLettersIsLoadingFromStorage = yes => ({
  type: SET_LETTERS_IS_LOADING_FROM_STORAGE,
  yes,
});

export const postLetter = action => ({
  type: POST_LETTER,
  successEvent: SUCCESS_POST_LETTER,
  errorEvent: NETWORK_ERROR_POST_LETTER,
  body: action,
  apiCall: callPostLetter,
});
