import {
  LOAD_PROPOSALS,
  PROPOSALS_LOADED,
  NETWORK_ERROR_LOAD_PROPOSALS,
  DELETE_PROPOSAL_FROM_TINDER_LIST,
} from '../actions/proposals';
import { PROPOSAL_VIEWS } from '../consts/';
import { DEV_CONFIG } from '../config/config';

import initialState from '../config/initialState';
import {
  getProposalList,
  getProposalKey,
  addDefaultStructure,
  mergeProposalList,
} from '../helper/proposalsHelper';

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
      console.log('LOAD_PROPOSALS');
      // all 4our lists for this challenge
      let oldProposals = state[action.challengeId];
      // No object for this challenge or incomplete object ?
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
      oldProposalList.isInternalLoading = true;
      oldProposalList.isPullDownLoading = action.pullDownLoading;
      oldProposalList.isPullUpLoading = action.pullUpLoading;
      oldProposalList.isError = false;

      const newState = { ...state };
      newState[action.challengeId] = oldProposals;
      return newState;
    }
    case PROPOSALS_LOADED: {
      console.log('PROPOSALS_LOADED');
      const now = new Date();

      // of all 4 lists
      const p = state[action.action.challengeId];
      // the changed list
      const newProposalList = getProposalList(
        p,
        action.action.proposalView,
        action.action.proposalListMode,
      );
      const mergedProposalList = mergeProposalList(
        newProposalList.proposals,
        action.result.proposals,
        action.action.proposalView,
      );
      newProposalList.proposals = mergedProposalList;
      if (DEV_CONFIG.SWAP_RELOADED_PROPOSALS) {
        if (action.action.proposalView === PROPOSAL_VIEWS.LIST) {
          newProposalList.proposals = swapSomeElements(
            newProposalList.proposals,
            DEV_CONFIG.SWAP_RELOADED_PROPOSALS_COUNT,
          );
        }
      }
      newProposalList.lastLimit = action.action.limit;
      newProposalList.lastLoaded = action.result.proposals.length;
      newProposalList.isLoading = false;
      newProposalList.isInternalLoading = false;
      newProposalList.isError = false;
      newProposalList.isPullDownLoading = false;
      newProposalList.isPullUpLoading = false;
      newProposalList.time = now.getTime();
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
      oldProposals.isInternalLoading = false;
      oldProposals.isError = true;
      oldProposals.isError = false;
      oldProposals.isPullDownLoading = false;
      oldProposals.isPullUpLoading = false;
      const result = {
        ...state,
      };
      result[action.challengeId] = oldProposals;

      return result;
    }
    case DELETE_PROPOSAL_FROM_TINDER_LIST: {
      const proposalId = action.proposalId;

      // of all 4 lists
      const p = state[action.challengeId];
      // correct List
      const listToChange = getProposalList(p, PROPOSAL_VIEWS.TINDER);
      const oldProposals = listToChange.proposals;

      if (!proposalId) {
        oldProposals.shift();
      } else {
        let index = -1;
        for (let i = 0; i < oldProposals.length; i += 1) {
          const id = oldProposals[i]._id;
          if (id === proposalId) {
            index = i;
          }
        }
        if (index >= 0) {
          oldProposals.splice(index, 1);
        }
      }

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
    }
    default:
      return state;
  }
};
