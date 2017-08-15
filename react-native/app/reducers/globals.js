import { SWAP_LANGUAGE, SET_TINDER_MODE, SET_VOTE_VIEW } from '../actions/general';
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
const setTinderMode = (state, action) => {
  if (action.isTinder) {
    return true;
  }
  return false;
};

export default (state = initialState.globals, action) => {
  switch (action.type) {
    case SWAP_LANGUAGE:
      return {
        ...state,
        language: swapLanguage(state, action),
      };
    case SET_TINDER_MODE: {
      return {
        ...state,
        isTinder: setTinderMode(state, action),
      };
    }
    case SET_VOTE_VIEW: {
      return {
        ...state,
        voteView: action.voteView,
      };
    }
    default:
      return state;
  }
};
