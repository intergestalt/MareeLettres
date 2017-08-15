import { loadContentServiceProxy } from './apiProxy';
import { stopChallengeTicker, startChallengeTicker } from './ticker';
import { setVoteView } from '../actions/general';
import { setChallengesId } from '../actions/challenges';
import { manageChallenges } from './challengesHelper';
import { manageProposals } from './proposalsHelper';
import store from '../config/store';
import { VOTE_VIEWS } from '../consts';

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

export function navigateToBecome(props) {
  stopChallengeTicker();
  props.navigation.navigate('Become');
}

export function navigateToStream(props) {
  stopChallengeTicker();
  props.navigation.navigate('Stream');
}

export function navigateToVote(props) {
  console.log('TO VOTE');
  manageChallenges();
  manageProposals();
  startChallengeTicker();
  props.navigation.navigate('Vote');
}

// Vote Stack

export function navigateToChallengeSelector(props, id) {
  console.log('FROM LIST TO DETAIL');

  store.dispatch(setVoteView(VOTE_VIEWS.DETAIL));
  store.dispatch(setChallengesId(id));
  manageProposals();
  startChallengeTicker();

  props.navigation.navigate('ChallengeSelector', { id });
}

export function popChallengeSelector(props) {
  console.log('FROM DETAIL TO LIST');

  store.dispatch(setVoteView(VOTE_VIEWS.LIST));
  manageChallenges();

  if (!props.navigation.goBack()) {
    props.navigation.navigate('Challenges');
  }
}
