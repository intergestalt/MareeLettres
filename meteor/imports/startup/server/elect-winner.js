import { Meteor } from 'meteor/meteor';

import buildConfig from '../../startup/both/build-config';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';

// TODO: make sure this runs only on one instance!
// TODO: use observer?

const processWinner = () => {
  const now = new Date();
  const old_unprocessed_challenges = Challenges.find({
    end_date: { $lte: now },
    winningProposal: { $exists: false },
  });
  old_unprocessed_challenges.map((doc) => {
    console.log(doc);

    const winningProposal = Proposals.findOne(
      { challenge_id: doc._id },
      { sort: buildConfig.queries.proposals.sort.popular },
    ); // TODO: add positiv category as 3rd criterium
    console.log('winning proposal: ', winningProposal);

    Challenges.update(doc, { $set: { winningProposal } });
  });
  // console.log(now, old_unprocessed_challenges.fetch());
};

processWinner(); // run now
Meteor.setInterval(processWinner, 5000); // run later
