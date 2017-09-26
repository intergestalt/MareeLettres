import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import _ from 'underscore';

import { Proposals, ProposalsSchema } from '../proposals';
import { TinderProposals } from '../tinderProposals';
import { Challenges } from '../../challenges/challenges';
import { Players } from '../../players/players';
import RequestHelpers from '../../../helpers/RequestHelpers';
import currentSystemConfig from '../../../startup/server/system-config';
import buildConfig from '../../../startup/both/build-config';
import { incSystemStatus } from '../../../startup/server/status';


const JsonRoutesError = RequestHelpers.JsonRoutesError;

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}proposals`, function (req, res, next) {
  JsonRoutes.sendResult(res, {
    data: { proposals: Proposals.find().fetch() },
  });
});

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}proposals/:proposal_id`, function (req, res, next) {
  const proposal_id = req.params.proposal_id;

  const proposal = Proposals.findOne(proposal_id);

  if (!proposal) {
    JsonRoutesError(res, 400, 'proposal-not-existing');
    return;
  }

  // calculate rank

  if (!proposal.in_review && !proposal.blocked) {
    // 1. The number of valid proposals that have a lower score
    const base_pos = Proposals.find({ blocked: false, in_review: false, score: { $gt: proposal.score }, challenge_id: proposal.challenge_id }, { sort: buildConfig.queries.proposals.sort.popular }).count();

    // 2. Get the position in the batch of proposals with the same score
    const batch = Proposals.find({ blocked: false, in_review: false, score: proposal.score, challenge_id: proposal.challenge_id }, { sort: buildConfig.queries.proposals.sort.popular, fields: { _id: 1 } });

    const batch_pos = _.findIndex(batch.fetch(), elem => elem._id === proposal._id) || 0;

    const rank = base_pos + batch_pos + 1;

    proposal.rank = rank;
  }

  JsonRoutes.sendResult(res, {
    data: { proposals: [proposal] },
  });
});


JsonRoutes.add(
  'get',
  `${Meteor.settings.public.api_prefix}challenges/:challenge_id/proposals`,
  function (req, res, next) {
    const challenge_id = req.params.challenge_id;
    const limit = parseInt(req.query.limit) || 0; // ?limit=:limit
    const sort_param = req.query.sort; // ?limit=:limit

    const sort_modes = buildConfig.queries.proposals.sort;

    if (Object.keys(sort_modes).indexOf(sort_param) < 0) sort_mode = 'popular';

    const sort = sort_modes[sort_param];

    const proposals = Proposals.find({ challenge_id, in_review: false, blocked: false }, { sort, limit }).fetch();

    const options = {};

    if (proposals.length === 0 && Challenges.find({ _id: challenge_id }).count() === 0) {
      JsonRoutesError(res, 404, 'challenge-not-found');
      return;
    } else {
      options.data = {
        proposals,
        ...currentSystemConfig.responseDataProperties(),
      };
    }

    JsonRoutes.sendResult(res, options);
  },
);

JsonRoutes.add(
  'post',
  `${Meteor.settings.public.api_prefix}proposals`, function (req, res, next) {

    const proposal = req.body.proposal;

    if (!proposal) {
      JsonRoutesError(res, 400, 'missing-proposal');
      return;
    }

    // TODO validate input with ProposalsSchema

    const data = {};

    const origin_id = RequestHelpers.request_check_origin(req, res, next, proposal.origin_id);

    // check if user is blocked

    const player = Players.findOne({ origin_id }, { fields: { _id: 1, blocked: 1 } });


    if (!player) {
      JsonRoutes.sendResult(res, { data: { loadUser: true } });
      return;
    } else if (player.blocked) {
      RequestHelpers.check_blocked_user(res, origin_id);
      return;
    }


    const challenge_id = proposal.challenge_id;

    // check if challenge_id is valid

    const challenge_exists = Challenges.find(challenge_id, { limit: 1 }).count() === 1

    if (!challenge_exists) {
      JsonRoutesError(res, 409, 'challenge-not-existing');
      return;
    }

    // check if unblocked proposal already exists
    const proposal_exists = Proposals.find({ origin_id, challenge_id, blocked: false }, { limit: 1 }).count() === 1

    if (proposal_exists) {
      JsonRoutesError(res, 409, 'already-exists');
      return;
    }

    // check if unblocked proposal with same text already exists
    const same_text_proposal = Proposals.findOne({ text: proposal.text, blocked: false, challenge_id })

    if (same_text_proposal) {

      // text if orginin id is already in existing proposal with same text
      if (same_text_proposal.origin_ids.indexOf(origin_id) !== -1) {
        JsonRoutesError(res, 409, 'already-submitted');
        return;
      }

      const boost_amount = currentSystemConfig.getConfig().proposal_boost_amount

      Proposals.update({ _id: same_text_proposal._id }, {
        $addToSet: { origin_ids: origin_id },
        $inc: { yes_votes: boost_amount, score: boost_amount, votes_amount: boost_amount },
      })

      data.proposal = same_text_proposal;
      data.boost = boost_amount;

    } else {

      // regular proposal
      const auto_accept = currentSystemConfig.getConfig().proposals_auto_accept

      const p = ProposalsSchema.clean({})
      p.created_at = new Date();
      p._id = new Mongo.ObjectID()._str;
      p.origin_ids = [origin_id];
      p.challenge_id = proposal.challenge_id;
      p.in_review = !auto_accept;
      p.text = proposal.text;

      Proposals.upsert(p._id, { $set: p });

      data.proposal = p;
    }

    // put the id in the user object
    const result = Players.update({ origin_id }, {
      $addToSet: {
        proposals: {
          _id: data.proposal._id,
          challenge_id: data.proposal.challenge_id
        }
      }
    })

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

    const origin_id = RequestHelpers.request_check_origin(req, res, next);
    if (!origin_id) return;

    const player = Players.findOne({ origin_id }, { fields: { votes: 1 } });

    const selector = { challenge_id };

    if (player && player.votes) {
      selector._id = { $nin: Object.keys(player.votes) }
    }

    const tinderProposals = TinderProposals.find(selector, { sort: { tinderscore: -1 }, limit }).fetch();

    const count = tinderProposals.length;

    console.log(selector);

    if (count < limit) {
      // console.log("challenge " + challenge_id + ": requested " + limit + " tinderProposals, delivered " + count);
      // incSystemStatus('tinder_drainage', 1);
    }

    const options = {
      data: {
        proposals: tinderProposals,
        ...currentSystemConfig.responseDataProperties(),
      }
    };

    JsonRoutes.sendResult(res, options);
  },
);
