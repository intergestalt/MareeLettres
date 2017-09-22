import { Players } from './players';

console.log('attach players hooks');

Players.before.insert(function (userId, doc) {
  doc.created_at = new Date();
});

Players.before.update(function (userId, doc, fieldNames, modifier, options) {
  if (typeof modifier.$set === "undefined") return;
  if (
    typeof modifier.$set.last_seen === "undefined"
  ) {
    modifier.$set.last_seen = new Date();
  }
});
