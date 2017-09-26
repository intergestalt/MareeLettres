import { Meteor } from 'meteor/meteor';

import buildConfig from '../../startup/both/build-config';
import currentSystemConfig from './system-config';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';

// make sure this runs only on one instance!
// TODO: use observer?

const running_timeouts = {};

const runProcessWinner = () => {
  const now = new Date();
  const config = currentSystemConfig.getConfig();

  const old_unprocessed_challenges = Challenges.find({
    end_date: { $lte: now },
    winningProposal: { $exists: false },
  });
  old_unprocessed_challenges.map((doc) => {

    const min_delay_ms = (config.network_latency * 1000) + (config.send_internal_votes_after * 1000);

    const already_passed = now - doc.end_date;

    let still_to_wait = min_delay_ms - already_passed;

    if (still_to_wait < 0) still_to_wait = 1;

    console.log("finished challenge detected (" + doc._id + ") - waiting for " + still_to_wait + " more ms. max delay: " + min_delay_ms + "ms.");

    if (!running_timeouts[doc._id]) {

      running_timeouts[doc._id] = true;

      Meteor.setTimeout(() => {
        const winningProposal = Proposals.findOne(
          { challenge_id: doc._id },
          { sort: buildConfig.queries.proposals.sort.popular },
        );
        console.log('winning proposal: ', winningProposal);

        Challenges.update(doc, { $set: { winningProposal } });

        delete running_timeouts[doc._id];

      }, still_to_wait);
    } else {
      "finished challenge detected (" + doc._id + ") - " + still_to_wait + "ms left.";
    }

  });
  // console.log(now, old_unprocessed_challenges.fetch());
};

const continuouslyProcessWinner = () => {
  const interval = currentSystemConfig.getConfig().winner_election_interval;
  // console.log(`Next winner check is in ${interval}s`);
  Meteor.setTimeout(() => {
    runProcessWinner();
    continuouslyProcessWinner();
  }, interval * 1000);
};

console.log('starting regular winner checking.');
continuouslyProcessWinner();
runProcessWinner(); // start now
