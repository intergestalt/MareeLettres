import { loadContent } from '../actions/content';
import { loadChallenge, loadChallenges } from '../actions/challenges';
import { loadProposals } from '../actions/proposals';
import { loadLetters } from '../actions/letters';
import store from '../config/store';
import { getProposalList } from '../helper/proposalsHelper';
import { getChallengeFromId } from '../helper/challengesHelper';
import { LOAD_CONFIG } from '../config/config';
import { PROPOSAL_VIEWS } from '../consts';

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
  if (force) {
    return true;
  }
  if (isTimeout(item, intervall)) {
    return true;
  }

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
  const content = store.getState().content;
  if (isLoading(content)) {
    return;
  }

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
  const challenges = store.getState().challenges;

  if (isLoading(challenges)) {
    return;
  }
  let doit = checkReload(force, challenges, LOAD_CONFIG.UPDATE_CHALLENGES_AFTER);

  let myQuiet = quietLoading;
  if (emptyOrNull(challenges)) {
    myQuiet = false;
    doit = true;
  } else if (emptyOrNull(challenges.challenges)) {
    myQuiet = false;
    doit = true;
  }
  if (doit) {
    store.dispatch(loadChallenges(myQuiet));
  }
}

export function loadChallengeServiceProxy(challengeId) {
  // ALWAYS AND QUIET. No check of force and time
  const challenges = store.getState().challenges;
  const challenge = getChallengeFromId(challenges, challengeId);
  const doit = true;
  if (isLoading(challenge)) {
    return;
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
  lastNotLoad = false,
) {
  const proposalView = store.getState().globals.proposalView;
  const proposalListMode = store.getState().globals.proposalListMode;
  // all 4 lists
  const allProposals = store.getState().proposals[challengeId];
  // correct list

  let list = null;
  if (allProposals) {
    list = getProposalList(allProposals, proposalView, proposalListMode);
  }

  if (isLoading(list)) {
    return;
  }
  let doit = checkReload(force, list, LOAD_CONFIG.UPDATE_PROPOSALS_AFTER);

  let myQuiet = quietLoading;
  // FIRST LOAD??? Only if nothing is loaded the last time.
  if (emptyOrNull(list)) {
    if (!lastNotLoad) {
      myQuiet = false;
      doit = true;
    }
  } else if (emptyOrNull(list.proposals)) {
    if (!lastNotLoad) {
      myQuiet = false;
      doit = true;
    }
  }

  if (doit) {
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
  }
}

// Load only if there are not enough tinder proposals
export function loadTinderProposalsServiceProxy(challengeId, limit, force, lastNotLoad) {
  const proposalView = PROPOSAL_VIEWS.TINDER;
  const proposalListMode = null;
  // all 4 lists
  const allProposals = store.getState().proposals[challengeId];
  // correct list

  let list = null;
  if (allProposals) {
    list = getProposalList(allProposals, proposalView, proposalListMode);
  }
  // If enough tinder proposals: DONT
  console.log(`${list.proposals.length} vs. ${LOAD_CONFIG.PROPOSAL_RELOAD_TINDER_OFFSET}`);
  if (list.proposals.length > LOAD_CONFIG.PROPOSAL_RELOAD_TINDER_OFFSET) {
    return;
  }
  if (isLoading(list)) {
    return;
  }

  // IF NOT: Check force, timout
  let doit = checkReload(force, list, LOAD_CONFIG.UPDATE_PROPOSALS_AFTER);

  // FIRST LOAD??? Only if nothing is loaded the last time.
  if (emptyOrNull(list)) {
    if (!lastNotLoad) {
      doit = true;
    }
  }
  if (list.proposals.length <= LOAD_CONFIG.PROPOSAL_RELOAD_TINDER_OFFSET) {
    doit = true;
  } else {
    doit = false;
  }

  if (doit) {
    store.dispatch(
      loadProposals(challengeId, proposalView, proposalListMode, limit, true, false, false),
    );
  }
}
export function loadLettersServiceProxy() {
  store.dispatch(loadLetters());
}
