import { Meteor } from 'meteor/meteor';
import Fastly from 'fastly';

const fastly = Fastly(process.env.FASTLY_API_KEY);

const FastlyHelpers = {

  logPurge: (err, res, key) => {
    if (err) {
      console.log("Fastly ERROR with key " + key, err);
    } else if (Meteor.settings.log_api_errors) {
      console.log("purged " + key);
    }
  },

  fastlyPurge: (key) => {
    const log = (err, res) => {
      FastlyHelpers.logPurge(err, res, key);
    };
    fastly.purgeKey(process.env.FASTLY_SERVICE_ID, key, log);
  },

};

export default FastlyHelpers;
