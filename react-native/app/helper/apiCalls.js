import config from '../config/config';
import { PROPOSAL_LIST_MODES, PROPOSAL_VIEWS } from '../consts';

export const callLoadUser = (action) => {
  const url = `${config.API_PREFIX}players/${action.originId}`;
  console.log('API CALL: callLoadUser');
  console.log(url);
  return fetch(url);
};

export const callSendUserVotes = (action) => {
  const url = `${config.API_PREFIX}players/${action.originId}/votes`;
  console.log('API CALL: callSendUserVotes');
  console.log(url);
  const body = {};
  const votes = {};
  const proposalIds = Object.keys(action.internalVotes.internalVotes);

  for (let i = 0; i < proposalIds.length; i += 1) {
    const proposalId = proposalIds[i];
    votes[proposalId] = action.internalVotes.internalVotes[proposalId].bool;
  }
  body.votes = votes;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const callAllChallenges = () => {
  const url = `${config.API_PREFIX}challenges/`;
  console.log('API CALL: callAllChallenges');
  console.log(url);
  return fetch(url);
};

export const callOneChallenge = (action) => {
  const url = `${config.API_PREFIX}challenges/${action.challengeId}`;
  console.log('API CALL: callOneChallenge');
  console.log(url);
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
  console.log('API CALL: callProposals');
  console.log(url);
  return fetch(url);
};

export const callAllContent = () => {
  const url = `${config.API_PREFIX}content/`;
  console.log('API CALL: callAllContent');
  console.log(url);
  return fetch(url);
};

export const callLetters = () => {
  const url = `${config.API_PREFIX}letters/`;
  console.log('API CALL: callLetters');
  console.log(url);
  return fetch(url);
};
