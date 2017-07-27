import { Meteor } from 'meteor/meteor';
import { Challenges } from '../challenges';

Meteor.publish('get.challenges', function getChallenges() {
  return Challenges.find();
}, {
  url: Meteor.settings.public.api_prefix + 'challenges',
});


Meteor.publish('get.challenge', function getChallenges(id) {
  return Challenges.find(id);
}, {
  url: Meteor.settings.public.api_prefix + 'challenges/:0',
});
