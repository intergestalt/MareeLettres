/*

// TODO (suggestions):

Players origin_id 1
TinderProposals origin_id 1
TinderProposals challenge_id 1
TinderProposals tinderscore -1
Proposals origin_ids: 1
Proposals challenge_id 1
Proposals score: -1
Proposals votes_amount: -1
Proposals score_trending: -1
Letters created_at: -1
*/

import { Proposals } from '../../api/proposals/proposals';
import { TinderProposals } from '../../api/proposals/tinderProposals';
import { Letters } from '../../api/letters/letters';
import { LettersArchive } from '../../api/letters/lettersArchive';
import { Players } from '../../api/players/players';

import buildConfig from '../both/build-config';

// When fastly is on, there is more write than read, so index can be inefficient
//Proposals.rawCollection().createIndex(buildConfig.queries.proposals.sort.popular);
//Proposals.rawCollection().createIndex(buildConfig.queries.proposals.sort.newest);
//Proposals.rawCollection().createIndex(buildConfig.queries.proposals.sort.trending);

TinderProposals.rawCollection().createIndex({ tinderscore: -1 });
TinderProposals.rawCollection().createIndex({ challenge_id: 1 });
TinderProposals.rawCollection().createIndex({ origin_id: 1 });

Letters.rawCollection().createIndex({ created_at: -1 });
LettersArchive.rawCollection().createIndex({ created_at: -1 });

Players.rawCollection().createIndex({ origin_id: 1 });
