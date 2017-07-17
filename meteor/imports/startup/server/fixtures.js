/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Challenges } from '../../api/challenges/challenges';

Meteor.startup(() => {
  if (Challenges.find().count() === 0) {
    console.log('Seeding Challenges');
    for (let i = 1; i <= 24; i++) {
      Challenges.insert({
        title: `Question #${i}`,
        votes: 0,
        score: 0,
      });
    }
  }
});
