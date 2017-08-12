import { loadContent } from '../actions/content';
import { loadChallenge, loadChallenges } from '../actions/challenges';
import { loadLetters } from '../actions/letters';

export function loadContentServiceProxy(props) {
  if (props.content.isLoading) {
    console.log('Content isLoading');
    return;
  }
  if (props.content.isLoaded) {
    console.log('Content isLoaded');
    return;
  }
  props.dispatch(loadContent());
}

export function loadChallengeServiceProxy(props, challengeId) {
  props.dispatch(loadChallenge(challengeId));
}

export function loadChallengesServiceProxy(props) {
  props.dispatch(loadChallenges());
}

export function loadLettersServiceProxy(props) {
  props.dispatch(loadLetters());
}
