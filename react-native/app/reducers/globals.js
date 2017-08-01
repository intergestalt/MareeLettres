import { SWAP_LANGUAGE } from '../actions/general/language';
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
  switch (action.type) {
    case SWAP_LANGUAGE:
      return {
        ...state,
        language: swapLanguage(state, action),
      };
    default:
      return state;
  }
};
