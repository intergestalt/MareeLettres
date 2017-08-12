import { callLetters } from '../helper/apiCalls';

export const LOAD_LETTERS = 'LOAD_LETTERS';
export const SUCCESS_LETTERS = 'SUCCESS_LETTERS';
export const NETWORK_ERROR_LOAD_LETTERS = 'NETWORK_ERROR_LOAD_LETTERS';

export const loadLetters = () => ({
  type: LOAD_LETTERS,
  successEvent: SUCCESS_LETTERS,
  errorEvent: NETWORK_ERROR_LOAD_LETTERS,
  apiCall: callLetters,
});
