import { Meteor } from 'meteor/meteor';
import { Status } from '../../api/status/status';

Meteor.setInterval(() => {
  Status.update(
    {
      key: 'number_of_connections',
    },
    {
      $set: {
        value: Object.keys(Meteor.server.sessions).length,
      },
    },
    {
      upsert: true,
    },
  );
}, 5000);
