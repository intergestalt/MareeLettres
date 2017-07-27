// Register your apis here

import '../../api/locations/methods';
import '../../api/locations/server/publications';

import '../../api/challenges/server/publications';

import '../../api/proposals/server/publications';

import '../../api/status/server/status';

SimpleRest.configure({
  collections: ['proposals', 'challenges']
});