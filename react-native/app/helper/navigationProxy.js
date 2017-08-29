import { NavigationActions } from 'react-navigation';

import { loadContentServiceProxy, sendInternalVotesServiceProxy } from './apiProxy';
import { stopChallengeTicker, startChallengeTicker } from './ticker';
import { setChallengeId, setChallengeView } from '../actions/challenges';
import { manageChallenges, getSelectedChallengeIndex } from './challengesHelper';
import { manageProposals } from './proposalsHelper';
import store from '../config/store';
import { CHALLENGE_VIEWS } from '../consts';

// Navigation

// rootNavigator

export function navigateToLanguageSelector(props) {
  const resetAction = NavigationActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({ routeName: 'Root' }),
      NavigationActions.navigate({ routeName: 'LanguageSelector' }),
    ],
  });
  props.navigation.dispatch(resetAction);
}
export function navigateToRoot(props) {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Root' })],
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

function preNavigateToVote(props) {
  manageChallenges(props);
  manageProposals();
  startChallengeTicker(props);
  sendInternalVotesServiceProxy(true);
}

export function navigateToVote(props) {
  preNavigateToVote(props);
  props.navigation.navigate('Vote');
}
export function popLanguageSelector(props) {
  preNavigateToVote(props);
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
}

// Vote Stack

export function navigateToChallengeSelector(props, id) {
  const mode = store.getState().challenges.challengeView;
  if (mode === CHALLENGE_VIEWS.DETAIL) {
    return;
  }
  const index = getSelectedChallengeIndex(id);
  if (index === -1) {
    return;
  }
  props.dispatch(setChallengeId(id, props));
  if (store.getState().challenges.selectedChallengeIndex === -1) {
    return;
  }
  store.dispatch(setChallengeView(CHALLENGE_VIEWS.DETAIL));

  manageChallenges(props);
  manageProposals();
  startChallengeTicker(props);
  sendInternalVotesServiceProxy(true);
  props.navigation.navigate('ChallengeSelector');
}

export function popChallengeSelector(props, withDispatch = true) {
  const mode = store.getState().challenges.challengeView;
  if (mode === CHALLENGE_VIEWS.LIST) {
    return;
  }
  if (withDispatch) {
    store.dispatch(setChallengeView(CHALLENGE_VIEWS.LIST));
    manageChallenges(props);
    sendInternalVotesServiceProxy(true);
  }
  if (!props.navigation.goBack()) {
    props.navigation.navigate('Challenges');
  }
}

export function navigateToSubmit(props, challenge) {
  props.navigation.navigate('Submit', { challenge });
}
