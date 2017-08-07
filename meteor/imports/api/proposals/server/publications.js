import { Meteor } from 'meteor/meteor';
import { Proposals } from '../proposals';

Meteor.publish(
  'get.proposals/challenge_id/limit',
  function getProposals(challenge_id, limit) {
    const query = {
      challenge_id,
    };
    const options = {
      limit: parseInt(limit),
    };
    return Proposals.find(query, options);
  },
  {
    url: `${Meteor.settings.public.api_prefix}challenges/:0/proposals/limit/:1`,
  },
);

Meteor.publish('get.proposals/challenge_id', function getProposals(challenge_id) {
  const query = challenge_id ? { challenge_id } : {};
  return Proposals.find(query);
});

Meteor.publish('get.proposals', function getProposals() {
  return Proposals.find();
});

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}proposals`, function (req, res, next) {
  JsonRoutes.sendResult(res, {
    data: { proposals: Proposals.find().fetch() },
  });
});

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}challenges/:0/proposals`, function (
  req,
  res,
  next,
) {
  const challenge_id = req.params[0];
  const limit = parseInt(req.query.limit) || 0;

  JsonRoutes.sendResult(res, {
    data: {
      proposals: Proposals.find({ challenge_id }, { limit }).fetch(),
    },
  });
});

JsonRoutes.add(
  'get',
  `${Meteor.settings.public.api_prefix}challenges/:0/proposals/limit/:1`,
  function (req, res, next) {
    const challenge_id = req.params[0];
    const limit = parseInt(req.params[1]);

    /*
    const error = new Meteor.Error('not-found', 'Not Found');
    error.statusCode = 404;
    throw error;
    */

    JsonRoutes.sendResult(res, {
      data: {
        proposals: Proposals.find({ challenge_id }, { limit }).fetch(),
      },
    });
  },
);
