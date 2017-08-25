import { NavigationActions } from 'react-navigation';

import { loadContentServiceProxy, sendInternalVotesServiceProxy } from './apiProxy';
import { stopChallengeTicker, startChallengeTicker } from './ticker';
import { setChallengeView } from '../actions/general';
import { setChallengesId } from '../actions/challenges';
import { manageChallenges } from './challengesHelper';
import { manageProposals } from './proposalsHelper';
import store from '../config/store';
import { CHALLENGE_VIEWS } from '../consts';

// Navigation

// rootNavigator

export function navigateToLanguageSelector(props) {
  // NavigationActions.navigate({ routeName: 'LanguageSelector' });
  const resetAction = NavigationActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({ routeName: 'Root' }),
      NavigationActions.navigate({ routeName: 'LanguageSelector' }),
    ],
  });
  props.navigation.dispatch(resetAction);
}
// Main Pages

export function navigateToInfo(props) {
  stopChallengeTicker();
  loadContentServiceProxy(false, true);
  sendInternalVotesServiceProxy(true);
  props.navigation.navigate('Info');
}

export function navigateToBecome(props) {
  stopChallengeTicker();
  sendInternalVotesServiceProxy(true);
  props.navigation.navigate('Become');
}

export function navigateToStream(props) {
  stopChallengeTicker();
  sendInternalVotesServiceProxy(true);
  props.navigation.navigate('Stream');
}

function preNavigateToVote() {
  manageChallenges();
  manageProposals();
  startChallengeTicker();
  sendInternalVotesServiceProxy(true);
}

export function navigateToVote(props) {
  preNavigateToVote();
  props.navigation.navigate('Vote');
}
export function popToLanguageSelector(props) {
  preNavigateToVote();
  props.navigation.goBack();
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
  manageChallenges();
  manageProposals();
  startChallengeTicker();
  sendInternalVotesServiceProxy(true);
  props.navigation.navigate('ChallengeSelector', { id });
}

export function popChallengeSelector(props) {
  store.dispatch(setChallengeView(CHALLENGE_VIEWS.LIST));
  manageChallenges();
  sendInternalVotesServiceProxy(true);

  if (!props.navigation.goBack()) {
    props.navigation.navigate('Challenges');
  }
}
