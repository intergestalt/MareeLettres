import { Challenges } from '../challenges/challenges';
import { Proposals } from './proposals';

console.log('attach players hooks');

Proposals.before.insert(function (userId, doc) {
  doc.created_at = new Date();
});

Proposals.before.update(function (userId, doc, fieldNames, modifier, options) {
  if (typeof modifier.$set === "undefined") return;
  if (
    typeof modifier.$set.last_seen !== "undefined"
  ) {
    modifier.$set.last_seen = new Date();
  }
});