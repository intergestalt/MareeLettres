import { Mongo } from 'meteor/mongo';

export const Proposals = new Mongo.Collection('proposals');

/*
Challenges.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});
*/

