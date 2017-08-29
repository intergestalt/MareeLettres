import store from '../config/store';
import { loadChallengesServiceProxy } from './apiProxy';
import { popChallengeSelector } from './navigationProxy';

import { CHALLENGE_VIEWS } from '../consts';
import { setChallengeId } from '../actions/challenges';
import { LOAD_CONFIG } from '../config/config';

export function manageChallenges() {
  // Always
  loadChallengesServiceProxy(false, LOAD_CONFIG.LOAD_QUIET_CHALLENGES_LIST);
  if (store.getState().challenges.challengeView === CHALLENGE_VIEWS.LIST) {
    // Reset State
    store.dispatch(setChallengeId(null));
  }
}
export function getSelectedChallengeIndex(id) {
  let index = -1;

  const challenges = store.getState().challenges.challenges;
  for (let i = 0; i < challenges.length; i += 1) {
    const challenge = challenges[i];
    if (challenge._id === id) {
      index = i;
    }
  }
  return index;
}

export function handleChallengeIsNotExisting(props, id) {
  const index = getSelectedChallengeIndex(id);
  if (index === -1) {
    if (store.getState().challenges.challengeView === CHALLENGE_VIEWS.DETAIL) {
      popChallengeSelector(props);
    }
  }
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
