import { Meteor } from 'meteor/meteor';
import { OriginId } from 'maree-lettres-shared';

import currentSystemConfig from './system-config';

import { Letters } from '../../api/letters/letters';

const runSeedLetters = function () {
  console.log('run letter seeding');
  const map_default_center_lat = currentSystemConfig.getConfig().map_default_center_lat;
  const map_default_center_lng = currentSystemConfig.getConfig().map_default_center_lng;
  const map_seeding_radius = currentSystemConfig.getConfig().map_seeding_radius;
  const map_seeding_lpm = currentSystemConfig.getConfig().map_seeding_lpm;
  const map_seeding_interval = currentSystemConfig.getConfig().map_seeding_interval

  if (map_seeding_interval == 0 || map_seeding_lpm == 0) return;

  const amount = Math.ceil(map_seeding_lpm / (60 / map_seeding_interval));
  console.log(`seeding ${amount} letters`);

  for (let i = 0; i < amount; i++) {
    const randomCoords = randomGeo({ latitude: map_default_center_lat, longitude: map_default_center_lng }, map_seeding_radius);
    Letters.insert({
      created_at: new Date(),
      character: "X",
      origin_id: OriginId.generateFromString('auto'),
      loc: { type: "Point", coordinates: [randomCoords.lat, randomCoords.lng] },
    });
  }
};

const continuouslySeedLetters = () => {
  const interval = currentSystemConfig.getConfig().map_seeding_interval;
  console.log(`Next letter seeding is in ${interval}s`);
  Meteor.setTimeout(() => {
    runSeedLetters();
    continuouslySeedLetters();
  }, interval * 1000);
};

console.log('starting continuous letter seeding.');
continuouslySeedLetters();
runSeedLetters(); // start now


// https://stackoverflow.com/questions/31192451/generate-random-geo-coordinates-within-specific-radius-from-seed-point
function randomGeo(center, radius) {
  var y0 = center.latitude;
  var x0 = center.longitude;
  var rd = radius / 111300; // meters in one degree

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  //Adjust the x-coordinate for the shrinking of the east-west distances
  var xp = x / Math.cos(y0);

  var newlat = y + y0;
  var newlon = x + x0;
  var newlon2 = xp + x0;

  return {
    'lat': parseFloat(newlat.toFixed(5)),
    'lng': parseFloat(newlon2.toFixed(5)),
  };
}
