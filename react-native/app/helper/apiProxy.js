import { loadContent } from '../actions/content';
import { loadChallenge, loadChallenges } from '../actions/challenges';
import { loadProposals } from '../actions/proposals';
import { loadLetters } from '../actions/letters';
import store from '../config/store';
import { getProposalList } from '../helper/proposalsHelper';
import { LOAD_CONFIG } from '../config/config';

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
  force,
  challengeId,
  limit,
  quietLoading = false,
  pullDownLoading = false,
  pullUpLoading = false,
) {
  const proposalView = store.getState().globals.proposalView;
  const proposalListMode = store.getState().globals.proposalListMode;
  // all 4 lists
  const p = store.getState().proposals[challengeId];
  // correct list
  let oldTime = 0;

  let doit = false;
  if (p) {
    const list = getProposalList(p, proposalView, proposalListMode);
    oldTime = list.time;
  } else {
    doit = true;
  }

  if (force) {
    doit = true;
  } else {
    const now = new Date().getTime();
    console.log(`${now} ${oldTime} ${now - oldTime}`);
    if (now - oldTime > LOAD_CONFIG.UPDATE_PROPOSALS_AFTER) {
      console.log(`TIME TO RELOAD ${challengeId}`);
      doit = true;
    }
  }
  if (doit) {
    console.log('LOAD PROPOSALS');
    store.dispatch(
      loadProposals(
        challengeId,
        proposalView,
        proposalListMode,
        limit,
        quietLoading,
        pullDownLoading,
        pullUpLoading,
      ),
    );
  } else {
    console.log('DONT LOAD PROPOSALS');
  }
}
export function loadLettersServiceProxy() {
  store.dispatch(loadLetters());
}
