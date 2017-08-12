import { setChallengesDateData } from '../actions/challenges';
import { loadChallengeServiceProxy } from '../helper/apiProxy';
import store from '../config/store';

let tickerStarted = false;
let timerId = null;

function tick() {
  store.dispatch(setChallengesDateData());
  const state = store.getState();
  for (let i = 0; i < state.challenges.challenges.length; i += 1) {
    const myChallenge = state.challenges.challenges[i];
    if (!myChallenge.isLoading) {
      if (!myChallenge.wasFinished && myChallenge.isFinished) {
        loadChallengeServiceProxy(myChallenge._id);
      }
    }
  }
}

export function stopChallengeTicker() {
  if (tickerStarted) {
    console.log('STOP TICKER');
    clearInterval(timerId);
    tickerStarted = false;
  } else {
    console.log('TICKER ALREADY STOPPED');
  }
}
export function startChallengeTicker() {
  if (!tickerStarted) {
    tickerStarted = true;
    console.log('START TICKER');
    timerId = setInterval(() => {
      tick();
    }, 1000);
  } else {
    console.log('TICKER ALREADY STARTED');
  }
}
