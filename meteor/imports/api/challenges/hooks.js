import Fastly from 'fastly';
import RequestHelpers from '../../helpers/RequestHelpers';
import { Challenges } from './challenges';
import { Proposals } from '../proposals/proposals';

console.log('attach challenges hooks');

Challenges.before.insert(function (userId, doc) {
  doc.proposals_amount = Proposals.find({ challenge_id: doc._id }).count();
});

// fastly

if (Meteor.settings.use_fastly) {

  const fastly = Fastly(process.env.FASTLY_API_KEY);

  Challenges.after.insert(function () {
    fastly.purgeKey(process.env.FASTLY_SERVICE_ID, 'challenges', RequestHelpers.logPurge);
  });

  Challenges.after.update(function () {
    fastly.purgeKey(process.env.FASTLY_SERVICE_ID, 'challenges', RequestHelpers.logPurge);
  });

  Challenges.after.remove(function () {
    fastly.purgeKey(process.env.FASTLY_SERVICE_ID, 'challenges', RequestHelpers.logPurge);
  });

};
