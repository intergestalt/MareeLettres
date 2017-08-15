import store from '../config/store';
import { loadChallengesServiceProxy } from './apiProxy';
import { VOTE_VIEWS } from '../consts';
import { setChallengesId, setChallengesIndex } from '../actions/challenges';

export function manageChallenges() {
  if (store.getState().globals.voteView === VOTE_VIEWS.LIST) {
    loadChallengesServiceProxy();
    store.dispatch(setChallengesId(null));
    store.dispatch(setChallengesIndex(-1));
  }
}

export function upDateSelectedChallengeIndex() {
  let index = -1;
  const id = store.getState().challenges.selectedChallengeId;

  const challenges = store.getState().challenges.challenges;
  for (let i = 0; i < challenges.length; i += 1) {
    const challenge = challenges[i];
    if (challenge._id === id) {
      index = i;
    }
  }
  if (index === -1) {
    if (challenges.length > 0) {
      index = 0;
      store.dispatch(setChallengesId(challenges[0]._id));
    } else {
      store.dispatch(setChallengesId(null));
      store.dispatch(setChallengesIndex(-1));
      return;
    }
  }
  store.dispatch(setChallengesIndex(index));
}

export function getIndexFromId(id) {
  let index = 0;
  for (let i = 0; i < this.props.challenges.length; i += 1) {
    const challenge = this.props.challenges[i];
    if (challenge._id === id) {
      index = i;
    }
  }
  this.selectedChallengeIndex = index;
}
