import { Meteor } from 'meteor/meteor';
import { Proposals } from '../proposals';

Meteor.publish('Proposals.pub.list', function getProposals() {
  return Proposals.find();
});
