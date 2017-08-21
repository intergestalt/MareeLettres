import { LOAD_CONTENT, CONTENT_LOADED, NETWORK_ERROR_LOAD_CONTENT } from '../actions/content';

import initialState from '../config/initialState';

export default (state = initialState.content, action) => {
  switch (action.type) {
    case LOAD_CONTENT: {
      const res = {
        isLoading: !action.quietLoading,
        isInternalLoading: true,
        isError: false,
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
        isError: false,
        time: now.getTime(),
        content,
      };
      return res;
    }
    case NETWORK_ERROR_LOAD_CONTENT: {
      const now = new Date();
      return {
        isLoading: false,
        isInternalLoading: false,
        isError: true,
        time: now.getTime(),
        content: [],
        error: action.error,
      };
    }
    default:
      return state;
  }
};
