import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Letters, LettersSchema } from '../letters';

import RequestHelpers from '../../../helpers/RequestHelpers';
import currentSystemConfig from '../../../startup/server/system-config';

const JsonRoutesError = RequestHelpers.JsonRoutesError;

Meteor.publish('get.letters', function getLetters() {
  if (!this.userId) return;
  return Letters.find();
});

// REST:

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}letters`, function (req, res, next) {

  const interval = req.query.interval || 0; // ?interval=

  const config = currentSystemConfig.getConfig();

  // BEGIN TODO let client decide until when it makes sense to request seqments

  const max_interval_segments = 6; // maximum amount of distinct inveral values
  const max_interval = (config.map_letter_decay_time / config.map_update_interval) / 4 // or: amount of time relative to decay in which it still makes sense to deliver partial results

  let interval_segments = [1] // at least one element
  for (let i = 1; i < max_interval_segments; i++) {
    let interval_segment = Math.pow(2, i); // 1,2,4,8,16,...
    if (interval_segment > max_interval) break;
    interval_segments.push(interval_segment)
  }

  // END TODO let client decide until when it makes sense to request seqments

  let query = {}

  if (interval > 0) { // TODO: use LettersRecent Collection

    // distance to the previous possible interval, e.g. 4-2 = 2 = 4/2, 8-4 = 4 = 8/2
    const last_interval_segment = Math.ceil(interval / 2);

    const overhead = interval * (config.map_cache_update_interval / last_interval_segment);

    const deltaSeconds = overhead + interval * config.map_update_interval + config.map_update_latency + config.map_query_update_latency; // TODO: manage fastly and use map_cache_update_interval

    console.log("requested seconds: " + config.map_update_interval * interval);
    console.log("delivered seconds: " + deltaSeconds);

    const now = new Date();
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

  // check if user is blocked

  const origin_id = letters[0].origin_id; // ignoring someone who hacks the origin_ids
  if (RequestHelpers.check_blocked_user(res, origin_id)) return;

  // start bulk write

  const bulk = Letters.rawCollection().initializeUnorderedBulkOp();

  letters.forEach(function (letter) {
    letter.created_at = new Date();
    letter._id = new Mongo.ObjectID()._str;
    bulk.insert(letter);
  }, this);

  bulk.execute();

  const options = {
    data: {},
  };

  JsonRoutes.sendResult(res, options);
});

