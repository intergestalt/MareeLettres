import config from '../config/config';
import { PROPOSAL_LIST_MODES, PROPOSAL_VIEWS } from '../consts';

export const callAllChallenges = () => {
  console.log('Load Challenges');
  const url = `${config.API_PREFIX}challenges/`;
  console.log(url);
  return fetch(url);
};

export const callOneChallenge = (action) => {
  console.log(`Load Challenge ${action.challengeId}`);
  const url = `${config.API_PREFIX}challenges/${action.challengeId}`;
  console.log(url);
  return fetch(url);
};

export const callProposals = (action) => {
  console.log('Load Proposals');
  let url = null;
  if (action.proposalView === PROPOSAL_VIEWS.TINDER) {
    url = `${config.API_PREFIX}challenges/${action.challengeId}/proposals?limit=${action.limit}`;
  } else if (action.proposalListMode === PROPOSAL_LIST_MODES.MOST) {
    url = `${config.API_PREFIX}challenges/${action.challengeId}/proposals?limit=${action.limit}`;
  } else if (action.proposalListMode === PROPOSAL_LIST_MODES.NEWEST) {
    url = `${config.API_PREFIX}challenges/${action.challengeId}/proposals?limit=${action.limit}`;
  } else if (action.proposalListMode === PROPOSAL_LIST_MODES.TRENDING) {
    url = `${config.API_PREFIX}challenges/${action.challengeId}/proposals?limit=${action.limit}`;
  }
  console.log(url);
  return fetch(url);
};

export const callAllContent = () => {
  console.log('Load Content');
  const url = `${config.API_PREFIX}content/`;
  console.log(url);
  return fetch(url);
};

export const callLetters = () => {
  console.log('Load letters');
  const url = `${config.API_PREFIX}letters/`;
  console.log(url);
  return fetch(url);
};
