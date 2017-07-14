/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Challenges } from '../../api/challenges/challenges';

Meteor.startup(() => {
  if (Challenges.find().count() === 0) {
    console.log('Seeding Challenges');
    Challenges.insert({
      title: 'First Question?',
    });
  }
});
