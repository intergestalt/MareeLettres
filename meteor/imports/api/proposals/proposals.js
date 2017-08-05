import { Mongo } from 'meteor/mongo';

export const Proposals = new Mongo.Collection('proposals');

Proposals._ensureIndex({ challenge_id: 1 });

Proposals.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});
