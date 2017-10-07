import { Mongo } from 'meteor/mongo';

const Votes = new Mongo.Collection('votes');

Votes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});
