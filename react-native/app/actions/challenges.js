import { callAllChallenges, callOneChallenge } from '../helper/apiCalls';

export const LOAD_CHALLENGES = 'LOAD_CHALLENGES';
export const NETWORK_ERROR_LOAD_CHALLENGES = 'NETWORK_ERROR_LOAD_CHALLENGES';
export const CHALLENGES_LOADED = 'CHALLENGES_LOADED';

export const LOAD_CHALLENGE = 'LOAD_CHALLENGE';
export const CHALLENGE_LOADED = 'CHALLENGE_LOADED';
export const NETWORK_ERROR_LOAD_CHALLENGE = 'NETWORK_ERROR_LOAD_CHALLENGE';

export const SET_CHALLENGE_ID = 'SET_CHALLENGE_ID';
export const SET_CHALLENGE_VIEW = 'SET_CHALLENGE_VIEW';
export const SET_PROPOSAL_VIEW = 'SET_PROPOSAL_VIEW';
export const SET_PROPOSAL_LIST_MODE = 'SET_PROPOSAL_LIST_MODE';

export const SET_CHALLENGES = 'SET_CHALLENGES';
export const SET_CHALLENGES_IS_LOADING_FROM_STORAGE = 'SET_CHALLENGES_IS_LOADING_FROM_STORAGE';

export const loadChallenges = (quietLoading = false) => ({
  type: LOAD_CHALLENGES,
  successEvent: CHALLENGES_LOADED,
  errorEvent: NETWORK_ERROR_LOAD_CHALLENGES,
  quietLoading,
  apiCall: callAllChallenges,
});

export const loadChallenge = (challengeId, props) => ({
  type: LOAD_CHALLENGE,
  successEvent: CHALLENGE_LOADED,
  errorEvent: NETWORK_ERROR_LOAD_CHALLENGE,
  apiCall: callOneChallenge,
  challengeId,
  props,
});

export const setChallengeId = (id, props) => ({
  type: SET_CHALLENGE_ID,
  challengeId: id,
  props,
});
export const setChallengeView = challengeView => ({
  type: SET_CHALLENGE_VIEW,
  challengeView,
});

export const setProposalView = (challengeId, proposalView) => ({
  type: SET_PROPOSAL_VIEW,
  challengeId,
  proposalView,
});

export const setProposalListMode = (challengeId, proposalListMode) => ({
  type: SET_PROPOSAL_LIST_MODE,
  challengeId,
  proposalListMode,
});

export const setChallenges = (challenges, props) => ({
  type: SET_CHALLENGES,
  challenges,
  props,
});

export const setChallengesIsLoadingFromStorage = yes => ({
  type: SET_CHALLENGES_IS_LOADING_FROM_STORAGE,
  yes,
});
