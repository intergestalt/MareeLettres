import { Meteor } from 'meteor/meteor';

import { Players } from '../players';

Meteor.publish(
  'get.players',
  function getPlayers() {
    if (!this.userId) return;
    return Players.find();
  },
  'get.player',
  function getPlayers(id) {
    if (!this.userId) return;
    return Players.find(id);
  },
);
