import { Meteor } from 'meteor/meteor';
import currentSystemConfig from './system-config';

import { TrendSnapshots } from '../../api/trendSnapshots/trendSnapshots';
import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';
import { setSystemStatus } from './status';

const runRegenerateTrending = function () {
  console.log('run trend regeneration');
  const t00 = Date.now();
  const config = currentSystemConfig.getConfig();
  const challenges = Challenges.find({ end_date: { $gt: new Date() } }, { fields: { _id: 1 } });
  const damping_factor = Math.pow(
    2,
    -config.trending_regeneration_interval / config.trend_damping_halflife_time,
  ); // 2 ^ -(dt / t1/2); 2 means half
  let bulkOps = 0;
  challenges.forEach((challenge) => {
    const t0 = Date.now();
    let snapshot = TrendSnapshots.findOne(challenge._id);
    if (!snapshot) snapshot = {};
    if (!snapshot.proposals) snapshot.proposals = {};
    const proposals = Proposals.find(
      { blocked: false, in_review: false, challenge_id: challenge._id },
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
      const t0_db = Date.now();
      bulk.execute(function (err, r) {
        if (err) console.log('Trend regenerate bulk error', err);
        else {
          const dt = Date.now() - t0;
          const dt_db = Date.now() - t0_db;
          console.log(`Processed trends for challenge: ${challenge._id}, ${bulkOps} proposals changed. ${dt}ms (db: ${dt_db}ms).`);
        }
      });
    }
    snapshot.updated_at = new Date();
    TrendSnapshots.upsert(challenge._id, { $set: snapshot });
  });
  const dt = Date.now() - t00;
  console.log(`Trend regeneration total time: ${dt}ms.`);
  setSystemStatus('trend_regeneration_time', dt);
  const active_challenges = Object.keys(challenges.fetch()).map(c => challenges.fetch()[c]._id);
  TrendSnapshots.remove({ _id: { $nin: active_challenges } }, function (err, result) {
    console.log(`Trend regeneration cleanup: Removed ${result} TrendSnapshots`);
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
