export const SWAP_LANGUAGE = 'SWAP_LANGUAGE';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const swapLanguage = () => ({
  type: SWAP_LANGUAGE,
});
export const setLanguage = language => ({
  type: SET_LANGUAGE,
  language,
});
