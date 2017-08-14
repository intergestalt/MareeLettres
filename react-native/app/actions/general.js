export const SWAP_LANGUAGE = 'SWAP_LANGUAGE';
export const SET_TINDER_MODE = 'SET_TINDER_MODE';

export const swapLanguage = () => ({
  type: SWAP_LANGUAGE,
});

export const setTinderMode = isTinder => ({
  type: SET_TINDER_MODE,
  isTinder,
});
