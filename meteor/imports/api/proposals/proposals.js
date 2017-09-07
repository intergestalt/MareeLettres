import { Mongo } from 'meteor/mongo';
import { ProposalsSchema } from './schema';

const Proposals = new Mongo.Collection('proposals');

Proposals.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

export { Proposals, ProposalsSchema }