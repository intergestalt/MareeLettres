import { Meteor } from 'meteor/meteor';
import currentSystemConfig from './system-config';

import { TrendSnapshots } from '../../api/trendSnapshots/trendSnapshots';
import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';

const runRegenerateTrending = function () {
  console.log('run trend regeneration');
  const config = currentSystemConfig.getConfig();
  const challenges = Challenges.find({ end_date: { $gt: new Date() } }, { fields: { _id: 1 } });
  const damping_factor = Math.pow(
    2,
    -config.trending_regeneration_interval / config.trend_damping_halflife_time,
  ); // 2 ^ -(dt / t1/2); 2 means half
  let bulkOps = 0;
  challenges.forEach((challenge) => {
    let snapshot = TrendSnapshots.findOne(challenge._id);
    if (!snapshot) snapshot = {};
    if (!snapshot.proposals) snapshot.proposals = {};
    const proposals = Proposals.find(
      { blocked: false, in_review: false },
      { fields: { score: 1, score_trending: 1, _id: 1 } },
    );
    const bulk = Proposals.rawCollection().initializeUnorderedBulkOp();
    bulkOps = 0;
    proposals.forEach((proposal) => {
      if (!snapshot.proposals[proposal._id]) snapshot.proposals[proposal._id] = {};
      if (!snapshot.proposals[proposal._id].score) {
        snapshot.proposals[proposal._id].score = proposal.score;
      }
      if (!snapshot.proposals[proposal._id].score_trending) {
        snapshot.proposals[proposal._id].score_trending = proposal.score_trending;
      }
      const previous_score = snapshot.proposals[proposal._id].score;
      const previous_trend = snapshot.proposals[proposal._id].score_trending;
      const new_trend = proposal.score - previous_score + damping_factor * previous_trend;
      snapshot.proposals[proposal._id].score = proposal.score;
      snapshot.proposals[proposal._id].score_trending = new_trend;
      if (proposal.score_trending !== new_trend) {
        bulkOps += 1;
        bulk.find({ _id: proposal._id }).updateOne({
          $set: { score_trending: new_trend },
        });
      }
    });
    if (bulkOps > 0) {
      bulk.execute(function (err, r) {
        if (err) console.log('Trend regenerate bulk error', err);
      });
    }
    console.log(`Processed trends for challenge: ${challenge._id}, ${bulkOps} proposals changed`);
    snapshot.updated_at = new Date();
    TrendSnapshots.upsert(challenge._id, { $set: snapshot });
  });
};

const continuouslyRegenerateTrending = () => {
  const interval = currentSystemConfig.getConfig().trending_regeneration_interval;
  console.log(`Next trend regeneration in ${interval}s`);
  Meteor.setTimeout(() => {
    runRegenerateTrending();
    continuouslyRegenerateTrending();
  }, interval * 1000);
};

console.log('starting regular trend regeneration.');
continuouslyRegenerateTrending();
