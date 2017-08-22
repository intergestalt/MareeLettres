import config from '../config/config';
import { PROPOSAL_LIST_MODES, PROPOSAL_VIEWS } from '../consts';

export const callAllChallenges = () => {
  const url = `${config.API_PREFIX}challenges/`;
  return fetch(url);
};

export const callOneChallenge = (action) => {
  const url = `${config.API_PREFIX}challenges/${action.challengeId}`;
  return fetch(url);
};

export const callProposals = (action) => {
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
  return fetch(url);
};

export const callAllContent = () => {
  const url = `${config.API_PREFIX}content/`;
  return fetch(url);
};

export const callLetters = () => {
  const url = `${config.API_PREFIX}letters/`;
  return fetch(url);
};
