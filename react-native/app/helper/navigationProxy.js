import { loadContentServiceProxy } from './apiProxy';
import { stopChallengeTicker, startChallengeTicker } from './ticker';

// Navigation

// 1. Main Pages

export function navigateToHowTo(props) {
  stopChallengeTicker();
  loadContentServiceProxy(props.content.isLoading, props.content.isLoaded);
  props.navigation.navigate('How');
}

export function navigateToAbout(props) {
  stopChallengeTicker();
  loadContentServiceProxy(props.content.isLoading, props.content.isLoaded);
  props.navigation.navigate('About');
}

export function navigateToVote(props) {
  startChallengeTicker();
  props.navigation.navigate('Vote');
}

export function navigateToBecome(props) {
  stopChallengeTicker();
  props.navigation.navigate('Become');
  props.navigation.navigate('MapOverview');
}

export function navigateToStream(props) {
  stopChallengeTicker();
  props.navigation.navigate('Stream');
}

// SubPages
// Map Stack SubPages

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

export function navigateToChallengeSelector(props, id) {
  startChallengeTicker();
  props.navigation.navigate('ChallengeSelector', { id });
  /* props.navigation.dispatch({
    type: 'ReplaceCurrentScreen',
    routeName: 'ChallengeSelector',
    params: { id },
    key: 'ChallengeSelector',
  }); */
}

// Other

export function popChallengeSelector(props) {
  /* props.navigation.dispatch({
    type: 'ReplaceCurrentScreen',
    routeName: 'Challenges',
    params: {},
    key: 'Challenges',
  }); */

  if (!props.navigation.goBack()) {
    props.navigation.navigate('Challenges');
  }
}
