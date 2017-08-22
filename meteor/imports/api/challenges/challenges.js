import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Challenges = new Mongo.Collection('challenges');

Challenges.allow({
  insert: () => false,
  update: () => true,
  remove: () => false,
});

const ChallengesSchema = new SimpleSchema({
  title: {
    type: String,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
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
