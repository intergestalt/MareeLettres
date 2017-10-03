import { Meteor } from 'meteor/meteor';
import FastlyHelpers from '../../helpers/FastlyHelpers';
import { Challenges } from './challenges';
import { Proposals } from '../proposals/proposals';

console.log('attach challenges hooks');

Challenges.before.insert(function (userId, doc) {
  doc.proposals_amount = Proposals.find({ challenge_id: doc._id }).count();
});

// fastly

if (Meteor.settings.use_fastly) {

  Challenges.after.insert(function () {
    FastlyHelpers.fastlyPurge('challenges');
  });

  Challenges.after.update(function () {
    FastlyHelpers.fastlyPurge('challenges');
  });

  Challenges.after.remove(function () {
    FastlyHelpers.fastlyPurge('challenges');
  });

};
