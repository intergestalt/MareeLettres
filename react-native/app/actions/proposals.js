import { callProposals } from '../helper/apiCalls';

export const LOAD_PROPOSALS = 'LOAD_PROPOSALS';
export const PROPOSALS_LOADED = 'PROPOSALS_LOADED';
export const NETWORK_ERROR_LOAD_PROPOSALS = 'NETWORK_ERROR_LOAD_PROPOSALS';

export const loadProposals = (proposalId, isTinder, listMode) => ({
  type: LOAD_PROPOSALS,
  successEvent: PROPOSALS_LOADED,
  errorEvent: NETWORK_ERROR_LOAD_PROPOSALS,
  apiCall: callProposals,
  proposalId,
  isTinder,
  listMode,
});
