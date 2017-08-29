import { callAllContent } from '../helper/apiCalls';

export const LOAD_CONTENT = 'LOAD_CONTENT';
export const CONTENT_LOADED = 'CONTENT_LOADED';
export const NETWORK_ERROR_LOAD_CONTENT = 'NETWORK_ERROR_LOAD_CONTENT';
export const SET_CONTENT = 'SET_CONTENT';
export const SET_CONTENT_IS_LOADING_FROM_STORAGE = 'SET_CONTENT_IS_LOADING_FROM_STORAGE';

export const loadContent = quietLoading => ({
  type: LOAD_CONTENT,
  successEvent: CONTENT_LOADED,
  errorEvent: NETWORK_ERROR_LOAD_CONTENT,
  apiCall: callAllContent,
  quietLoading,
});
export const setContent = content => ({
  type: SET_CONTENT,
  content,
});

export const setContentIsLoadingFromStorage = yes => ({
  type: SET_CONTENT_IS_LOADING_FROM_STORAGE,
  yes,
});
