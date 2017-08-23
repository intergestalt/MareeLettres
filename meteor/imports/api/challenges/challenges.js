import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['description']);

const Challenges = new Mongo.Collection('challenges');

Challenges.allow({
  insert: () => false,
  update: () => true,
  remove: () => false,
});

const MultilingualStringSchema = new SimpleSchema({
  en: {
    type: String,
  },
  fr: {
    type: String,
  },
});

const ChallengesSchema = new SimpleSchema({
  title: {
    type: MultilingualStringSchema,
  },
  start_date: {
    type: Date,
    label: 'The date at which voting starts',
  },
  end_date: {
    type: Date,
    label: 'The date at which voting ends',
  },
  proposals_end_date: {
    type: Date,
    label: 'The date at which submission of proposals ends',
  },
  proposals_amount: {
    type: Number,
    optional: true,
  },
  winningProposal: {
    type: Object, // TODO: Add ProposalsSchama here
    optional: true,
  },
});

export { Challenges, ChallengesSchema };
