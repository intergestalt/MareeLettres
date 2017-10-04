import { Meteor } from 'meteor/meteor';
import FastlyHelpers from '../../helpers/FastlyHelpers';
import { Content } from './content';

console.log('attach content hooks');

// fastly

if (Meteor.settings.use_fastly) {

  Content.after.insert(function () {
    FastlyHelpers.fastlyPurge('content');
  });

  Content.after.update(function () {
    FastlyHelpers.fastlyPurge('content');
  });

  Content.after.remove(function () {
    FastlyHelpers.fastlyPurge('content');
  });

};
