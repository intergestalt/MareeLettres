import { Challenges } from './challenges';
import { Proposals } from '../proposals/proposals';

console.log('attach challenges hooks');

Challenges.before.insert(function (userId, doc) {
  doc.proposals_amount = Proposals.find({ challenge_id: doc._id }).count();
  console.log(doc);
});
