import {
  SWAP_LANGUAGE,
  SET_LANGUAGE,
  SET_GLOBALS_IS_LOADING_FROM_STORAGE,
  SET_GLOBALS,
  SET_NET_WORK_ERROR,
  SET_SCREEN,
  SET_MAP_VIEW,
  SET_SHOW_ALL_FINISHED_CHALLENGES,
  SET_LAST_NETWORK_ERROR,
} from '../actions/general';

import initialState from '../config/initialState';
import I18n from '../i18n/i18n';
import { saveGlobalsToStorage } from '../helper/localStorage';

const swapLanguage = (state) => {
  let newLanguage = 'en';
  if (state.language === 'en') {
    newLanguage = 'fr';
  }
  I18n.locale = newLanguage;
  return newLanguage;
};

export default (state = initialState.globals, action) => {
  try {
    switch (action.type) {
      case SWAP_LANGUAGE: {
        const result = {
          ...state,
          language: swapLanguage(state, action),
        };
        saveGlobalsToStorage(result);
        return result;
      }
      case SET_LANGUAGE: {
        const result = {
          ...state,
          language: action.language,
        };
        saveGlobalsToStorage(result);
        return result;
      }
      case SET_GLOBALS: {
        const globals = action.globals;
        return globals;
      }
      // Redux local storage
      case SET_GLOBALS_IS_LOADING_FROM_STORAGE: {
        return { ...state, globalsIsLoadingFromStorage: action.yes };
      }

      case SET_NET_WORK_ERROR: {
        return { ...state, isNetworkError: action.yes, networkErrorMessageKey: action.messageKey };
      }
      case SET_SCREEN: {
        const result = { ...state, screen: action.screen };
        saveGlobalsToStorage(result);
        return result;
      }
      case SET_MAP_VIEW: {
        const result = { ...state, mapView: action.mapView };
        saveGlobalsToStorage(result);
        return result;
      }
      case SET_SHOW_ALL_FINISHED_CHALLENGES: {
        const result = { ...state, showAllFinishedChallenges: action.yes };
        saveGlobalsToStorage(result);
        return result;
      }
      case SET_LAST_NETWORK_ERROR: {
        const result = { ...state, lastNetworkError: new Date().getTime() };
        console.log('LAST NETWORK');
        console.log(result);
        saveGlobalsToStorage(result);
        return result;
      }
      default:
        return state;
    }
  } catch (e) {
    console.log('Reducer globals');
    console.log(e);
    throw e;
  }
};
