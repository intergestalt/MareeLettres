import config from '../config/config';

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

export const callProposals = () => {
  console.log('Load Proposals');
  const url = `${config.API_PREFIX}proposals?limit=15/`;
  console.log(url);
  return fetch(url);
};

export const callAllContent = () => {
  console.log('Load Content');
  const url = `${config.API_PREFIX}content/`;
  console.log(url);
  return fetch(url);
};
