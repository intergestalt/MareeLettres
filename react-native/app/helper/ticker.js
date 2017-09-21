import { InteractionManager } from 'react-native';
import { setChallengesDateData } from '../actions/challengesTicker';
import {
  loadChallengeServiceProxy,
  sendInternalVotesServiceProxy,
  loadChallengesServiceProxy,
} from '../helper/apiProxy';
import store from '../config/store';

import { isFinished } from '../helper/dateFunctions';
import { DEV_CONFIG } from '../config/config';
import { getZuffiDelayForApi } from '../helper/helper';
import { renderChallengesList } from '../actions/challenges';

let tickerStarted = false;
let timerId = null;

function tickerData(props) {
  const state = store.getState();
  // get old finished
  const wasFinished = new Array(state.challenges.challenges.length);
  for (let i = 0; i < state.challenges.challenges.length; i += 1) {
    const myChallenge = state.challenges.challenges[i];
    const myTickerData = state.challengesTicker[myChallenge._id];
    if (myTickerData.finished) {
      wasFinished[i] = true;
    } else {
      wasFinished[i] = false;
    }
  }
  // console.log(`TICK ${new Date().getTime()}`);
  InteractionManager.runAfterInteractions(() => {
    store.dispatch(setChallengesDateData());
  });

  // check if it is finished now.
  for (let i = 0; i < state.challenges.challenges.length; i += 1) {
    const myChallenge = state.challenges.challenges[i];
    if (!myChallenge.isInternalLoading) {
      if (!wasFinished[i] && isFinished(myChallenge)) {
        store.dispatch(renderChallengesList());
        setTimeout(() => {
          loadChallengeServiceProxy(myChallenge._id, props);
        }, getZuffiDelayForApi(true));
      }
    }
  }
}

function sendInternalVotes() {
  sendInternalVotesServiceProxy(false);
}

function reloadChallenges() {
  loadChallengesServiceProxy(false, true);
}

function tick(props) {
  if (DEV_CONFIG.TICKER_ENABELD) {
    tickerData(props);
  }

  sendInternalVotes();
  reloadChallenges();
}

export function stopChallengeTicker() {
  if (tickerStarted) {
    clearInterval(timerId);
    tickerStarted = false;
  }
}
export function startChallengeTicker(props) {
  if (!tickerStarted) {
    tickerStarted = true;
    timerId = setInterval(() => {
      tick(props);
    }, 1000);
  }
}
