import { Meteor } from 'meteor/meteor';

import { Players } from '../players';

Meteor.publish(
  'get.players',
  function getPlayers(data) {
    if (!this.userId) return;

    const options = {}

    if (data.limit) options.limit = data.limit;
    if (data.fields) options.fields = data.fields;
    if (data.sort) options.sort = data.sort;

    return Players.find({}, options);
  },

  'get.player',
  function getPlayers(id) {
    if (!this.userId) return;
    return Players.find(id);
  },

  'get.players.amount',
  function getPlayers() {
    if (!this.userId) return;

    return Players.find().count();
  },

);
