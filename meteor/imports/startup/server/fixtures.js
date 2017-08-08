/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import moment from 'moment';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';
import { Content } from '../../api/content/content';
import { Letters } from '../../api/letters/letters';

const contents = ['howto', 'about'];

Meteor.startup(() => {
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
          title: `Question #${i}`,
          votes: 0,
          score: 0,
          proposals_amount: 0,
          start_date: moment().add(i - 2, 'days').toDate(),
          end_date: moment().add(i - 1, 'days').toDate(),
        },
        (err, id) => {
          if (id != undefined) {
            console.log('Seeding Proposals');
            for (let i = 1; i <= 200; i++) {
              Proposals.insert({
                text: shuffleString('ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRS          '),
                challenge_id: id,
              });
            }
          }
        },
      );
    }
  }

  if (Letters.find().count() === 0) {
    console.log('Seeding Letters');
    for (let i = 1; i <= 150; i++) {
      Letters.insert({
        character: shuffleString('ABCDEFGHIJKLMNOPQRSTUVWXYZ').charAt(0),
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
