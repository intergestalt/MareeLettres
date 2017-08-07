import { Challenges } from '../challenges/challenges';
import { Proposals } from './proposals';

console.log('attach hooks');

Proposals.after.insert(function (userId, doc) {
  Challenges.update(doc.challenge_id, {
    $inc: {
      proposals_amount: 1,
    },
  });
});

Proposals.after.remove(function (userId, doc) {
  Challenges.update(doc.challenge_id, {
    $inc: {
      proposals_amount: -1,
    },
  });
});
