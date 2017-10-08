import { Meteor } from 'meteor/meteor';
import _ from 'underscore';

import currentSystemConfig from './system-config';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';
import { TinderProposals } from '../../api/proposals/tinderProposals';
import { setSystemStatus } from './status';

const runRegenerateTinder = function () {
  console.log('run tinder regeneration');

  const t00 = Date.now();

  const challenges = Challenges.find({ end_date: { $gt: new Date() } }, { fields: { _id: 1 } });

  challenges.forEach((challenge) => {
    // do in-memory!
    // possible fallback: if collection is too large, just sample randomly
    const t0 = Date.now();

    const proposals_list = Proposals.find(
      { challenge_id: challenge._id, in_review: false, blocked: false },
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
      { challenge_id: challenge._id, in_review: false, blocked: false },
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
      { challenge_id: challenge._id, in_review: false, blocked: false },
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

    // warning: O^2 ! => TODO: use hashmaps
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

    // replace proposals for this challenge in TinderProposals
    // TODO: first upsert, then remove remaining
    const bulk = TinderProposals.rawCollection().initializeOrderedBulkOp();

    bulk.find({ challenge_id: challenge._id }).remove();
    proposals_list_by_tinderscore.forEach((doc) => {
      const p = { ...doc, challenge_id: challenge._id, tinderscore: Math.round(100 * Math.random()) };
      bulk.insert(p);
    });

    const t0_db = Date.now();
    bulk.execute(function (err, d) {
      if (err) console.log('Tinder regenerate bulk error', err);
      else {
        //console.log(d.nInserted, d.nUpserted, d.nMatched, d.nModified, d.nRemoved);
        const dt = Date.now() - t0;
        const dt_db = Date.now() - t0_db;
        console.log(`Processed tinder for challenge: ${challenge._id}. ${d.nRemoved} removed, ${d.nInserted} inserted. ${dt}ms (db: ${dt_db}ms).`);
      }
    })

  });
  const dt = Date.now() - t00;
  console.log(`Tinder regeneration total time: ${dt}ms.`);
  setSystemStatus('tinder_regeneration_time', dt);
};

const continuouslyRegenerateTinder = () => {
  const interval = currentSystemConfig.getConfig().tinder_proposals_regeneration_interval;
  console.log(`Next tinder regeneration in ${interval}s`);
  Meteor.setTimeout(() => {
    runRegenerateTinder();
    continuouslyRegenerateTinder();
  }, interval * 1000);
};

console.log('starting regular tinder regeneration.');
continuouslyRegenerateTinder();
runRegenerateTinder(); // start now