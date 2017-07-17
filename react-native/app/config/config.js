/* BEGIN SET YOUR LOCAL IP ADDRESS HERE */

const DEV_MAREE_SERVER_ADDRESS = '192.168.178.25:3000';
// const DEV_MAREE_SERVER_ADDRESS = 'maree.herokuapp.com';

/* END SET YOUR LOCAL IP ADDRESS HERE */

const LIVE_MAREE_SERVER_ADDRESS = 'maree.herokuapp.com';

const server_address = (process.env.NODE_ENV == 'development' && DEV_MAREE_SERVER_ADDRESS ? DEV_MAREE_SERVER_ADDRESS : LIVE_MAREE_SERVER_ADDRESS);

console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`- Server Address: ${server_address}`);

export default {
  SERVER_ADDRESS: server_address,
  SERVER_URL: `ws://${server_address}/websocket`,
};
