import { Meteor } from 'meteor/meteor';
import { Challenges } from '../challenges';

Meteor.publish('get.challenges', function getChallenges() {
  return Challenges.find();
});

Meteor.publish('get.challenge', function getChallenges(id) {
  return Challenges.find(id);
});

// REST:

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}challenges`, function (req, res, next) {
  JsonRoutes.sendResult(res, {
    data: { challenges: Challenges.find({}, { sort: { end_date: 1 } }).fetch() },
  });
});

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}challenges/:challenge_id`, function (
  req,
  res,
  next,
) {
  const challenge_id = req.params.challenge_id;

  const options = {
    data: { challenges: Challenges.find(challenge_id).fetch() },
  };

  JsonRoutes.sendResult(res, options);
});
