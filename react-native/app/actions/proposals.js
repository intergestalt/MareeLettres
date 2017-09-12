import { callProposals } from '../helper/apiCalls';

export const LOAD_PROPOSALS = 'LOAD_PROPOSALS';
export const PROPOSALS_LOADED = 'PROPOSALS_LOADED';
export const NETWORK_ERROR_LOAD_PROPOSALS = 'NETWORK_ERROR_LOAD_PROPOSALS';
export const DELETE_PROPOSAL_FROM_TINDER_LIST = 'DELETE_PROPOSAL_FROM_TINDER_LIST';
export const CUT_PROPOSAL_LIST_TO_DEFAULT = 'CUT_PROPOSAL_LIST_TO_DEFAULT';
export const SET_PROPOSALS = 'SET_PROPOSALS';
export const SET_PROPOSALS_IS_LOADING_FROM_STORAGE = 'SET_PROPOSALS_IS_LOADING_FROM_STORAGE';

export const loadProposals = (
  originId,
  challengeId,
  proposalView,
  proposalListMode,
  limit,
  quietLoading = false,
  pullDownLoading = false,
  pullUpLoading = false,
) => ({
  type: LOAD_PROPOSALS,
  successEvent: PROPOSALS_LOADED,
  errorEvent: NETWORK_ERROR_LOAD_PROPOSALS,
  apiCall: callProposals,
  originId,
  challengeId,
  proposalView,
  proposalListMode,
  limit,
  quietLoading,
  pullDownLoading,
  pullUpLoading,
});

export const deleteProposalFromTinderList = (challengeId, proposalId) => ({
  type: DELETE_PROPOSAL_FROM_TINDER_LIST,
  challengeId,
  proposalId,
});

export const cutProposalListToDefault = (
  challengeId,
  proposalId,
  proposalView,
  proposalListMode,
) => ({
  type: CUT_PROPOSAL_LIST_TO_DEFAULT,
  challengeId,
  proposalId,
  proposalView,
  proposalListMode,
});
export const setProposals = proposals => ({
  type: SET_PROPOSALS,
  proposals,
});

export const setProposalsIsLoadingFromStorage = yes => ({
  type: SET_PROPOSALS_IS_LOADING_FROM_STORAGE,
  yes,
});
