import { SWAP_LANGUAGE, SET_LANGUAGE } from '../actions/general';

import initialState from '../config/initialState';
import I18n from '../i18n/i18n';

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
      case SWAP_LANGUAGE:
        return {
          ...state,
          language: swapLanguage(state, action),
        };
      case SET_LANGUAGE: {
        return {
          ...state,
          language: action.language,
        };
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
