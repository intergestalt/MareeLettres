import {
  LOAD_PROPOSALS,
  PROPOSALS_LOADED,
  NETWORK_ERROR_LOAD_PROPOSALS,
} from '../../actions/services/proposals';

import initialState from '../../config/initialState';

const resetProposals = (id) => {
  const res = {};
  /*    isLoading: true,
    isError: false,
    time: null,
    challenges: [],
  };*/
  return res;
};

export default (state = initialState.proposals, action) => {
  console.log('REDUCER PROPOSAL');
  console.log(action);
  switch (action.type) {
    case LOAD_PROPOSALS: {
      console.log('RESET Challenges');
      return state; // resetProposals(id);
    }
    case PROPOSALS_LOADED: {
      console.log('CHALLENGES_LOADED 1');
      return state;
      /* const now = new Date();

      return {
        isLoading: false,
        isError: false,
        time: now.getTime(),
        ...action.result,
      };*/
    }
    case NETWORK_ERROR_LOAD_PROPOSALS: {
      console.log('NETWORK ERROR LOAD PROPOSALS');
      return state;
      /* const now = new Date();
      return {
        isLoading: false,
        isError: true,
        time: now.getTime(),
        challenges: [],
        error: action.error,
      };*/
    }
    default:
      return state;
  }
};
