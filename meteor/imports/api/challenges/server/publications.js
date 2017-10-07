import { Meteor } from 'meteor/meteor';
import { Challenges } from '../challenges';

Meteor.publish('get.challenges', function getChallenges() {
  if (!this.userId) return;
  return Challenges.find();
});

Meteor.publish('get.challenge', function getChallenges(id) {
  if (!this.userId) return;
  return Challenges.find(id);
});

// REST:

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}challenges`, function (req, res, next) {

  JsonRoutes.sendResult(res, {
    data: { challenges: Challenges.find({ hidden: { $ne: true } }, { sort: { end_date: 1 } }).fetch() },
    headers: { 'Surrogate-Key': 'challenges' },
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
    headers: { 'Surrogate-Key': 'challenges' },
  };

  JsonRoutes.sendResult(res, options);
});
