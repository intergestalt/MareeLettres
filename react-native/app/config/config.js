/* BEGIN SET YOUR LOCAL IP ADDRESS HERE */

// const DEV_MAREE_SERVER_ADDRESS = '172.20.10.2:3000';
// const DEV_MAREE_SERVER_ADDRESS = '192.168.178.83:3000';
const DEV_MAREE_SERVER_ADDRESS = 'maree.herokuapp.com';

/* END SET YOUR LOCAL IP ADDRESS HERE */

const LIVE_MAREE_SERVER_ADDRESS = 'maree.herokuapp.com';

const serverAddress =
  process.env.NODE_ENV === 'development' && DEV_MAREE_SERVER_ADDRESS
    ? DEV_MAREE_SERVER_ADDRESS
    : LIVE_MAREE_SERVER_ADDRESS;

console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`- Server Address: ${serverAddress}`);

export default {
  SERVER_ADDRESS: serverAddress,
  SERVER_URL: `https://${serverAddress}/`,
  API_PREFIX: `https://${serverAddress}/api/`,
};

// Some load cnfig

export const LOAD_CONFIG = {
  DEFAULT_PROPOSAL_LIMIT: 300,
  // Proposals
  LOAD_QUIET_CHALLENGE_SELECTOR: true,
  LOAD_QUIET_TO_CHALLENGE_SELECTOR: false,
  LOAD_QUIET_PULL_DOWN_UPDATE: true,
  LOAD_QUIET_PULL_UP_UPDATE: true,

  UPDATE_PROPOSALS_AFTER: 10000,
};
