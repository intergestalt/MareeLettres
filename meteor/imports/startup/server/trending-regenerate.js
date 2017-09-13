import { Meteor } from 'meteor/meteor';
import currentSystemConfig from './system-config';

import { TrendSnapshots } from '../../api/trendSnapshots/trendSnapshots';
import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';

const runRegenerateTrending = function () {
  console.log('run trend regeneration');
  const challenges = Challenges.find({ end_date: { $gt: new Date() } }, { fields: { _id: 1 } });
  challenges.forEach((challenge) => {
    console.log("Processing trends for challenge: " + challenge._id);
    let snapshot = TrendSnapshots.findOne(challenge._id);
    if (!snapshot) snapshot = {};
    if (!snapshot.proposals) snapshot.proposals = {};
    const proposals = Proposals.find({ blocked: false, in_review: false }, { fields: { score: 1, _id: 1 } });
    const bulk = Proposals.rawCollection().initializeUnorderedBulkOp();
    proposals.forEach((proposal) => {
      if (!snapshot.proposals[proposal._id]) snapshot.proposals[proposal._id] = {};
      if (!snapshot.proposals[proposal._id].score) snapshot.proposals[proposal._id].score = proposal.score;
      const previous_score = snapshot.proposals[proposal._id].score;
      const new_trend = proposal.score - previous_score;
      snapshot.proposals[proposal._id].score = proposal.score;
      bulk.find({ _id: proposal._id }).updateOne({
        $set: { score_trending: new_trend },
      })
    })
    bulk.execute(function (err, r) {
      if (err) console.log("Trend regenerate bulk error", err);
    });
    snapshot.updated_at = new Date();
    TrendSnapshots.upsert(challenge._id, { $set: snapshot });
  })
};

const continuouslyRegenerateTrending = () => {
  const interval = currentSystemConfig.getConfig().trending_regeneration_interval;
  console.log("Next trend regeneration in " + interval + "s");
  Meteor.setTimeout(() => {
    runRegenerateTrending();
    continuouslyRegenerateTrending();
  }, interval * 1000);
};

console.log(`starting regular trend regeneration.`);
continuouslyRegenerateTrending();
