import {
  LOAD_PROPOSALS,
  PROPOSALS_LOADED,
  NETWORK_ERROR_LOAD_PROPOSALS,
} from '../actions/proposals';

import initialState from '../config/initialState';

export default (state = initialState.proposals, action) => {
  switch (action.type) {
    case LOAD_PROPOSALS: {
      console.log(`LOAD_PROPOSALS ${action.proposalId} ${action.isTinder} ${action.listMode}`);

      let oldProposals = state[action.proposalId];
      if (!oldProposals) {
        oldProposals = {
          proposals: [],
        };
      }
      oldProposals.isLoading = true;
      oldProposals.isError = false;

      const newState = { ...state };
      newState[action.proposalId] = oldProposals;
      return newState;
    }
    case PROPOSALS_LOADED: {
      console.log(`PROPOSALS_LOADED ${action.action.proposalId}`);
      const now = new Date();
      const newProposals = {
        ...state[action.action.proposalId],
      };
      newProposals.proposals = action.result.proposals;
      newProposals.isLoading = false;
      newProposals.isError = false;
      newProposals.time = now;
      const newState = {
        ...state,
      };
      newState[action.action.proposalId] = newProposals;
      return newState;
    }
    case NETWORK_ERROR_LOAD_PROPOSALS: {
      console.log('NETWORK_ERROR_LOAD_PROPOSALS');
      const oldProposals = state[action.proposalId];
      oldProposals.isLoading = false;
      oldProposals.isError = true;
      const result = {
        ...state,
      };
      result[action.proposalId] = oldProposals;

      return result;
    }
    default:
      return state;
  }
};
