import {
  LOAD_CONTENT,
  CONTENT_LOADED,
  NETWORK_ERROR_LOAD_CONTENT,
  SET_CONTENT_IS_LOADING_FROM_STORAGE,
  SET_CONTENT,
} from '../actions/content';

import initialState from '../config/initialState';
import { saveContentToStorage } from '../helper/localStorage';
import { isEmptyContent } from '../helper/helper';

export default (state = initialState.content, action) => {
  try {
    switch (action.type) {
      case LOAD_CONTENT: {
        let isLoading = !action.quietLoading;
        if (isEmptyContent(state.howto, state.about, 'fr')) {
          isLoading = true;
        }
        if (isEmptyContent(state.howto, state.about, 'en')) {
          isLoading = true;
        }

        const res = {
          isLoading,
          isInternalLoading: true,
          time: 0,
          content: state.content,
        };
        return res;
      }
      case CONTENT_LOADED: {
        const content = {};
        const now = new Date();
        for (let i = 0; i < action.result.content.length; i += 1) {
          const entry = action.result.content[i];
          const newEntry = { fr: entry.fr, en: entry.en };
          const id = entry._id;
          content[id] = newEntry;
        }
        const res = {
          isLoading: false,
          isInternalLoading: false,
          time: now.getTime(),
          content,
        };
        saveContentToStorage(res);
        return res;
      }
      case NETWORK_ERROR_LOAD_CONTENT: {
        console.log('NETWORK_ERROR_LOAD_CONTENT');
        console.log(action.error);
        return {
          ...state,
          isLoading: false,
          isInternalLoading: false,
        };
      }
      case SET_CONTENT: {
        const content = action.content;
        return content;
      }
      // Redux local storage
      case SET_CONTENT_IS_LOADING_FROM_STORAGE: {
        return { ...state, contentIsLoadingFromStorage: action.yes };
      }
      default:
        return state;
    }
  } catch (e) {
    console.log('Reducer Content');
    console.log(e);
    throw e;
  }
};
