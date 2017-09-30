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
);

Meteor.publish(
  'get.player',
  function getPlayer(data) {
    if (!this.userId) return;
    const origin_id = data.origin_id;
    if (!origin_id) return;
    return Players.find({ origin_id: origin_id });
  },
);
