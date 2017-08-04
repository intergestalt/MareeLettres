import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Challenges } from './challenges';

Meteor.methods({

  'challenges.insert'(text) {
    check(text, String);

    /*
      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
    */
    Challenges.insert({
      text,
      // createdAt: new Date(),
      // owner: this.userId,
      // username: Meteor.users.findOne(this.userId).username,
    });
  },

  'challenges.update'(id,text) {
    check(text, String);

    /*
      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
    */
    Challenges.update(id, {
      $set: {
        text: text
      },
    });
  },

});
