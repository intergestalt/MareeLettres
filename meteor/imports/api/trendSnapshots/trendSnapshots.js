import { Mongo } from 'meteor/mongo';

export const TrendSnapshots = new Mongo.Collection('trend_snapshots');

TrendSnapshots.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

