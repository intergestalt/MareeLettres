import { Mongo } from 'meteor/mongo';

export const Challenges = new Mongo.Collection('challenges');

/*
Challenges.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});
*/
