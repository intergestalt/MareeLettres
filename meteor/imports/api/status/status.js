import { Mongo } from 'meteor/mongo';

export const Status = new Mongo.Collection('status');


Status.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

