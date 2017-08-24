import store from '../config/store';
import { loadChallengesServiceProxy } from './apiProxy';
import { CHALLENGE_VIEWS } from '../consts';
import { setChallengesId, setChallengesIndex } from '../actions/challenges';
import { LOAD_CONFIG } from '../config/config';

export function manageChallenges() {
  // Always
  loadChallengesServiceProxy(false, LOAD_CONFIG.LOAD_QUIET_CHALLENGES_LIST);
  if (store.getState().globals.challengeView === CHALLENGE_VIEWS.LIST) {
    // Reset State
    store.dispatch(setChallengesId(null));
    store.dispatch(setChallengesIndex(-1));
  }
}

export function upDateSelectedChallengeIndex() {
  let index = -1;
  const id = store.getState().challenges.selectedChallengeId;

  const challenges = store.getState().challenges.challenges;
  for (let i = 0; i < challenges.length; i += 1) {
    const challenge = challenges[i];
    if (challenge._id === id) {
      index = i;
    }
  }

  if (index === -1) {
    if (challenges.length > 0) {
      index = 0;
      store.dispatch(setChallengesId(challenges[0]._id));
    } else {
      store.dispatch(setChallengesId(null));
      store.dispatch(setChallengesIndex(-1));
      return;
    }
  }
  store.dispatch(setChallengesIndex(index));
}
export function getChallengeFromId(challenges, id) {
  for (let i = 0; i < challenges.length; i += 1) {
    const challenge = challenges[i];
    if (challenge._id === id) {
      return challenge;
    }
  }
  return null;
}

function getDefaultEntry() {
  const result = {};
  result.challenges = [];
  result.isLoading = false;
  result.isInternalLoading = false;
  result.isError = false;
  result.time = 0;
  result.selectedChallengeId = null;
  result.time = -1;
  return result;
}

export function addDefaultStructure(challenges) {
  if (!challenges) {
    return getDefaultEntry();
  }
  return challenges;
}
