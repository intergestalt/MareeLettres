import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'getGeneralInfo'() {
    return {
      server: global.machineKey,
    };
  },
});
