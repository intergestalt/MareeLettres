// Import server startup through a single index entry point

if (Object.keys(Meteor.settings).length <= 1 && Object.keys(Meteor.settings.public).length <= 0) {
  console.log('ERROR: Need to start with: $ npm start');
  process.exit(1);
}

// any
import './register-api';
import './status';
import './system-config';
import '../both/build-config';
import './register-rest';
import './fixtures';
import './db_indexes';

// web (admin)
import '../both/accounts';

// web (api)
//   admin includes API (doesn't have to. just does.)
//   the reason is partially that rest and publish api are not separeted well (yet)

// worker
if (!process.env.MAREE_STARTUP_WORKER || process.env.MAREE_STARTUP_WORKER && process.env.MAREE_STARTUP_WORKER !== 'false') {
  console.log('STARTING WORKER');
  import './elect-winner';
  import './tinder-regenerate';
  import './trending-regenerate';
  import './seed-letters';
  import './archive-letters';
  import './status-cleanup';
}
