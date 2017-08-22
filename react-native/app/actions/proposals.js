import { callProposals } from '../helper/apiCalls';

export const LOAD_PROPOSALS = 'LOAD_PROPOSALS';
export const PROPOSALS_LOADED = 'PROPOSALS_LOADED';
export const NETWORK_ERROR_LOAD_PROPOSALS = 'NETWORK_ERROR_LOAD_PROPOSALS';
export const DELETE_PROPOSAL_FROM_TINDER_LIST = 'DELETE_PROPOSAL_FROM_TINDER_LIST';

export const loadProposals = (
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
