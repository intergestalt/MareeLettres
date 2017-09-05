import { Meteor } from 'meteor/meteor';
import { Status } from '../status';

Meteor.publish('get.status', function getStatus() {
  if (!this.userId) return;
  return Status.find();
});
