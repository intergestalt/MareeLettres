import { LOAD_CONTENT, CONTENT_LOADED, NETWORK_ERROR_LOAD_CONTENT } from '../actions/content';

import initialState from '../config/initialState';

const resetContent = () => {
  const res = {
    isLoading: true,
    isError: false,
    isLoaded: false,
    time: null,
    content: [],
  };
  return res;
};

export default (state = initialState.content, action) => {
  switch (action.type) {
    case LOAD_CONTENT: {
      console.log('START CONTENT');
      return resetContent();
    }
    case CONTENT_LOADED: {
      console.log('CONTENT LOADED');

      const content = {};
      const now = new Date();
      for (let i = 0; i < action.result.content.length; i += 1) {
        const entry = action.result.content[i];
        const newEntry = { fr: entry.fr, en: entry.en };
        const id = entry._id;
        content[id] = newEntry;
      }
      return {
        isLoading: false,
        isError: false,
        isLoaded: true,
        time: now.getTime(),
        content,
      };
    }
    case NETWORK_ERROR_LOAD_CONTENT: {
      console.log('NETWORK ERROR LOAD CONTENT');
      const now = new Date();
      return {
        isLoading: false,
        isError: true,
        isLoaded: false,
        time: now.getTime(),
        content: [],
        error: action.error,
      };
    }
    default:
      return state;
  }
};
