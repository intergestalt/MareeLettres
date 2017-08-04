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

if (typeof Meteor.settings.public.api_prefix === 'undefined') {
  console.log('Start with: npm start');
}

console.log(Meteor.settings);

console.log(`api prefix: ${Meteor.settings.public.api_prefix}`);
