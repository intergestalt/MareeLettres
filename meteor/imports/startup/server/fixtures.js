/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';
import { Content } from '../../api/content/content';

const contents = ['howto', 'about'];

Meteor.startup(() => {
  contents.forEach((content) => {
    if (Content.find(content).count() === 0) {
      Content.insert({
        _id: content,
        en: `${content}/en`,
        fr: `${content}/fr`,
      })
    }
  });

  if (Challenges.find().count() === 0) {
    console.log('Seeding Challenges');
    for (let i = 1; i <= 24; i++) {
      Challenges.insert({
        title: `Question #${i}`,
        votes: 0,
        score: 0,
        proposals_amount: 0,
      }, (err, id) => {
        if (id != undefined) {
          console.log('Seeding Proposals');
          for (let i = 1; i <= 200; i++) {
            Proposals.insert({
              text: shuffleString('ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRS          '),
              challenge_id: id,
            });
          }
        }
      });
    }
  }
});

let shuffleString = function (str) {
  return str.split('').sort(function () { return 0.5 - Math.random(); }).join('');
};
