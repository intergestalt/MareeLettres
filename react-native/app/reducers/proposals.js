import {
  LOAD_PROPOSALS,
  PROPOSALS_LOADED,
  NETWORK_ERROR_LOAD_PROPOSALS,
  DELETE_PROPOSAL_FROM_TINDER_LIST,
  CUT_PROPOSAL_LIST_TO_DEFAULT,
  SET_PROPOSALS_IS_LOADING_FROM_STORAGE,
  SET_PROPOSALS,
} from '../actions/proposals';
import { PROPOSAL_VIEWS } from '../consts/';
import { DEV_CONFIG } from '../config/config';
import { saveProposalsToStorage } from '../helper/localStorage';

import initialState from '../config/initialState';
import {
  getProposalList,
  getProposalKey,
  addDefaultStructure,
  mergeProposalList,
  cutProposalList,
} from '../helper/proposalsHelper';
import { listIsEmpty } from '../helper/helper';

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
  try {
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

        if (!listIsEmpty(oldProposalList.proposals)) {
          oldProposalList.isLoading = !action.quietLoading;
        } else {
          oldProposalList.isLoading = true;
        }
        oldProposalList.isInternalLoading = true;
        oldProposalList.isPullDownLoading = action.pullDownLoading;
        oldProposalList.isPullUpLoading = action.pullUpLoading;

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
        saveProposalsToStorage(result);
        return result;
      }
      case NETWORK_ERROR_LOAD_PROPOSALS: {
        console.log('NETWORK_ERROR_LOAD_PROPOSALS');

        // all 4 lists
        const p = state[action.action.challengeId];
        let oldProposals = getProposalList(
          p,
          action.action.proposalView,
          action.action.proposalListMode,
        );
        oldProposals = addDefaultStructure(oldProposals);

        oldProposals.isLoading = false;
        oldProposals.isInternalLoading = false;
        oldProposals.isPullDownLoading = false;
        oldProposals.isPullUpLoading = false;
        oldProposals.lastLimit = 0;
        oldProposals.lastLoaded = 1;

        const challengeProposals = {
          ...p,
        };
        const key = getProposalKey(action.action.proposalView, action.action.proposalListMode);
        challengeProposals[key] = oldProposals;

        const result = {
          ...state,
        };
        result[action.challengeId] = challengeProposals;
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
        saveProposalsToStorage(result);

        return result;
      }
      case CUT_PROPOSAL_LIST_TO_DEFAULT: {
        // of all 4 lists
        const p = state[action.challengeId];
        // the changed list
        const proposalList = getProposalList(p, action.proposalView, action.proposalListMode);
        const cuttedProposalList = cutProposalList(proposalList.proposals, action.proposalView);
        proposalList.proposals = cuttedProposalList;
        proposalList.lastLoaded = 1;
        proposalList.lastLimit = 0;

        const challengeProposals = {
          ...p,
        };
        const key = getProposalKey(action.proposalView, action.proposalListMode);
        challengeProposals[key].proposals = cuttedProposalList;
        const result = {
          ...state,
        };
        result[action.challengeId] = challengeProposals;
        saveProposalsToStorage(result);

        return result;
      }
      case SET_PROPOSALS: {
        const proposals = action.proposals;
        return proposals;
      }
      // Redux local storage
      case SET_PROPOSALS_IS_LOADING_FROM_STORAGE: {
        if (action.yes) {
          return { ...state, proposalsIsLoadingFromStorage: true };
        }
        const result = { ...state };
        if (result.proposalsIsLoadingFromStorage) {
          delete result.proposalsIsLoadingFromStorage;
        }
        return result;
      }
      default:
        return state;
    }
  } catch (e) {
    console.log('Reducer proposals');
    console.log(e);
    throw e;
  }
};
