import { callConfig } from '../helper/apiCalls';

export const LOAD_CONFIG = 'LOAD_CONFIG';
export const CONFIG_LOADED = 'CONFIG_LOADED';
export const NETWORK_ERROR_LOAD_CONFIG = 'NETWORK_ERROR_LOAD_CONFIG';
export const SET_CONFIG = 'SET_CONFIG';
export const SET_CONFIG_IS_LOADING_FROM_STORAGE = 'SET_CONFIG_IS_LOADING_FROM_STORAGE';

export const loadConfig = newConfig => ({
  type: LOAD_CONFIG,
  successEvent: CONFIG_LOADED,
  errorEvent: NETWORK_ERROR_LOAD_CONFIG,
  apiCall: callConfig,
  newConfig,
});
export const setConfig = config => ({
  type: SET_CONFIG,
  config,
});

export const setConfigIsLoadingFromStorage = yes => ({
  type: SET_CONFIG_IS_LOADING_FROM_STORAGE,
  yes,
});
