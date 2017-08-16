import { callProposals } from '../helper/apiCalls';

export const LOAD_PROPOSALS = 'LOAD_PROPOSALS';
export const PROPOSALS_LOADED = 'PROPOSALS_LOADED';
export const NETWORK_ERROR_LOAD_PROPOSALS = 'NETWORK_ERROR_LOAD_PROPOSALS';
export const VOTE_TINDER = 'VOTE_TINDER';

export const loadProposals = (challengeId, isTinder, listMode) => ({
  type: LOAD_PROPOSALS,
  successEvent: PROPOSALS_LOADED,
  errorEvent: NETWORK_ERROR_LOAD_PROPOSALS,
  apiCall: callProposals,
  challengeId,
  isTinder,
  listMode,
});

export const voteTinder = (challengeId, yes) => ({
  type: VOTE_TINDER,
  challengeId,
  yes,
});
