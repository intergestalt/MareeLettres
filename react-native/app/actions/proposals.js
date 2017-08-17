import { callProposals } from '../helper/apiCalls';

export const LOAD_PROPOSALS = 'LOAD_PROPOSALS';
export const PROPOSALS_LOADED = 'PROPOSALS_LOADED';
export const NETWORK_ERROR_LOAD_PROPOSALS = 'NETWORK_ERROR_LOAD_PROPOSALS';
export const VOTE_TINDER = 'VOTE_TINDER';

export const loadProposals = (
  challengeId,
  proposalView,
  proposalListMode,
  limit,
  quietLoading = false,
  pullDownLoading = false,
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
});

export const voteTinder = (challengeId, yes) => ({
  type: VOTE_TINDER,
  challengeId,
  yes,
});
