import { loadContentServiceProxy } from './apiProxy';
import { stopChallengeTicker, startChallengeTicker } from './ticker';

// import { NavigationActions } from 'react-navigation';
import { setChallengeView } from '../actions/general';
import { setChallengesId } from '../actions/challenges';
import { manageChallenges } from './challengesHelper';
import { manageProposals } from './proposalsHelper';
import store from '../config/store';
import { CHALLENGE_VIEWS } from '../consts';

// Navigation

// 1. Main Pages

export function navigateToInfo(props) {
  stopChallengeTicker();
  loadContentServiceProxy(false, true);
  props.navigation.navigate('Info');
}

export function navigateToBecome(props) {
  stopChallengeTicker();
  props.navigation.navigate('Become');
}

export function navigateToStream(props) {
  stopChallengeTicker();
  props.navigation.navigate('Stream');
}

export function navigateToVote(props) {
  manageChallenges();
  manageProposals();
  startChallengeTicker();
  props.navigation.navigate('Vote');
}

// SubPages
// Map Stack SubPages

export function navigateToMapOverview(props) {
  props.navigation.navigate('MapOverview');
}

export function navigateToMapCamera(props) {
  props.navigation.navigate('MapCamera');
}

export function navigateToLetterSelector(props) {
  props.navigation.navigate('LetterSelector');
}

export function navigateToQRCodeGet(props) {
  props.navigation.navigate('QRCodeGet');
}

export function navigateToQRCodeSend(props) {
  props.navigation.navigate('QRCodeSend');

  /*
  const navigateAction = NavigationActions.navigate({
    routeName: 'QRCodeSend',
    params: {visible: false},
  });
  props.navigation.dispatch(navigateAction); */
}

// Vote Stack

export function navigateToChallengeSelector(props, id) {
  const mode = store.getState().globals.challengeView;
  if (mode === CHALLENGE_VIEWS.DETAIL) {
    return;
  }
  store.dispatch(setChallengeView(CHALLENGE_VIEWS.DETAIL));
  store.dispatch(setChallengesId(id));
  manageProposals();
  startChallengeTicker();
  props.navigation.navigate('ChallengeSelector', { id });
}

export function popChallengeSelector(props) {
  store.dispatch(setChallengeView(CHALLENGE_VIEWS.LIST));
  manageChallenges();

  if (!props.navigation.goBack()) {
    props.navigation.navigate('Challenges');
  }
}
