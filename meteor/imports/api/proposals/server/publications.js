import { Meteor } from 'meteor/meteor';
import { Proposals } from '../proposals';
import { Challenges } from '../../challenges/challenges';

import _ from 'underscore';

Meteor.publish('get.proposals/challenge_id/limit', function getProposals(challenge_id, limit) {
  const query = {
    challenge_id,
  };
  const options = {
    limit: parseInt(limit),
  };
  return Proposals.find(query, options);
});

Meteor.publish('get.proposals/challenge_id', function getProposals(challenge_id) {
  const query = challenge_id ? { challenge_id } : {};
  return Proposals.find(query);
});

Meteor.publish('get.proposals', function getProposals() {
  return Proposals.find();
});

// REST:

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}proposals`, function (req, res, next) {
  JsonRoutes.sendResult(res, {
    data: { proposals: Proposals.find().fetch() },
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
      popular: { score: -1 },
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
  // deprecated
  'get',
  `${Meteor.settings.public.api_prefix}challenges/:0/proposals/limit/:1`,
  function (req, res, next) {
    const challenge_id = req.params[0];
    const limit = parseInt(req.params[1]);

    JsonRoutes.sendResult(res, {
      data: {
        proposals: Proposals.find({ challenge_id }, { limit }).fetch(),
      },
    });
  },
);

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
