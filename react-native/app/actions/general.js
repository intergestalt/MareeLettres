export const SWAP_LANGUAGE = 'SWAP_LANGUAGE';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_GLOBALS = 'SET_GLOBALS';
export const SET_GLOBALS_IS_LOADING_FROM_STORAGE = 'SET_GLOBALS_IS_LOADING_FROM_STORAGE';
export const SET_NET_WORK_ERROR = 'SET_NET_WORK_ERROR';
export const SET_SCREEN = 'SET_SCREEN';

export const swapLanguage = () => ({
  type: SWAP_LANGUAGE,
});
export const setLanguage = language => ({
  type: SET_LANGUAGE,
  language,
});

export const setGlobals = globals => ({
  type: SET_GLOBALS,
  globals,
});

export const setGlobalsIsLoadingFromStorage = yes => ({
  type: SET_GLOBALS_IS_LOADING_FROM_STORAGE,
  yes,
});

export const setNetworkError = (yes, messageKey) => ({
  type: SET_NET_WORK_ERROR,
  yes,
  messageKey,
});
export const setScreen = screen => ({
  type: SET_SCREEN,
  screen,
});
