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
  const origin_id = request_check_origin(req);

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

  const votes = body.votes;

  /*
  body.votes.forEach(function (vote) {
    setQuery[vote.proposal_id] = vote.value;
  });
*/

  const setQueryParams = {};
  const getQueryParams = {};
  for (proposal_id in votes) {
    getQueryParams[`votes.${proposal_id}`] = 1;
    setQueryParams[`votes.${proposal_id}`] = votes[proposal_id];
  }

  const pastVotes = Players.findOne({ origin_id }, getQueryParams).votes; // TODO possibly save this query and get old values from set query?

  const result = Players.update({ origin_id }, { $set: setQueryParams }); // TODO check result

  for (proposal_id in votes) {
    const incQuery = {};
    if (
      typeof pastVotes[proposal_id] !== 'undefined' &&
      pastVotes[proposal_id] === votes[proposal_id]
    ) {
      // same vote (ignore)
      console.log(`ignoring same vote on ${proposal_id}`);
      continue;
    }
    if (
      typeof pastVotes[proposal_id] !== 'undefined' &&
      pastVotes[proposal_id] !== votes[proposal_id]
    ) {
      // changed vote (adjust)
      console.log(`changed vote on ${proposal_id}`);

      incQuery.yes_votes = votes[proposal_id] ? 1 : -1;
      incQuery.no_votes = votes[proposal_id] ? -1 : 1;

      incQuery.score = votes[proposal_id] ? 2 : -2;
    } else {
      // new vote (add)
      incQuery[votes[proposal_id] ? 'yes_votes' : 'no_votes'] = 1;
      incQuery.score = votes[proposal_id] ? 1 : -1;
      incQuery.votes_amount = 1;
    }

    Proposals.update(proposal_id, {
      $inc: incQuery,
    });
  }

  const options = {
    data: {},
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
