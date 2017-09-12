import { Challenges } from '../challenges/challenges';
import { Proposals } from './proposals';

console.log('attach proposals hooks');

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

Proposals.before.insert(function (userId, doc) {
  doc.created_at = new Date();
});

Proposals.before.update(function (userId, doc, fieldNames, modifier, options) {
  if (typeof modifier.$set === "undefined") return;
  if (
    typeof modifier.$set.in_review !== "undefined" ||
    typeof modifier.$set.blocked !== "undefined"
  ) {
    modifier.$set.reviewed_at = new Date();
  }
});