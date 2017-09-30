import { Players } from '../players/players';
import { Proposals } from '../proposals/proposals';
import { Letters } from '../letters/letters';

Meteor.publish('counts', function (data) {
  if (data.indexOf("players") >= 0) {
    Counts.publish(this, 'players', Players.find(), { noReady: false, fastCount: true });
  }
  if (data.indexOf("proposals") >= 0) {
    Counts.publish(this, 'proposals', Proposals.find(), { noReady: false, fastCount: true });
  }
  if (data.indexOf("letters") >= 0) {
    Counts.publish(this, 'letters', Letters.find(), { noReady: false, fastCount: true });
  }
});
