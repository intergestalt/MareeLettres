import Expo from 'expo';

let server = 'dev'; // set server type here ( local | dev | staging | production)  [ can be overwritten by app.json ]

const servers = {
  local: {
    protocol: 'http',
  },
  dev: {
    // uri: 'maree-dev.herokuapp.com',
    // uri: 'api-dev.lettres.paris',
    uri: 'maree-dev-herokuapp-com.global.ssl.fastly.net',
    protocol: 'https',
  },
  staging: {
    uri: 'maree-staging.herokuapp.com',
    protocol: 'https',
  },
  production: {
    // uri: 'api.lettres.paris',
    uri: 'mareedeslettres.herokuapp.com',
    protocol: 'https',
  },
};

// use server from app.json if present
if (Expo.Constants.manifest.extra && Expo.Constants.manifest.extra.server) {
  const s = Expo.Constants.manifest.extra.server;
  if (servers[s]) {
    server = s;
  } else {
    if (!servers[server]) server = 'dev'; // fallback
    console.log(
      `WARNIING - server config in app.json is incorrect. using ${server} server as set in config.js .`,
    );
  }
}

if (server === 'local') {
  servers.local.uri = `${Expo.Constants.linkingUri.match(/:\/\/(.*):/)[1]}:3000`;
}

const serverAddress = servers[server].uri;
const serverProtocol = servers[server].protocol;

console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`- Server: ${server}`);
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

  NETWORK_LATENCY: null,
  WINNER_ELECTION_INTERVAL: null,

  UPDATE_CHALLENGES_AFTER: null,
  UPDATE_PROPOSALS_AFTER: null,
  UPDATE_CONTENT_AFTER: null,
  SEND_INTERNAL_VOTES_AFTER: null,
  DISPLAY_NEXT_NETWORK_ERROR_AFTER: null,
  SUGGESTIONS_CLOSE_EARLIER: null,

  DELAY_DB_CALL: null, // random interval in which a new config is loaded
  DELAY_DB_CALL_OFFSET: null, // additional delay to load finished challenge
};

export const DEV_CONFIG = {
  USE_CUSTOM_END_DATE: false,
  CUSTOM_END_DATE_ID: 'fixture_2',
  CUSTOM_END_DATE: '2017-09-09T18:34:00.000Z',

  SWAP_RELOADED_PROPOSALS: false,
  SWAP_RELOADED_PROPOSALS_COUNT: 40,

  TICKER_ENABELD: true,
};
