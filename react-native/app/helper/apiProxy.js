import { loadContent } from '../actions/content';
import { loadConfig } from '../actions/config';
import { loadProposals } from '../actions/proposals';

import { loadProposal, postProposal, userSendInternalVotes, loadUser } from '../actions/user';
import { loadChallenge, loadChallenges } from '../actions/challenges';
import { loadLetters, postLetter, loadLettersInterval } from '../actions/letters';
import store from '../config/store';
import { getProposalList } from '../helper/proposalsHelper';
import { getChallengeFromId } from '../helper/challengesHelper';
import { streamGetAuthToken, streamGetTweets, streamGetTweetsHTML } from '../actions/stream';
import { DYNAMIC_CONFIG } from '../config/config';

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
export function loadUserServiceProxy(force) {
  const user = store.getState().user;
  if (isLoading(user)) {
    return;
  }

  let doit = checkReload(force, user, DYNAMIC_CONFIG.UPDATE_CONTENT_AFTER);

  if (emptyOrNull(user)) {
    doit = true;
  } else if (emptyOrNull(user.votes)) {
    doit = true;
  }
  const originId = user.origin_id;
  if (doit) {
    console.log(`LOAD USER: ${originId}`);
    store.dispatch(loadUser(originId));
  }
}
export function loadContentServiceProxy(force, quietLoading = false) {
  const content = store.getState().content;
  if (isLoading(content)) {
    return;
  }

  let doit = checkReload(force, content, DYNAMIC_CONFIG.UPDATE_CONTENT_AFTER);

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
export function loadConfigServiceProxy(newConfig) {
  const config = store.getState().config;
  if (isLoading(config)) {
    return;
  }

  store.dispatch(loadConfig(newConfig));
}
export function loadChallengesServiceProxy(force, quietLoading = false) {
  const challenges = store.getState().challenges;

  if (isLoading(challenges)) {
    return;
  }
  let doit = checkReload(force, challenges, DYNAMIC_CONFIG.UPDATE_CHALLENGES_AFTER);
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

export function loadChallengeServiceProxy(challengeId, props) {
  // ALWAYS AND QUIET. No check of force and time
  const challenges = store.getState().challenges;
  const challenge = getChallengeFromId(challenges, challengeId);
  const doit = true;
  if (isLoading(challenge)) {
    return;
  }
  if (doit) {
    store.dispatch(loadChallenge(challengeId, props));
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
  const challenge = getChallengeFromId(store.getState().challenges.challenges, challengeId);
  const proposalView = challenge.proposalView;
  const proposalListMode = challenge.proposalListMode;
  // all 4 lists
  const allProposals = store.getState().proposals[challengeId];
  // correct list

  let list = null;
  if (allProposals) {
    list = getProposalList(allProposals, proposalView, proposalListMode);
  }

  if (isLoading(list)) {
    return false;
  }
  let doit = checkReload(force, list, DYNAMIC_CONFIG.UPDATE_PROPOSALS_AFTER);

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
  const originId = store.getState().user.origin_id;
  if (doit) {
    store.dispatch(
      loadProposals(
        originId,
        challengeId,
        proposalView,
        proposalListMode,
        limit,
        myQuiet,
        pullDownLoading,
        pullUpLoading,
      ),
    );
    return true;
  }
  return false;
}

export function postProposalServiceProxy(challenge_id, text, props) {
  const user = store.getState().user;
  const body = {
    origin_id: user.origin_id,
    challenge_id,
    text,
    created_at: new Date().toISOString(),
  };
  console.log('postProposalServiceProxy');
  // console.log(body);
  store.dispatch(postProposal(body, props));
}

export function loadLettersServiceProxy(body = {}) {
  store.dispatch(loadLetters(body));
}

export function loadLettersIntervalServiceProxy(body = {}) {
  store.dispatch(loadLettersInterval(body));
}

export function postLetterServiceProxy(character, lat, lng) {
  const user = store.getState().user;
  const body = {
    origin_id: user.origin_id,
    character,
    lat,
    lng,
    created_at: new Date().toISOString(),
  };

  store.dispatch(postLetter(body));
}

export function sendInternalVotesServiceProxy(force) {
  const user = store.getState().user;
  const internalVotes = user.internalVotes;
  if (isLoading(internalVotes)) {
    return;
  }
  // force oder timout
  let doit = checkReload(force, internalVotes, DYNAMIC_CONFIG.SEND_INTERNAL_VOTES_AFTER * 1000); // map seconds to milliseconds

  // Do not send if there is nothing to sent
  if (emptyOrNull(internalVotes)) {
    return;
  } else if (emptyOrNull(internalVotes.internalVotes)) {
    return;
  }
  // if there are more then n internal vots doit
  if (Object.keys(internalVotes.internalVotes).length >= DYNAMIC_CONFIG.INTERNAL_VOTES_OFFSET) {
    doit = true;
  }
  if (doit) {
    console.log('SENT VOTES!');
    store.dispatch(userSendInternalVotes(user.origin_id, internalVotes));
  }
}

export function twitterGetAuth() {
  store.dispatch(streamGetAuthToken());
}

export function twitterGetTweets(token) {
  store.dispatch(streamGetTweets(token));
}

export function twitterGetTweetsHTML() {
  store.dispatch(streamGetTweetsHTML());
}
export function loadProposalServiceProxy(challengeId, quietLoading) {
  const challenges = store.getState().user.challenges;
  const challenge = challenges[challengeId];
  const doit = true;
  if (isLoading(challenge)) {
    return;
  }

  if (doit) {
    store.dispatch(loadProposal(challenge.ownProposalId, challengeId, quietLoading));
  }
}
