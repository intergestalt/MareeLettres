import { callLetters } from '../helper/apiCalls';

export const LOAD_LETTERS = 'LOAD_LETTERS';
export const SUCCESS_LETTERS = 'SUCCESS_LETTERS';
export const NETWORK_ERROR_LOAD_LETTERS = 'NETWORK_ERROR_LOAD_LETTERS';
export const PUT_LETTER_ON_MAP = 'PUT_LETTER_ON_MAP';
export const PUT_LETTER_ERROR = 'PUT_LETTER_ERROR';

export const loadLetters = () => ({
  type: LOAD_LETTERS,
  successEvent: SUCCESS_LETTERS,
  errorEvent: NETWORK_ERROR_LOAD_LETTERS,
  apiCall: callLetters,
});

export const putLetterOnMap = (character, user) => ({
  type: PUT_LETTER_ON_MAP,
  errorEvent: PUT_LETTER_ERROR,
  character: character,
  user: user,
})
