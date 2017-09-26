import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Status } from '../../api/status/status';

Meteor.setInterval(() => {
  Status.remove({
    heartbeat_at: {
      $lt: moment().add(-30, 'seconds').toDate(),
    },
  });
}, 20000);
