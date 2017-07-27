import { Meteor } from 'meteor/meteor';
import { Proposals } from '../proposals';

Meteor.publish('get.proposals/challenge_id/limit', function getProposals(challenge_id, limit) {
  let query = { 
    challenge_id: challenge_id,
  }
  let options = {
    limit: parseInt(limit),
  }
  return Proposals.find(query, options);
}, {
  url: Meteor.settings.public.api_prefix + "challenges/:0/proposals/limit/:1",
});

Meteor.publish('get.proposals/challenge_id', function getProposals(challenge_id) {
  let query = challenge_id ? { challenge_id: challenge_id } : {}
  return Proposals.find(query);
}, {
  url: Meteor.settings.public.api_prefix + "challenges/:0/proposals",
});

Meteor.publish('get.proposals', function getProposals() {
  return Proposals.find();
}, {
  url: Meteor.settings.public.api_prefix + "proposals",
});
