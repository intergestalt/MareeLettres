import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Letters, LettersSchema } from '../letters';

import currentSystemConfig from '../../../startup/server/system-config';

Meteor.publish('get.letters', function getLetters() {
  if (!this.userId) return;
  return Letters.find();
});

// REST:

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}letters`, function (req, res, next) {

  const interval = typeof req.query.interval !== "undefined"; // ?interval

  let query = {}

  if (interval) { // TODO: use LettersRecent Collection

    const config = currentSystemConfig.getConfig();
    const deltaSeconds = config.map_update_interval + config.map_update_latency + config.map_query_update_latency; // TODO: manage fastly and use map_cache_update_interval

    console.log(deltaSeconds)

    const now = new Date;
    const absDate = new Date(now.setSeconds(now.getSeconds() - deltaSeconds));

    console.log(absDate)

    query.created_at = { $gte: absDate }
  }

  const letters = Letters.find(query).fetch();

  const options = {
    data: { letters, ...currentSystemConfig.responseDataProperties() },
  };

  JsonRoutes.sendResult(res, options);
});

JsonRoutes.add('post', `${Meteor.settings.public.api_prefix}letters`, function (req, res, next) {
  const letters = req.body.letters;

  if (!Array.isArray(letters) || letters.length === 0) {
    JsonRoutesError(res, 400, 'missing-letters');
  }

  // TODO validate input with LettersSchema

  const bulk = Letters.rawCollection().initializeUnorderedBulkOp();

  letters.forEach(function (letter) {
    letter.created_at = new Date();
    letter._id = new Mongo.ObjectID()._str;
    bulk.insert(letter);
  }, this);

  bulk.execute();

  /*
  letters.forEach(function (letter) {
    letter.created_at = new Date();
    Letters.insert(letter);
  }, this);
*/

  const options = {
    data: {},
  };

  JsonRoutes.sendResult(res, options);
});

const JsonRoutesError = function (res, status_code, error_code) {
  error_options = {
    code: status_code,
    data: {
      error: error_code,
    },
  };
  JsonRoutes.sendResult(res, error_options);
};
