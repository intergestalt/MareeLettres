import { Meteor } from 'meteor/meteor';
import { Challenges } from '../challenges';

Meteor.publish('Challenges.pub.list', function getChallenges() {
  return Challenges.find();
});
