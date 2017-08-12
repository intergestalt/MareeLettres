import {
  LOAD_PROPOSALS,
  PROPOSALS_LOADED,
  NETWORK_ERROR_LOAD_PROPOSALS,
} from '../actions/proposals';

import initialState from '../config/initialState';

const resetAllProposals = (id) => {
  const res = {};
  /*    isLoading: true,
    isError: false,
    time: null,
    challenges: [],
  }; */
  return res;
};

export default (state = initialState.proposals, action) => {
  switch (action.type) {
    case LOAD_PROPOSALS: {
      console.log('LOAD_PROPOSALS');
      return state; // resetProposals(id);
    }
    case PROPOSALS_LOADED: {
      console.log('PROPOSALS_LOADED');
      return state;
      /* const now = new Date();

      return {
        isLoading: false,
        isError: false,
        time: now.getTime(),
        ...action.result,
      }; */
    }
    case NETWORK_ERROR_LOAD_PROPOSALS: {
      console.log('NETWORK_ERROR_LOAD_PROPOSALS');
      return state;
      /* const now = new Date();
      return {
        isLoading: false,
        isError: true,
        time: now.getTime(),
        challenges: [],
        error: action.error,
      }; */
    }
    default:
      return state;
  }
};
