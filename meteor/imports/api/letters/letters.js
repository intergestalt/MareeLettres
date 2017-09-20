import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { LettersSchema } from './schema';

const Letters = new Mongo.Collection('letters');

Letters.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

export { Letters, LettersSchema };
