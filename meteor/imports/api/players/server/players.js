import { Meteor } from 'meteor/meteor';
import { Players } from '../players';

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

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}players/:origin_id`, function (req, res, next) {
  const origin_id = req.params.origin_id;

  if (!origin_id) {
    error_options = {
      code: 40,
      data: {
        error: 'id-required',
        reason: `origin_id is required`,
      }
    }
    JsonRoutes.sendResult(res, error_options);
  }

  const player = Players.findOne(origin_id);

  if (!player) {
    error_options = {
      code: 404,
      data: {
        error: 'player-not-required',
        reason: `Player ${origin_id} not found`,
      }
    }
    JsonRoutes.sendResult(res, error_options);
  }    

  const options = {
    player: player
  }

  JsonRoutes.sendResult(res, options);
});
