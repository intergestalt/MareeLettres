import store from '../config/store';
import { loadChallengesServiceProxy } from './apiProxy';
import { popChallengeSelector } from './navigationProxy';

import { CHALLENGE_VIEWS, PROPOSAL_LIST_MODES, PROPOSAL_VIEWS } from '../consts';
import { setChallengeId } from '../actions/challenges';
import { DYNAMIC_CONFIG } from '../config/config';

export function manageChallenges(props) {
  // Always
  loadChallengesServiceProxy(false, DYNAMIC_CONFIG.LOAD_QUIET_CHALLENGES_LIST.bool);
  if (store.getState().challenges.challengeView === CHALLENGE_VIEWS.LIST) {
    // Reset State
    store.dispatch(setChallengeId(null, props));
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
  result.selectedChallengeId = null;
  result.selectedChallengeIndex = -1;
  result.proposalListMode = PROPOSAL_LIST_MODES.MOST;
  result.proposalView = PROPOSAL_VIEWS.TINDER;
  result.challengeView = CHALLENGE_VIEWS.LIST;
  result.time = 0;
  return result;
}

export function addDefaultStructure(challenges) {
  if (!challenges || Object.keys(challenges).length === 0) {
    return getDefaultEntry();
  }
  return challenges;
}
