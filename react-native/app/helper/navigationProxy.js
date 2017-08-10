import { loadContentServiceProxy } from './apiProxy';

// Navigation

// 1. Main Pages

export function navigateToHowTo(props) {
  loadContentServiceProxy(props);
  props.navigation.navigate('How');
}

export function navigateToAbout(props) {
  loadContentServiceProxy(props);
  props.navigation.navigate('About');
}

export function navigateToVote(props) {
  props.navigation.navigate('Vote');
}

export function navigateToBecome(props) {
  props.navigation.navigate('Become');
}

export function navigateToStream(props) {
  props.navigation.navigate('Stream');
}

// SubPages

export function navigateToChallengeSelector(props, item) {
  props.navigation.navigate('ChallengeSelector', { id: item._id });
}
