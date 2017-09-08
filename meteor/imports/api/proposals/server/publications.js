import { Meteor } from 'meteor/meteor';

import { Proposals, ProposalsSchema } from '../proposals';
import { Challenges } from '../../challenges/challenges';
import RequestHelpers from '../../../helpers/RequestHelpers';


import _ from 'underscore';

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

// REST:

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}proposals`, function (req, res, next) {
  JsonRoutes.sendResult(res, {
    data: { proposals: Proposals.find().fetch() },
  });
});

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}proposals/:proposal_id`, function (req, res, next) {
  const proposal_id = req.params.proposal_id;

  JsonRoutes.sendResult(res, {
    data: { proposals: Proposals.find(proposal_id).fetch() },
  });
});


JsonRoutes.add(
  'get',
  `${Meteor.settings.public.api_prefix}challenges/:challenge_id/proposals`,
  function (req, res, next) {
    const challenge_id = req.params.challenge_id;
    const limit = parseInt(req.query.limit) || 0; // ?limit=:limit
    const sort_param = req.query.sort; // ?limit=:limit

    const sort_modes = {
      popular: { score: -1, yes_votes: -1 },
      newest: { created_at: -1 },
      trending: { score_trending: -1 },
    };

    if (Object.keys(sort_modes).indexOf(sort_param) < 0) sort_mode = 'popular';

    const sort = sort_modes[sort_param];

    const proposals = Proposals.find({ challenge_id }, { sort, limit }).fetch();

    const options = {};

    if (proposals.length === 0 && Challenges.find({ _id: challenge_id }).count() === 0) {
      /* const error = new Meteor.Error('challenge-not-found', `Challenge ${challenge_id} not found`);
      error.statusCode = 404;
      throw error; */
      options.code = 404;
      options.data = {
        error: 'challenge-not-found',
        reason: `Challenge ${challenge_id} not found`,
      };
    } else {
      options.data = {
        proposals,
      };
    }

    JsonRoutes.sendResult(res, options);
  },
);

JsonRoutes.add(
  'post',
  `${Meteor.settings.public.api_prefix}proposals`, function (req, res, next) {

    const proposals = req.body.proposals;

    if (!Array.isArray(proposals) || proposals.length === 0) {
      JsonRoutesError(res, 400, 'missing-proposals');
    }

    // TODO validate input with ProposalsSchema

    const bulk = Proposals.rawCollection().initializeUnorderedBulkOp();

    const data = [];

    proposals.forEach(function (proposal) {
      const p = ProposalsSchema.clean({})
      p.created_at = new Date();
      p._id = new Mongo.ObjectID()._str; // TODO use MD5 with challenge_id and origin_id or similar to ensure that there is only one proposal per challenge and player
      p.origin_id = RequestHelpers.request_check_origin(req, res, next, proposal.origin_id);
      p.challenge_id = proposal.challenge_id;
      p.in_review = true;
      p.text = proposal.text;
      data.push({ '_id': p._id });
      bulk.insert(p);
    }, this);

    const result = bulk.execute();

    /*
    proposals.forEach(function (proposal) {
      proposal.created_at = new Date();
      proposals.insert(proposal);
    }, this);
  */

    const options = {
      data,
    };

    JsonRoutes.sendResult(res, options);
  });

JsonRoutes.add(
  'get',
  `${Meteor.settings.public.api_prefix}tinder/:challenge_id/:origin_id/`, // TODO: use TinderProposals collection
  function (req, res, next) {
    const challenge_id = req.params.challenge_id;
    const limit = parseInt(req.query.limit) || 10; // ?limit=:limit

    // generate a full set of candidates TODO: use TinderProposals...
    // see also: https://stackoverflow.com/questions/35892903/inserting-multiple-documents-into-mongodb-using-one-call-in-meteor

    // const proposals_unvoted = Proposals.find({ challenge_id, number_of_votes: { $lt: 5 } });
    // const proposals_close = Proposals.find({ challenge_id, number_of_votes: { $lt: 5 } });

    // do in-memory!
    // possible fallback: if collection is too large, just sample randomly

    const proposals_list = Proposals.find(
      { challenge_id },
      {
        fields: {
          text: 1,
          origin_id: 1,
        },
      },
    ).fetch();

    // console.log(challenge_id);
    // console.log(proposals_list);

    const proposals_list_by_votes = Proposals.find(
      { challenge_id },
      {
        fields: {
          votes_amount: 1,
        },
        sort: {
          votes_amount: -1,
        },
      },
    ).fetch();

    const proposals_list_by_score = Proposals.find(
      { challenge_id },
      {
        fields: {
          score: 1,
        },
        sort: {
          score: -1,
        },
      },
    ).fetch();

    // console.log('by votes', proposals_list_by_votes);
    // console.log('by score', proposals_list_by_score);

    let proposals_list_by_proximity = [];
    const max_index = proposals_list_by_score.length - 1;

    proposals_list_by_score.forEach(function (item, index) {
      let delta = 1; // should be an average instead
      if (index < max_index) {
        delta = item.score - proposals_list_by_score[index + 1].score;
      }

      proposals_list_by_proximity.push({
        _id: item._id,
        proximity: delta,
      });
    });

    proposals_list_by_proximity = proposals_list_by_proximity.sort(
      (a, b) => b.proximity - a.proximity,
    );

    // console.log(proposals_list_by_proximity);

    /*
    const partial_limit = Math.floor(limit / 3)

    const out_list = proposals_list_by_votes.slice(0,partial_limit)
    out_list = out_list.concat(proposals_list_by_proximity.slice(0,partial_limit))
    out_list = out_list.concat(proposals_list_by_score.slice(0,partial_limit))

    */

    // warning: O^2 !
    const proposals_list_by_tinderscore = proposals_list
      .map((item) => {
        let tinderscore = 0;
        tinderscore += _.findIndex(proposals_list_by_votes, { _id: item._id });
        tinderscore += _.findIndex(proposals_list_by_score, { _id: item._id });
        tinderscore += _.findIndex(proposals_list_by_proximity, { _id: item._id });
        item.tinderscore = tinderscore;
        return item;
      })
      .sort((a, b) => b.tinderscore - a.tinderscore);

    // console.log(proposals_list_by_tinderscore);

    // TODO: add randomness: shuffle 10% of the tinderscores

    const options = {};

    // TODO: if player cannot get sufficient proposals to vote on, trigger recalculation. or write a note to status object.

    if (
      proposals_list_by_tinderscore.length === 0 &&
      Challenges.find({ _id: challenge_id }).count() === 0
    ) {
      /* const error = new Meteor.Error('challenge-not-found', `Challenge ${challenge_id} not found`);
      error.statusCode = 404;
      throw error; */
      options.code = 404;
      options.data = {
        error: 'challenge-not-found',
        reason: `Challenge ${challenge_id} not found`,
      };
    } else {
      options.data = {
        proposals: proposals_list_by_tinderscore.slice(0, limit),
      };
    }
    JsonRoutes.sendResult(res, options);
  },
);
