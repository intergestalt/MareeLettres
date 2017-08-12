import { loadContent } from '../actions/content';
import { loadChallenge, loadChallenges } from '../actions/challenges';
import { loadLetters } from '../actions/letters';
import store from '../config/store';

export function loadContentServiceProxy(isLoading, isLoaded) {
  if (isLoading) {
    return;
  }
  if (isLoaded) {
    return;
  }
  store.dispatch(loadContent());
}

export function loadChallengeServiceProxy(challengeId) {
  store.dispatch(loadChallenge(challengeId));
}

export function loadChallengesServiceProxy() {
  store.dispatch(loadChallenges());
}

export function loadLettersServiceProxy() {
  store.dispatch(loadLetters());
}
