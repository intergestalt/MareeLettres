import { Meteor } from 'meteor/meteor';
import Fastly from 'fastly';
import RequestHelpers from '../../helpers/RequestHelpers';
import { Content } from './content';

console.log('attach content hooks');

// fastly

if (Meteor.settings.use_fastly) {

  const fastly = Fastly(process.env.FASTLY_API_KEY);

  Content.after.insert(function () {
    fastly.purgeKey(process.env.FASTLY_SERVICE_ID, 'content', RequestHelpers.logPurge);
  });

  Content.after.update(function () {
    fastly.purgeKey(process.env.FASTLY_SERVICE_ID, 'content', RequestHelpers.logPurge);
  });

  Content.after.remove(function () {
    fastly.purgeKey(process.env.FASTLY_SERVICE_ID, 'content', RequestHelpers.logPurge);
  });

};
