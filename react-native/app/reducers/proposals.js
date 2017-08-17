import {
  LOAD_PROPOSALS,
  PROPOSALS_LOADED,
  NETWORK_ERROR_LOAD_PROPOSALS,
  VOTE_TINDER,
} from '../actions/proposals';
import { PROPOSAL_VIEWS, PROPOSAL_LIST_MODES } from '../consts/';

import initialState from '../config/initialState';
import { getProposalList, addDefaultStructure } from '../helper/proposalsHelper';

export default (state = initialState.proposals, action) => {
  switch (action.type) {
    case LOAD_PROPOSALS: {
      console.log(
        `LOAD_PROPOSALS ${action.challengeId} ${action.proposalView} ${action.proposalListMode}`,
      );

      // all 4our lists for this challenge
      let oldProposals = state[action.challengeId];
      // No object for this challenge or incomplete object
      oldProposals = addDefaultStructure(oldProposals);

      // one of the list depending of what is demanded
      const oldProposalList = getProposalList(
        oldProposals,
        action.proposalView,
        action.proposalListMode,
      );

      oldProposalList.isLoading = true;
      oldProposalList.isError = false;

      const newState = { ...state };
      newState[action.challengeId] = oldProposals;
      return newState;
    }
    case PROPOSALS_LOADED: {
      console.log(`PROPOSALS_LOADED ${action.action.challengeId}`);
      const now = new Date();
      // all 4 lists
      const newProposals = {
        ...state[action.action.challengeId],
      };
      // the changed list
      const newProposalList = getProposalList(
        newProposals,
        action.action.proposalView,
        action.action.proposalListMode,
      );

      newProposalList.proposals = action.result.proposals;
      newProposalList.isLoading = false;
      newProposalList.isError = false;
      newProposalList.time = now;
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
      // of all 4 lists
      const p = state[action.challengeId];

      // Copy e List lists
      const p1 = getProposalList(p, PROPOSAL_VIEWS.TINDER);
      const p2 = getProposalList(p, PROPOSAL_VIEWS.LIST, PROPOSAL_LIST_MODES.MOST);
      const p3 = getProposalList(p, PROPOSAL_VIEWS.LIST, PROPOSAL_LIST_MODES.NEWEST);
      const p4 = getProposalList(p, PROPOSAL_VIEWS.LIST, PROPOSAL_LIST_MODES.TRENDING);

      const c2 = {
        ...p2,
        proposals: Array.from(p2.proposals),
      };
      const c3 = {
        ...p3,
        proposals: Array.from(p2.proposals),
      };
      const c4 = {
        ...p4,
        proposals: Array.from(p2.proposals),
      };
      // correct List
      const listToChange = getProposalList(p, PROPOSAL_VIEWS.TINDER);
      const oldProposals = listToChange.proposals;
      oldProposals.shift();
      const c1 = {
        ...p1,
        proposals: Array.from(oldProposals),
      };

      const challengeProposals = {
        tinder: c1,
        listMost: c2,
        listNewest: c3,
        listTrending: c4,
      };
      const result = {
        ...state,
      };
      result[action.challengeId].proposals = challengeProposals;
      return result;
    }
    default:
      return state;
  }
};
