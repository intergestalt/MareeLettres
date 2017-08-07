import { Meteor } from 'meteor/meteor';
import { Challenges } from '../challenges';

Meteor.publish('get.challenges', function getChallenges() {
  return Challenges.find();
});

Meteor.publish('get.challenge', function getChallenges(id) {
  return Challenges.find(id);
});

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}challenges`, function (req, res, next) {
  JsonRoutes.sendResult(res, {
    data: { challenges: Challenges.find().fetch() },
  });
});

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}challenges/:0`, function (
  req,
  res,
  next,
) {
  const challenge_id = req.params[0];

  JsonRoutes.sendResult(res, {
    data: { challenges: Challenges.find(challenge_id).fetch() },
  });
});
