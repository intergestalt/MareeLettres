import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Proposals = new Mongo.Collection('proposals');

if (Meteor.isServer) {
  Proposals._ensureIndex({ challenge_id: 1 });
}

Proposals.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});
