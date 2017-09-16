import { NavigationActions } from 'react-navigation';

import { loadContentServiceProxy, sendInternalVotesServiceProxy } from './apiProxy';
import { stopChallengeTicker, startChallengeTicker } from './ticker';
import { setChallengeId, setChallengeView } from '../actions/challenges';
import { manageChallenges, getSelectedChallengeIndex } from './challengesHelper';
import { manageProposals } from './proposalsHelper';
import store from '../config/store';
import { CHALLENGE_VIEWS, SCREENS, MAP_VIEWS } from '../consts';
import { setScreen, setMapView } from '../actions/general';
// Navigation

export function dispatchBackActionToMapOverview(props, mapView) {
  const mode = store.getState().globals.mapView;
  if (mode === mapView) {
    return;
  }
  const backAction = NavigationActions.back({});
  store.dispatch(setMapView(mapView));
  props.navigation.dispatch(backAction);
}

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
    key: null,
    actions: [NavigationActions.navigate({ routeName: 'Root' })],
  });
  props.navigation.dispatch(resetAction);
}

// Main Pages

export function navigateToInfo(props) {
  stopChallengeTicker();
  loadContentServiceProxy(false, true);
  sendInternalVotesServiceProxy(true);
  store.dispatch(setScreen(SCREENS.INFO));
  props.navigation.navigate('Info');
}

export function navigateToBecome(props) {
  stopChallengeTicker();
  sendInternalVotesServiceProxy(true);
  store.dispatch(setScreen(SCREENS.MAP));
  store.dispatch(setMapView(MAP_VIEWS.OVERVIEW));
  props.navigation.navigate('Become');
}

export function navigateToStream(props) {
  stopChallengeTicker();
  sendInternalVotesServiceProxy(true);
  store.dispatch(setScreen(SCREENS.NEWS));
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
  store.dispatch(setScreen(SCREENS.VOTE));
  props.navigation.navigate('Vote');
}
export function popLanguageSelector(props) {
  preNavigateToVote(props);
  props.navigation.goBack();
}

// SubPages
// Map Stack SubPages

export function navigateToMapOverview(props) {
  const mode = store.getState().globals.mapView;
  if (mode === MAP_VIEWS.OVERVIEW) {
    return;
  }
  store.dispatch(setMapView(MAP_VIEWS.OVERVIEW));
  props.navigation.navigate('MapOverview');
}

export function navigateToMapCamera(props) {
  const mode = store.getState().globals.mapView;
  if (mode === MAP_VIEWS.CAMERA) {
    return;
  }
  store.dispatch(setMapView(MAP_VIEWS.CAMERA));
  props.navigation.navigate('MapCamera');
}

export function navigateToLetterSelector(props) {
  const mode = store.getState().globals.mapView;
  if (mode === MAP_VIEWS.LETTER_SELECTOR) {
    return;
  }
  store.dispatch(setMapView(MAP_VIEWS.LETTER_SELECTOR));
  props.navigation.navigate('LetterSelector');
}

export function navigateToQRCodeGet(props) {
  const mode = store.getState().globals.mapView;
  if (mode === MAP_VIEWS.QR_CODE_GET) {
    return;
  }
  store.dispatch(setMapView(MAP_VIEWS.QR_CODE_GET));
  props.navigation.navigate('QRCodeGet');
}

export function navigateToQRCodeSend(props) {
  const mode = store.getState().globals.mapView;
  if (mode === MAP_VIEWS.QR_CODE_SEND) {
    return;
  }
  store.dispatch(setMapView(MAP_VIEWS.QR_CODE_SEND));
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
    // Should not happen
    props.navigation.navigate('Challenges');
  }
}
export function popProposalSubmitter(props, withDispatch = true) {
  const mode = store.getState().challenges.challengeView;
  if (mode === CHALLENGE_VIEWS.DETAIL) {
    return;
  }
  if (withDispatch) {
    store.dispatch(setChallengeView(CHALLENGE_VIEWS.DETAIL));
    manageChallenges(props);
    manageProposals();
  }
  if (!props.navigation.goBack()) {
    // Should not happen
    props.navigation.navigate('ChallengeSelector');
  }
}
export function navigateToSubmit(props, challenge) {
  const mode = store.getState().challenges.challengeView;
  if (mode === CHALLENGE_VIEWS.SUGGEST) {
    return;
  }
  store.dispatch(setChallengeView(CHALLENGE_VIEWS.SUGGEST));
  props.navigation.navigate('Submit', { challenge });
}
