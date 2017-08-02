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

console.log(`api prefix: ${Meteor.settings.public.api_prefix}`);
