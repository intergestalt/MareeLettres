import { Meteor } from 'meteor/meteor';
import ip from 'ip';

import { Status } from '../../api/status/status';

global.machineKey = process.env.DYNO ? process.env.DYNO : ip.address();

Meteor.setInterval(() => {
  Status.update(
    {
      machine_key: global.machineKey,
    },
    {
      $set: {
        'items.number_of_ddp_connections': Object.keys(Meteor.server.sessions).length,
        heartbeat_at: new Date(),
      },
    },
    {
      upsert: true,
    },
  );
}, 5000);

const setSystemStatus = (key, value) => {
  const $set = {};
  $set['items.' + key] = value;
  Status.update(
    {
      machine_key: global.machineKey,
    },
    {
      $set,
    },
  );
};

export { setSystemStatus };
