import { Mongo } from 'meteor/mongo';
import { TinderProposalsSchema } from './schema';

const TinderProposals = new Mongo.Collection('tinder_proposals');

TinderProposals.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

export { TinderProposals, TinderProposalsSchema };
