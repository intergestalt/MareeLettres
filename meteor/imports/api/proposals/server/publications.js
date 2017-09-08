import { Meteor } from 'meteor/meteor';

import { Proposals, ProposalsSchema } from '../proposals';
import { Challenges } from '../../challenges/challenges';
import RequestHelpers from '../../../helpers/RequestHelpers';

Meteor.publish('get.proposals', function getProposals(data) {
  if (!this.userId) return;

  const query = {};
  if (data.challenge_id) query.challenge_id = data.challenge_id;

  const options = {};
  if (data.limit) options.limit = data.limit;
  if (data.sort) options.sort = data.sort;

  return Proposals.find(query, options);
});

Meteor.publish('get.proposals/challenge_id', function getProposals(challenge_id) {
  if (!this.userId) return;

  const query = challenge_id ? { challenge_id } : {};
  return Proposals.find(query);
});

Meteor.publish('get.proposals.in_review', function getProposals(data) {
  if (!this.userId) return;

  const limit = data.limit || 5;

  return Proposals.find({ in_review: true }, { sort: { created_at: 1 }, limit });
});

Meteor.publish('get.proposals.recently_accepted', function getProposals(data) {
  if (!this.userId) return;

  const limit = data.limit || 5;

  return Proposals.find({ in_review: false, blocked: false }, { sort: { reviewed_at: -1 }, limit });
});

Meteor.publish('get.proposals.recently_rejected', function getProposals(data) {
  if (!this.userId) return;

  const limit = data.limit || 5;

  return Proposals.find({ in_review: false, blocked: true }, { sort: { reviewed_at: -1 }, limit });
});

Meteor.publish('get.proposals.recently_reviewed', function getProposals(data) {
  if (!this.userId) return;

  const limit = data.limit || 10;

  return Proposals.find({ in_review: false }, { sort: { reviewed_at: 1 }, limit });
});
