import {
  LOAD_PROPOSALS,
  PROPOSALS_LOADED,
  NETWORK_ERROR_LOAD_PROPOSALS,
  VOTE_TINDER,
} from '../actions/proposals';

import initialState from '../config/initialState';

export default (state = initialState.proposals, action) => {
  switch (action.type) {
    case LOAD_PROPOSALS: {
      console.log(`LOAD_PROPOSALS ${action.challengeId} ${action.isTinder} ${action.listMode}`);

      let oldProposals = state[action.challengeId];
      if (!oldProposals) {
        oldProposals = {
          proposals: [],
        };
      }
      oldProposals.isLoading = true;
      oldProposals.isError = false;

      const newState = { ...state };
      newState[action.challengeId] = oldProposals;
      return newState;
    }
    case PROPOSALS_LOADED: {
      console.log(`PROPOSALS_LOADED ${action.action.challengeId}`);
      const now = new Date();
      const newProposals = {
        ...state[action.action.challengeId],
      };
      newProposals.proposals = action.result.proposals;
      newProposals.isLoading = false;
      newProposals.isError = false;
      newProposals.time = now;
      const newState = {
        ...state,
      };
      newState[action.action.challengeId] = newProposals;
      return newState;
    }
    case NETWORK_ERROR_LOAD_PROPOSALS: {
      console.log('NETWORK_ERROR_LOAD_PROPOSALS');
      const oldProposals = state[action.challengeId];
      oldProposals.isLoading = false;
      oldProposals.isError = true;
      const result = {
        ...state,
      };
      result[action.challengeId] = oldProposals;

      return result;
    }
    case VOTE_TINDER: {
      const oldProposals = Array.from(state[action.challengeId].proposals);
      oldProposals.shift();
      const result = {
        ...state,
      };
      result[action.challengeId].proposals = oldProposals;
      return result;
    }
    default:
      return state;
  }
};
