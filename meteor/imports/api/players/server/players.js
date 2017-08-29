import { Meteor } from 'meteor/meteor';

import { OriginId } from 'maree-lettres-shared';

import { Players } from '../players';
import { Proposals } from '../../proposals/proposals';
import currentSystemConfig from '../../../startup/server/system-config';

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
  const origin_id = request_check_origin(req, res, next);

  let player = Players.findOne({ origin_id });

  if (!player) {
    console.log('new player!');
    player = {
      origin_id,
      votes: {},
    };
    Players.insert(player);
    player.new = true;
  }

  /*
  if (!player) {
    error_options = {
      code: 404,
      data: {
        error: 'player-not-found',
        reason: `Player ${origin_id} not found`,
      },
    };
    JsonRoutes.sendResult(res, error_options);
  } */

  let options = {
    data: {...player}
  };

  //if (player.new) {
    options = currentSystemConfig.addToResponseOptions(options)
  //}

  JsonRoutes.sendResult(res, options);
});

JsonRoutes.add('post', `${Meteor.settings.public.api_prefix}players/:origin_id/votes`, function (
  req,
  res,
  next,
) {
  const origin_id = request_check_origin(req, res, next);

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

  const pastVotesResult = Players.findOne({ origin_id }, getQueryParams); // TODO possibly save this query and get old values from set query?

  if (!pastVotesResult) {
    error_options = {
      code: 404,
      data: {
        error: 'player-not-found',
        reason: `Player ${origin_id} not found`,
      },
    };
    JsonRoutes.sendResult(res, error_options);
  }

  const pastVotes = pastVotesResult ? pastVotesResult.votes : {};

  const result = Players.update({ origin_id }, { $set: setQueryParams }); // TODO check result

  // console.log(`Player update result: ${result}`);

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

const request_check_origin = function (req, res, next) {
  const origin_id = req.params.origin_id;

  // console.log(origin_id);

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

  // console.log(OriginId.verify(origin_id));

  if (!OriginId.verify(origin_id)) {
    error_options = {
      code: 401,
      data: {
        error: 'id-invalid',
        reason: 'origin_id is not valid',
      },
    };
    JsonRoutes.sendResult(res, error_options);
  }

  return origin_id;
};
