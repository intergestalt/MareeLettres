// Import server startup through a single index entry point

if (Object.keys(Meteor.settings).length <= 1 && Object.keys(Meteor.settings.public).length <= 0) {
  console.log('ERROR: Need to start with: $ npm start');
  process.exit(1);
}

// any
import './register-api';
import './status';
import './system-config';

// web (admin)
import './fixtures';
import '../both/accounts';

// web (api)
import './register-rest';

// worker
import './elect-winner';
import './tinder-regenerate';
