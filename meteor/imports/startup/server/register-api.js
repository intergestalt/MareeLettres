// Register your apis here

import '../../api/challenges/methods';
import '../../api/challenges/server/publications';

import '../../api/proposals/server/publications';

import '../../api/status/server/status';

SimpleRest.configure({
  collections: ['proposals', 'challenges']
});