import { Mongo } from 'meteor/mongo';
import { ProposalsSchema } from './schema';

const Proposals = new Mongo.Collection('proposals');

Proposals.allow({
  insert: () => false,
  update: () => (userId) => (userId || false),
  remove: () => (userId) => (userId || false),
});

export { Proposals, ProposalsSchema }