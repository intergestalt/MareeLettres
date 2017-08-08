import { Meteor } from 'meteor/meteor';
import { Proposals } from '../proposals';
import { Challenges } from '../../challenges/challenges';

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

    const proposals = Proposals.find({ challenge_id }, { limit }).fetch();

    const options = {};

    if (proposals.length === 0 && Challenges.find({ _id: challenge_id }).count() === 0) {
      const error = new Meteor.Error('challenge-not-found', `Challenge ${challenge_id} not found`);
      error.statusCode = 404;
      throw error;
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

/*
const error = new Meteor.Error('not-found', 'Not Found');
error.statusCode = 404;
throw error;
*/
