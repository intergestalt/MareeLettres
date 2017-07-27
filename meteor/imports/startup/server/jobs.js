import { Meteor } from 'meteor/meteor';
import { Status } from '../../api/status/status';

Meteor.setInterval(() => {
  console.log("# of sessions: " + Object.keys(Meteor.server.sessions).length);
  Status.update({
    key: 'number_of_connections'
  }, {
    $set: {
      value: Object.keys(Meteor.server.sessions).length 
    },
  }, {
    upsert: true,
  })
}, 5000);
