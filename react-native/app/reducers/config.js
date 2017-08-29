import {
  LOAD_CONFIG,
  CONFIG_LOADED,
  NETWORK_ERROR_LOAD_CONFIG,
  SET_CONFIG_IS_LOADING_FROM_STORAGE,
  SET_CONFIG,
} from '../actions/content';

import initialState from '../config/initialState';
import { saveConfigToStorage } from '../helper/localStorage';
import { objectIsEmpty } from '../helper/helper';

export default (state = initialState.config, action) => {
  try {
    switch (action.type) {
      case LOAD_CONFIG: {
        console.log('LOAD_CONFIG');
        // always quiet
        let isLoading = false;
        // but if there is no config. Should have no effect anyay
        if (objectIsEmpty(state)) {
          isLoading = true;
        }

        const res = {
          ...state,
          isLoading,
          isInternalLoading: true,
        };
        return res;
      }
      case CONFIG_LOADED: {
        console.log(`CONFIG_LOADED ${action.action.currentConfig}`);
        const now = new Date();
        const res = {
          ...state,
          currentConfig: action.action.currentConfig,
          isLoading: false,
          isInternalLoading: false,
          time: now.getTime(),
          config: action.result.config,
        };
        saveConfigToStorage(res);
        return res;
      }
      case NETWORK_ERROR_LOAD_CONFIG: {
        console.log('NETWORK_ERROR_LOAD_CONFIG');
        console.log(action.error);
        return {
          ...state,
          isLoading: false,
          isInternalLoading: false,
        };
      }
      case SET_CONFIG: {
        const config = action.config;
        return config;
      }
      // Redux local storage
      case SET_CONFIG_IS_LOADING_FROM_STORAGE: {
        return { ...state, configIsLoadingFromStorage: action.yes };
      }
      default:
        return state;
    }
  } catch (e) {
    console.log('Reducer Config');
    console.log(e);
    throw e;
  }
};
