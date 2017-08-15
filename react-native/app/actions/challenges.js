import { callAllChallenges, callOneChallenge } from '../helper/apiCalls';

export const LOAD_CHALLENGES = 'LOAD_CHALLENGES';
export const NETWORK_ERROR_LOAD_CHALLENGES = 'NETWORK_ERROR_LOAD_CHALLENGES';
export const CHALLENGES_LOADED = 'CHALLENGES_LOADED';

export const LOAD_CHALLENGE = 'LOAD_CHALLENGE';
export const CHALLENGE_LOADED = 'CHALLENGE_LOADED';
export const NETWORK_ERROR_LOAD_CHALLENGE = 'NETWORK_ERROR_LOAD_CHALLENGE';

export const SET_CHALLENGES_DATE_DATA = 'SET_CHALLENGES_DATE_DATA';
export const SET_CHALLENGES_ID = 'SET_CHALLENGES_DATE_ID';
export const SET_CHALLENGES_INDEX = 'SET_CHALLENGES_INDEX';

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

export const setChallengesDateData = () => ({
  type: SET_CHALLENGES_DATE_DATA,
});
export const setChallengesId = id => ({
  type: SET_CHALLENGES_ID,
  challengeId: id,
});
export const setChallengesIndex = index => ({
  type: SET_CHALLENGES_INDEX,
  challengeIndex: index,
});
