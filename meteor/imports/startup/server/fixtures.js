/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import moment from 'moment';

import { OriginId } from 'maree-lettres-shared';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';
import { Content } from '../../api/content/content';
import { Letters } from '../../api/letters/letters';
import { Players } from '../../api/players/players';
import { SystemConfig, SystemConfigSchema } from '../../api/systemConfig/systemConfig';

const SeedChallenges = JSON.parse(Assets.getText('fixtures/challenges.json')).challenges;

const contents = ['howto', 'about'];

Meteor.startup(() => {
  // Always update default SystemConfig
  const defaultSystemConfig = SystemConfigSchema.clean({});
  SystemConfig.rawCollection().replaceOne({ name: 'default' }, defaultSystemConfig, {
    upsert: true,
  });

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
            const amount = 150 + 10 * Math.floor(10 * Math.random());
            for (let j = 1; j <= amount; j++) {
              Proposals.insert({
                _id: `fixture_${i}_${j}`,
                text: `${j} ${shuffleString('ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHAAEE       ')}`,
                challenge_id: id,
                score: 0, // parseInt(10 * Math.random()),
                votes_amount: 0, // parseInt(10 * Math.random()),
                score_trending: 0,
                yes_votes: 0,
                no_votes: 0,
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
        votes: {},
      });
    }
  }

  if (Letters.find().count() === 0) {
    console.log('Seeding Letters');
    for (let i = 1; i <= 50; i++) {
      Letters.insert({
        character: shuffleString('ABCDEFGHIJKLMNOPQRSTUVWXYZ?:*').charAt(0),
        coords: {
          lat: 52.46 + Math.random() * 0.06, // Berlin
          lng: 13.38 + Math.random() * 0.1, // Berlin
        },
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
