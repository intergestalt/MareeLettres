// Register your apis here

import '../../api/challenges/methods';
import '../../api/challenges/server/publications';

import '../../api/proposals/server/publications';
import '../../api/proposals/hooks';

import '../../api/status/server/status';

import '../../api/content/server/content';

SimpleRest.configure({
  collections: ['proposals', 'challenges', 'content'],
});

if (Object.keys(Meteor.settings).length <= 1 && Object.keys(Meteor.settings.public).length <= 0) {
  console.log('ERROR: Need to start with: $ npm start');
  process.exit(1);
}

console.log(`api prefix: ${Meteor.settings.public.api_prefix}`);
