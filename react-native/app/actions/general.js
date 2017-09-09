export const SWAP_LANGUAGE = 'SWAP_LANGUAGE';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_GLOBALS = 'SET_GLOBALS';
export const SET_GLOBALS_IS_LOADING_FROM_STORAGE = 'SET_GLOBALS_IS_LOADING_FROM_STORAGE';
export const SET_NET_WORK_ERROR = 'SET_NET_WORK_ERROR';
export const SET_SCREEN = 'SET_SCREEN';
export const SET_MAP_VIEW = 'SET_MAP_VIEW';
export const SET_SHOW_ALL_FINISHED_CHALLENGES = 'SET_SHOW_ALL_FINISHED_CHALLENGES';
export const SET_LAST_NETWORK_ERROR = 'SET_LAST_NETWORK_ERROR';

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
export const setMapView = mapView => ({
  type: SET_MAP_VIEW,
  mapView,
});
export const setShowAllFinishedChallenges = yes => ({
  type: SET_SHOW_ALL_FINISHED_CHALLENGES,
  yes,
});

export const setLastNetworkError = () => ({
  type: SET_LAST_NETWORK_ERROR,
});
