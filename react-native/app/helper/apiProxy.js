import { loadContent } from '../actions/content';
import { loadChallenge, loadChallenges } from '../actions/challenges';
import { loadProposals } from '../actions/proposals';
import { loadLetters } from '../actions/letters';
import store from '../config/store';
import { getProposalList } from '../helper/proposalsHelper';
import { getChallengeFromId } from '../helper/challengesHelper';
import { LOAD_CONFIG } from '../config/config';

function isLoading(item) {
  if (item) {
    const loading = item.isInternalLoading;
    if (loading) {
      return true;
    }
  }
  return false;
}

function isTimeout(item, intervall) {
  let lastTime = 0;
  if (item) {
    const time = item.time;
    if (time) {
      lastTime = time;
    }
  }

  const now = new Date().getTime();
  const timeout = now - lastTime > intervall;

  return timeout;
}
function checkReload(force, item, intervall) {
  if (isLoading(item)) {
    console.log('IS ALREADY LOADING -> ABORT');
    return false;
  }
  if (force) {
    console.log('FORCE -> RELOAD');
    return true;
  }
  if (isTimeout(item, intervall)) {
    console.log('TIME OUT -> RELOAD');
    return true;
  }
  console.log('IS ALREADY LOADED -> ABORT');

  return false;
}
function emptyOrNull(obj) {
  if (obj) {
    if (Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  }
  return true;
}

export function loadContentServiceProxy(force, quietLoading = false) {
  console.log('LOAD CONTENT PROXY');
  const content = store.getState().content;
  let doit = checkReload(force, content, LOAD_CONFIG.UPDATE_CONTENT_AFTER);

  let myQuiet = quietLoading;
  if (emptyOrNull(content)) {
    myQuiet = false;
    doit = true;
  } else if (emptyOrNull(content.content)) {
    myQuiet = false;
    doit = true;
  }

  if (doit) {
    store.dispatch(loadContent(myQuiet));
  }
}

export function loadChallengesServiceProxy(force, quietLoading = false) {
  console.log('LOAD CHALLENGES PROXY');

  const challenges = store.getState().challenges;

  let doit = checkReload(force, challenges, LOAD_CONFIG.UPDATE_CHALLENGES_AFTER);

  let myQuiet = quietLoading;
  if (emptyOrNull(challenges)) {
    console.log('OKAY 1');
    myQuiet = false;
    doit = true;
  } else if (emptyOrNull(challenges.challenges)) {
    console.log('OKAY 2');
    myQuiet = false;
    doit = true;
  }
  console.log(`myQuiet ${myQuiet}`);
  if (doit) {
    store.dispatch(loadChallenges(myQuiet));
  }
}

export function loadChallengeServiceProxy(challengeId) {
  // ALWAYS AND QUIET. No check of force and time
  console.log('LOAD CHALLENGE PROXY');
  const challenges = store.getState().challenges;
  const challenge = getChallengeFromId(challenges, challengeId);
  let doit = true;
  if (isLoading(challenge)) {
    doit = false;
  }
  if (doit) {
    store.dispatch(loadChallenge(challengeId));
  }
}

export function loadProposalsServiceProxy(
  force,
  challengeId,
  limit,
  quietLoading = false,
  pullDownLoading = false,
  pullUpLoading = false,
) {
  console.log('LOAD PROPOSALS PROXY');
  const proposalView = store.getState().globals.proposalView;
  const proposalListMode = store.getState().globals.proposalListMode;
  // all 4 lists
  const allProposals = store.getState().proposals[challengeId];
  // correct list

  let list = null;
  if (allProposals) {
    list = getProposalList(allProposals, proposalView, proposalListMode);
  }

  let doit = checkReload(force, list, LOAD_CONFIG.UPDATE_PROPOSALS_AFTER);

  let myQuiet = quietLoading;
  if (emptyOrNull(list)) {
    myQuiet = false;
    doit = true;
  } else if (emptyOrNull(list.proposals)) {
    myQuiet = false;
    doit = true;
  }

  if (doit) {
    console.log('LOAD PROPOSALS');
    store.dispatch(
      loadProposals(
        challengeId,
        proposalView,
        proposalListMode,
        limit,
        myQuiet,
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
