import { Mongo } from 'meteor/mongo';

export const Challenges = new Mongo.Collection('chellenges');

Challenges.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});
