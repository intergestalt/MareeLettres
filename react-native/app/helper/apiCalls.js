import config from '../config/config';

export const callAllChallenges = () => {
  console.log('Load Challenges');
  const url = `${config.API_PREFIX}challenges/`;
  console.log(url);
  return fetch(url);
};

export const callOneChallenge = (action) => {
  console.log(`Load Challenge ${action.challengeId}`);
  const url = `${config.API_PREFIX}challenges/${action.challengeId}!`;
  console.log(url);
  return fetch(url);
};

export const callProposals = (action) => {
  console.log('Load Proposals');
  const url = `${config.API_PREFIX}challenges/${action.proposalId}/proposals?limit=15`;
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
