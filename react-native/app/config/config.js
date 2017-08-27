/* BEGIN SET YOUR LOCAL IP ADDRESS HERE */

// const DEV_MAREE_SERVER_ADDRESS = `${Expo.Constants.linkingUri.match(/:\/\/(.*):/)[1]}:3000`;
const DEV_MAREE_SERVER_ADDRESS = 'maree.herokuapp.com';

/* END SET YOUR LOCAL IP ADDRESS HERE */

const DEV_MAREE_SERVER_PROTOCOL = 'http';

// LIVE setup
const LIVE_MAREE_SERVER_PROTOCOL = 'https';
const LIVE_MAREE_SERVER_ADDRESS = 'maree.herokuapp.com';

const serverAddress =
  process.env.NODE_ENV === 'development' && DEV_MAREE_SERVER_ADDRESS
    ? DEV_MAREE_SERVER_ADDRESS
    : LIVE_MAREE_SERVER_ADDRESS;

const serverProtocol =
  process.env.NODE_ENV === 'development' && DEV_MAREE_SERVER_PROTOCOL
    ? DEV_MAREE_SERVER_PROTOCOL
    : LIVE_MAREE_SERVER_PROTOCOL;

console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`- Server Address: ${serverAddress}`);

export default {
  SERVER_ADDRESS: serverAddress,
  SERVER_URL: `${serverProtocol}://${serverAddress}/`,
  API_PREFIX: `${serverProtocol}://${serverAddress}/api/`,
};

// Some load cnfig

export const LOAD_CONFIG = {
  REQUEST_TIMEOUT: 10000,
  DEFAULT_PROPOSAL_LIST_LIMIT: 10,
  DEFAULT_PROPOSAL_NEW_BATCH: 30,
  PROPOSAL_RELOAD_LIST_OFFSET: 0.8,
  DEFAULT_PROPOSAL_TINDER_LIMIT: 30,
  PROPOSAL_RELOAD_TINDER_OFFSET: 10,
  INTERNAL_VOTES_OFFSET: 9,

  // Proposals
  // On Press of the list types or list vs tinder button
  LOAD_QUIET_CHALLENGE_SELECTOR: true,
  // On Press on the challenge List.
  LOAD_QUIET_TO_CHALLENGE_SELECTOR: true,
  LOAD_QUIET_PULL_DOWN_UPDATE: true,
  LOAD_QUIET_PULL_UP_UPDATE: true,
  LOAD_QUIET_TINDER: true,

  LOAD_QUIET_CHALLENGES_LIST: true,

  UPDATE_CHALLENGES_AFTER: 100000,
  UPDATE_PROPOSALS_AFTER: 100000,
  UPDATE_CONTENT_AFTER: 100000,
  SEND_INTERNAL_VOTES_AFTER: 10000,
};

export const DEV_CONFIG = {
  USE_CUSTOM_END_DATE: true,
  CUSTOM_END_DATE_ID: 'fixture_2',
  CUSTOM_END_DATE: '2017-08-27T12:46:50.000Z',

  SWAP_RELOADED_PROPOSALS: false,
  SWAP_RELOADED_PROPOSALS_COUNT: 40,

  TICKER_ENABELD: true,
};
