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

  const interval = parseInt(req.query.interval) || 0; // ?interval=
  const lat = Number.parseFloat(req.query.centerLat);         // ?centerLat=
  const lng = Number.parseFloat(req.query.centerLng);         // ?centerLng=
  const radius = Number.parseFloat(req.query.radius);      // ?radius=

  const config = currentSystemConfig.getConfig();

  let query = {};

  // process interval constraints

  if (interval > 0) {

    // distance to the previous possible interval, e.g. 4-2 = 2 = 4/2, 8-4 = 4 = 8/2
    const last_interval_segment = Math.ceil(interval / 2);

    const overhead = interval * (config.map_cache_update_interval / last_interval_segment);

    const deltaSeconds = overhead + interval * config.map_update_interval + config.network_latency + config.map_query_update_latency; // TODO: manage fastly and use map_cache_update_interval

    // console.log(req.query);
    // console.log("requested seconds: " + config.map_update_interval * interval);
    // console.log("delivered seconds: " + deltaSeconds);

    const now = new Date();
    const absDate = new Date(now.setSeconds(now.getSeconds() - deltaSeconds));

    query.created_at = { $gte: absDate }
  }

  // process geospacial constraints

  if (lat && lng && radius) {
    query.loc = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lat, lng],
        },
        $maxDistance: radius,
      },
    };
  }

  const letters_cursor = Letters.find(query);

  // console.log(lat, lng, radius);
  // console.log(query);
  // console.log("delivered letters: " + letters_cursor.count());

  const letters = letters_cursor.fetch();

  const options = {
    data: { letters, ...currentSystemConfig.responseDataProperties() },
  };

  JsonRoutes.sendResult(res, options);
});

JsonRoutes.add('post', `${Meteor.settings.public.api_prefix}letters`, function (req, res, next) {
  const letters = req.body.letters;

  if (!Array.isArray(letters) || letters.length === 0) {
    JsonRoutesError(res, 400, 'missing-letters');
    return;
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
    letter.loc = { type: "Point", coordinates: [letter.coords.lat, letter.coords.lng] };
    letter.decay_time = currentSystemConfig.getConfig().map_letter_decay_time;
    bulk.insert(letter);
  }, this);

  bulk.execute();

  const options = {
    data: {},
  };

  JsonRoutes.sendResult(res, options);
});

