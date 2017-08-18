import { Meteor } from 'meteor/meteor';

import { OriginId } from 'maree-lettres-shared';

import { Players } from '../players';
import { Proposals } from '../../proposals/proposals';

Meteor.publish(
  'get.players',
  function getPlayers() {
    return Players.find();
  },
  'get.player',
  function getPlayers(id) {
    return Players.find(id);
  },
);

// ; charset=utf-8

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}players/:origin_id`, function (
  req,
  res,
  next,
) {
  request_check_origin(req);

  const player = Players.findOne({ origin_id });

  if (!player) {
    error_options = {
      code: 404,
      data: {
        error: 'player-not-found',
        reason: `Player ${origin_id} not found`,
      },
    };
    JsonRoutes.sendResult(res, error_options);
  }

  const options = {
    data: player,
  };

  JsonRoutes.sendResult(res, options);
});

JsonRoutes.add('post', `${Meteor.settings.public.api_prefix}players/:origin_id/votes`, function (
  req,
  res,
  next,
) {
  const origin_id = request_check_origin(req);

  // console.log(req);

  const body = req.body;

  const setQuery = {};

  body.votes.forEach(function (vote) {
    setQuery[vote.proposal_id] = vote.value;
  });

  console.log(setQuery);

  Players.update({ origin_id }, { $set: setQuery }); // assuming Success

  for (proposal_id in setQuery) {
    const incQuery = {};
    incQuery[setQuery[proposal_id] ? 'yes_votes' : 'no_votes'] = 1;
    incQuery.votes_amount = 1;
    incQuery.score = setQuery[proposal_id] ? 1 : -1;
    Proposals.update(proposal_id, {
      $inc: incQuery,
    });
  }

  const options = {
    data: 'data',
  };

  JsonRoutes.sendResult(res, options);
});

const request_check_origin = function (req) {
  const origin_id = req.params.origin_id;

  console.log(origin_id);

  if (!origin_id) {
    error_options = {
      code: 400,
      data: {
        error: 'id-required',
        reason: 'origin_id is required',
      },
    };
    JsonRoutes.sendResult(res, error_options);
  }

  console.log(OriginId.verify(origin_id));

  return origin_id;
};
