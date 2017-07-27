import { Meteor } from 'meteor/meteor';
import { Status } from '../status';

Meteor.publish('get.status', function getStatus() {
  return Status.find();
}, {
  url: "status",
});
