import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { AvailableLetters } from 'maree-lettres-shared';

const Challenges = new Mongo.Collection('challenges');

Challenges.allow({
  insert: () => false,
  update: (userId) => (userId || false),
  remove: () => false,
});

SimpleSchema.extendOptions(['title']);

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
  letters: {
    type: String,
    label: 'List of the available letters',
    defaultValue: AvailableLetters.proposal,
    min: 1,
    max: AvailableLetters.proposal.length,
    custom() {
      const letters = this.value;
      let available = AvailableLetters.proposal;
      for (let i = 0, len = letters.length; i < len; i++) {
        const letter = letters[i];
        if (available.length === 0) return SimpleSchema.ErrorTypes.VALUE_NOT_ALLOWED;
        const pos = available.indexOf(letter);
        if (pos < 0) return SimpleSchema.ErrorTypes.VALUE_NOT_ALLOWED;
        available = available.slice(0, pos) + available.slice(pos + 1, available.length);
      }
    },
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
  winningProposalImageUrl: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: "Winning Proposal Image Url",
    title: "Shown in App: finished topic single view (Portait format)"
  },
  winningProposalDetailImageUrl: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: "Winning Proposal Detail Image Url",
    title: "Shown in App: finished topics overview (Landscape format)"
  }
});

export { Challenges, ChallengesSchema };

RegExp.escape = function (s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
