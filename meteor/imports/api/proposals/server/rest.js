import { Meteor } from 'meteor/meteor';
import _ from 'underscore';

import { Proposals, ProposalsSchema } from '../proposals';
import { Challenges } from '../../challenges/challenges';
import { Players } from '../../players/players';
import RequestHelpers from '../../../helpers/RequestHelpers';
import currentSystemConfig from '../../../startup/server/system-config';
import buildConfig from '../../../startup/both/build-config';


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
        const base_pos = Proposals.find({ blocked: false, in_review: false, score: { $gt: proposal.score } }, { sort: buildConfig.queries.proposals.sort.popular }).count();

        // 2. Get the position in the batch of proposals with the same score
        const batch = Proposals.find({ blocked: false, in_review: false, score: proposal.score }, { sort: buildConfig.queries.proposals.sort.popular, fields: { _id: 1 } });

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

        const proposals = Proposals.find({ challenge_id, in_review: false }, { sort, limit }).fetch();

        const options = {};

        if (proposals.length === 0 && Challenges.find({ _id: challenge_id }).count() === 0) {
            JsonRoutesError(res, 404, 'challenge-not-found');
            return;
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

        const proposal = req.body.proposal;

        if (!proposal) {
            JsonRoutesError(res, 400, 'missing-proposal');
            return;
        }

        // TODO validate input with ProposalsSchema

        const data = {};

        const origin_id = RequestHelpers.request_check_origin(req, res, next, proposal.origin_id);
        const challenge_id = proposal.challenge_id;

        const proposal_id = RequestHelpers.generateProposalId(origin_id, challenge_id);

        // check if challenge_id is valid

        const challenge_exists = Challenges.find(challenge_id, { limit: 1 }).count() === 1

        if (!challenge_exists) {
            JsonRoutesError(res, 409, 'challenge-not-existing');
            return;
        }

        // check if unblocked proposal already exists
        const proposal_exists = Proposals.find({ _id: proposal_id, blocked: false }, { limit: 1 }).count() === 1

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
            p._id = proposal_id;
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
        console.log(result)

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
            { challenge_id, in_review: false, blocked: false },
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
            { challenge_id, in_review: false, blocked: false },
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
            { challenge_id, in_review: false, blocked: false },
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
