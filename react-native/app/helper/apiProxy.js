import { loadContent } from '../actions/content';
import { loadChallenge, loadChallenges } from '../actions/challenges';
import { loadProposals } from '../actions/proposals';
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
export function loadProposalsServiceProxy(
  challengeId,
  limit,
  quietLoading = false,
  pullDownLoading = false,
) {
  const proposalView = store.getState().globals.proposalView;
  const proposalListMode = store.getState().globals.proposalListMode;

  store.dispatch(
    loadProposals(
      challengeId,
      proposalView,
      proposalListMode,
      limit,
      quietLoading,
      pullDownLoading,
    ),
  );
}
export function loadLettersServiceProxy() {
  store.dispatch(loadLetters());
}
