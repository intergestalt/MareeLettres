import { callAllChallenges, callOneChallenge } from '../../helper/apiCalls';

export const LOAD_CHALLENGES = 'LOAD_CHALLENGES';
export const NETWORK_ERROR_LOAD_CHALLENGES = 'NETWORK_ERROR_LOAD_CHALLENGES';
export const CHALLENGES_LOADED = 'CHALLENGES_LOADED';

export const LOAD_CHALLENGE = 'LOAD_CHALLENGE';
export const CHALLENGE_LOADED = 'CHALLENGE_LOADED';
export const NETWORK_ERROR_LOAD_CHALLENGE = 'NETWORK_ERROR_LOAD_CHALLENGE';

export const loadChallenges = () => ({
  type: LOAD_CHALLENGES,
  successEvent: CHALLENGES_LOADED,
  errorEvent: NETWORK_ERROR_LOAD_CHALLENGES,
  apiCall: callAllChallenges,
});

export const loadChallenge = challengeId => ({
  type: LOAD_CHALLENGE,
  successEvent: CHALLENGE_LOADED,
  errorEvent: NETWORK_ERROR_LOAD_CHALLENGE,
  apiCall: callOneChallenge,
  challengeId,
});
