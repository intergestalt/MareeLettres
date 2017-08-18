import {
  SWAP_LANGUAGE,
  SET_PROPOSAL_VIEW,
  SET_CHALLENGE_VIEW,
  SET_PROPOSAL_LIST_MODE,
} from '../actions/general';
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
    case SET_PROPOSAL_VIEW: {
      return {
        ...state,
        proposalView: action.proposalView,
      };
    }
    case SET_CHALLENGE_VIEW: {
      return {
        ...state,
        challengeView: action.challengeView,
      };
    }
    case SET_PROPOSAL_LIST_MODE: {
      return {
        ...state,
        proposalListMode: action.proposalListMode,
      };
    }
    default:
      return state;
  }
};
