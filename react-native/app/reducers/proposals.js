import {
  LOAD_PROPOSALS,
  PROPOSALS_LOADED,
  NETWORK_ERROR_LOAD_PROPOSALS,
  VOTE_TINDER,
} from '../actions/proposals';
import { PROPOSAL_VIEWS, PROPOSAL_LIST_MODES } from '../consts/';

import initialState from '../config/initialState';
import { getProposalList, getProposalKey, addDefaultStructure } from '../helper/proposalsHelper';

function swapArrayElements(arr, indexA, indexB) {
  const res = arr;
  const temp = arr[indexA];
  res[indexA] = arr[indexB];
  res[indexB] = temp;
  return res;
}
function swapSomeElements(arr, count) {
  const res = arr;
  for (let i = 0; i < count; i += 1) {
    let indexA = Math.round(Math.random() * arr.length);
    if (indexA >= arr.length) indexA = arr.length - 1;
    let indexB = Math.round(Math.random() * arr.length);
    if (indexB >= arr.length) indexB = arr.length - 1;
    swapArrayElements(res, indexA, indexB);
  }
  return res;
}
export default (state = initialState.proposals, action) => {
  switch (action.type) {
    case LOAD_PROPOSALS: {
      console.log(
        `LOAD_PROPOSALS ${action.challengeId} ${action.proposalView} ${action.proposalListMode} ${action.quietLoading} ${action.pullDownLoading}`,
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

      if (oldProposalList.proposals.length > 0) {
        oldProposalList.isLoading = !action.quietLoading;
      } else {
        oldProposalList.isLoading = true;
      }
      oldProposalList.isPullDownLoading = action.pullDownLoading;
      oldProposalList.isError = false;

      const newState = { ...state };
      newState[action.challengeId] = oldProposals;
      return newState;
    }
    case PROPOSALS_LOADED: {
      console.log(`PROPOSALS_LOADED ${action.action.challengeId}`);
      const now = new Date();

      // of all 4 lists
      const p = state[action.action.challengeId];
      // the changed list
      const newProposalList = getProposalList(
        p,
        action.action.proposalView,
        action.action.proposalListMode,
      );

      newProposalList.proposals = action.result.proposals;
      // if (action.action.proposalView === PROPOSAL_VIEWS.LIST) {
      //   newProposalList.proposals = swapSomeElements(newProposalList.proposals, 4);
      // }
      newProposalList.isLoading = false;
      newProposalList.isError = false;
      newProposalList.isPullDownLoading = false;
      newProposalList.time = now;
      const key = getProposalKey(action.action.proposalView, action.action.proposalListMode);

      // New object
      const challengeProposals = {
        ...p,
      };
      challengeProposals[key] = newProposalList;

      const result = {
        ...state,
      };
      result[action.action.challengeId] = challengeProposals;
      return result;
    }
    case NETWORK_ERROR_LOAD_PROPOSALS: {
      console.log('NETWORK_ERROR_LOAD_PROPOSALS');
      const oldProposals = state[action.challengeId];
      oldProposals.isLoading = false;
      oldProposals.isError = true;
      oldProposals.isError = false;
      oldProposals.isPullDownLoading = false;
      const result = {
        ...state,
      };
      result[action.challengeId] = oldProposals;

      return result;
    }
    case VOTE_TINDER: {
      // of all 4 lists
      const p = state[action.challengeId];
      // correct List
      const listToChange = getProposalList(p, PROPOSAL_VIEWS.TINDER);
      const oldProposals = listToChange.proposals;
      oldProposals.shift();
      const p1 = getProposalList(p, PROPOSAL_VIEWS.TINDER);
      const c1 = {
        ...p1,
        proposals: Array.from(oldProposals),
      };

      const challengeProposals = {
        ...p,
        tinder: c1,
      };

      const result = {
        ...state,
      };
      result[action.challengeId] = challengeProposals;
      return result;

      /*      // of all 4 lists
      const p = state[action.challengeId];

      // Copy all List lists NOT tinder
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
        proposals: Array.from(p3.proposals),
      };
      const c4 = {
        ...p4,
        proposals: Array.from(p4.proposals),
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
      result[action.challengeId] = challengeProposals;
      console.log(result);
      return result; */
    }
    default:
      return state;
  }
};
