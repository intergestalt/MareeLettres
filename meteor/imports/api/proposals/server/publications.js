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
  url: "proposals/:0/:1",
});

Meteor.publish('get.proposals/challenge_id', function getProposals(challenge_id) {
  let query = challenge_id ? { challenge_id: challenge_id } : {}
  return Proposals.find(query);
}, {
  url: "proposals/:0",
});
