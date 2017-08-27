import { setChallengesDateData } from '../actions/challengesTicker';
import { loadChallengeServiceProxy, sendInternalVotesServiceProxy } from '../helper/apiProxy';
import store from '../config/store';

import { isFinished, TICKER_END } from '../helper/dateFunctions';
import { DEV_CONFIG } from '../config/config';

let tickerStarted = false;
let timerId = null;

function tickerData(props) {
  const state = store.getState();
  // get old finished
  const wasFinished = new Array(state.challenges.challenges.length);
  for (let i = 0; i < state.challenges.challenges.length; i += 1) {
    const myChallenge = state.challenges.challenges[i];
    const myTickerData = state.challengesTicker[myChallenge._id];
    if (myTickerData.tickerString === TICKER_END) {
      wasFinished[i] = true;
    } else {
      wasFinished[i] = false;
    }
  }

  store.dispatch(setChallengesDateData());

  // check if it is finished now.
  for (let i = 0; i < state.challenges.challenges.length; i += 1) {
    const myChallenge = state.challenges.challenges[i];
    if (!myChallenge.isInternalLoading) {
      if (!wasFinished[i] && isFinished(myChallenge)) {
        loadChallengeServiceProxy(myChallenge._id, props);
      }
    }
  }
}

function sendInternalVotes() {
  sendInternalVotesServiceProxy(false);
}

function tick(props) {
  tickerData(props);
  sendInternalVotes();
}
export function stopChallengeTicker() {
  if (tickerStarted) {
    if (DEV_CONFIG.TICKER_ENABELD) {
      clearInterval(timerId);
    }
    tickerStarted = false;
  }
}
export function startChallengeTicker(props) {
  if (!tickerStarted) {
    tickerStarted = true;
    if (DEV_CONFIG.TICKER_ENABELD) {
      timerId = setInterval(() => {
        tick(props);
      }, 1000);
    }
  }
}
