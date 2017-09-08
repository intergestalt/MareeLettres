/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import moment from 'moment';

import { OriginId, AvailableLetters } from 'maree-lettres-shared';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';
import { Content } from '../../api/content/content';
import { Letters } from '../../api/letters/letters';
import { Players } from '../../api/players/players';
import { SystemConfig, SystemConfigSchema } from '../../api/systemConfig/systemConfig';

const SeedChallenges = JSON.parse(Assets.getText('fixtures/challenges.json')).challenges;

const contents = ['web', 'about'];

Meteor.startup(() => {
  console.log("running fixures")

  if (Meteor.users.find({ username: 'admin' }).count() == 0) {
    console.log("seeding admin user")
    Accounts.createUser({
      username: 'admin',
      password: 'password'
    });
  }

  // Always update default SystemConfig
  console.log("resetting default config in db")
  const defaultSystemConfig = SystemConfigSchema.clean({});
  SystemConfig.remove({ name: 'default' })
  SystemConfig.insert(defaultSystemConfig, ...{ name: "default" })
  /*SystemConfig.rawCollection().replaceOne({ name: 'default' }, defaultSystemConfig, {
    upsert: true,
  });*/

  contents.forEach((content) => {
    if (Content.find(content).count() === 0) {
      console.log('Seeding Content');
      Content.insert({
        _id: content,
        en: Assets.getText(`fixtures/content_${content}_en.md`),
        fr: Assets.getText(`fixtures/content_${content}_fr.md`),
      });
    }
  });

  if (Challenges.find().count() === 0) {
    console.log('Seeding Challenges');
    for (let i = 1; i <= 24; i++) {
      Challenges.insert(
        {
          _id: `fixture_${i}`,
          title: {
            en: `Question #${i} [EN]`,
            fr: `Question #${i} [FR]`,
          },
          letters: AvailableLetters.proposal,
          votes_amount: 0,
          proposals_amount: 0,
          start_date: moment().add(i - 3, 'days').toDate(),
          end_date: moment().add(i - 1, 'days').toDate(),
          proposals_end_date: moment().add(i - 1, 'days').add(-10, 'minutes').toDate(),
          ...SeedChallenges[i],
        },
        (err, id) => {
          if (id != undefined) {
            console.log('Seeding Proposals');
            const amount = 10 * Math.floor(10 * Math.random());
            for (let j = 1; j <= amount; j++) {
              Proposals.insert({
                _id: `fixture_${i}_${j}`,
                text: `${j} ${shuffleString(`${AvailableLetters.proposal}       `)}`,
                challenge_id: id,
                score: 0, // parseInt(10 * Math.random()),
                votes_amount: 0, // parseInt(10 * Math.random()),
                score_trending: 0,
                yes_votes: 0,
                no_votes: 0,
                in_review: false,
                blocked: false,
                origin_id: OriginId.generateFromString(`fixture_player_${j}`),
              });
            }
          }
        },
      );
    }
  }

  if (Players.find().count() === 0) {
    console.log('Seeding Players');
    for (let i = 1; i <= 150; i++) {
      Players.insert({
        _id: `fixture_${i}`,
        origin_id: OriginId.generateFromString(`fixture_player_${i}`),
        created_at: new Date,
        votes: {},
      });
    }
  }

  if (Letters.find().count() === 0) {
    console.log('Seeding Letters');
    const locations = {
      berlin: {
        lat: 52.46,
        lng: 13.38,
      },
      paris: {
        lat: 48.864716,
        lng: 2.349014,
      }
    }
    const location = locations.berlin; // choose city here
    const spread_lat = 0.012;
    const spread_lng = 0.02;
    for (let i = 1; i <= 2500; i++) {
      Letters.insert({
        character: shuffleString(AvailableLetters.map).charAt(0),
        coords: {
          lat: location.lat - spread_lat / 2 + Math.random() * spread_lat,
          lng: location.lng - spread_lng / 2 + Math.random() * spread_lng,
        },
        created_at: new Date,
      });
    }
  }
});

let shuffleString = function (str) {
  return str
    .split('')
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join('');
};
