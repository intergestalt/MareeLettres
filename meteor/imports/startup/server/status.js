import { Meteor } from 'meteor/meteor';
import ip from 'ip';

import { Status } from '../../api/status/status';

const machineKey = process.env.DYNO ? process.env.DYNO : ip.address();

Meteor.setInterval(() => {
  Status.update(
    {
      machine_key: machineKey,
    },
    {
      $set: {
        'items.number_of_connections': Object.keys(Meteor.server.sessions).length,
      },
    },
    {
      upsert: true,
    },
  );
}, 5000);
