import { Challenges } from '../challenges/challenges';
import { Proposals } from './proposals';

console.log("attach hooks")

Proposals.after.insert(function (userId, doc) {
  console.log("after")
  Challenges.update(doc.challenge_id, {
    $inc: {
      proposals_amount: 1,
    }
  })
});
