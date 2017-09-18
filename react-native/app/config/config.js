import Expo from 'expo';

const servers = {
  local: {
    uri: `${Expo.Constants.linkingUri.match(/:\/\/(.*):/)[1]}:3000`,
    protocol: 'http',
  },
  dev: {
    uri: 'maree.herokuapp.com',
    protocol: 'https',
  },
  staging: {
    uri: 'serene-everglades-41181.herokuapp.com',
    protocol: 'https',
  },
  production: {
    uri: 'mareedeslettres.herokuapp.com',
    protocol: 'https',
  },
};

let server = 'dev';
if(Expo.Constants.manifest.extra) {
  server = Expo.Constants.manifest.extra.server;
}

const serverAddress = servers[server].uri;
const serverProtocol = servers[server].protocol;

console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`- Server Address: ${serverAddress}`);

export default {
  SERVER_NAME: server,
  SERVER_ADDRESS: serverAddress,
  SERVER_URL: `${serverProtocol}://${serverAddress}/`,
  API_PREFIX: `${serverProtocol}://${serverAddress}/api/`,
};

/* Just a placeholder for all the state.config.
  Everything is loaded inside with keys of state to upper case.
  be sure to have the used keys inside initial state. They are not deleted,
  even if not comming via API

Usage:
import { DYNAMIC_CONFIG } from './config';
DYNAMIC_CONFIG.REQUEST_TIMEOUT;
*/
// class DynamicConfig {}
export const DYNAMIC_CONFIG = {
  REQUEST_TIMEOUT: null,
  DEFAULT_PROPOSAL_LIST_LIMIT: null,
  DEFAULT_PROPOSAL_NEW_BATCH: null, // For List reload, if scrolling reached ends
  PROPOSAL_RELOAD_LIST_OFFSET: null,
  DEFAULT_PROPOSAL_TINDER_LIMIT: null,
  PROPOSAL_RELOAD_TINDER_OFFSET: null,
  INTERNAL_VOTES_OFFSET: null,

  // Proposals
  // On Press of the list types or list vs tinder button
  LOAD_QUIET_CHALLENGE_SELECTOR: null,
  // On Press on the challenge List.
  LOAD_QUIET_TO_CHALLENGE_SELECTOR: null,
  LOAD_QUIET_PULL_DOWN_UPDATE: null,
  LOAD_QUIET_PULL_UP_UPDATE: null,
  LOAD_QUIET_TINDER: null,
  LOAD_QUIET_PROPOSAL: null,

  LOAD_QUIET_CHALLENGES_LIST: null,

  UPDATE_CHALLENGES_AFTER: null,
  UPDATE_PROPOSALS_AFTER: null,
  UPDATE_CONTENT_AFTER: null,
  SEND_INTERNAL_VOTES_AFTER: null,
  DISPLAY_NEXT_NETWORK_ERROR_AFTER: null,
  SUGGESTIONS_CLOSE_EARLIER: null,
};

export const DEV_CONFIG = {
  USE_CUSTOM_END_DATE: false,
  CUSTOM_END_DATE_ID: 'fixture_2',
  CUSTOM_END_DATE: '2017-09-09T18:34:00.000Z',

  SWAP_RELOADED_PROPOSALS: false,
  SWAP_RELOADED_PROPOSALS_COUNT: 40,

  TICKER_ENABELD: true,
};
