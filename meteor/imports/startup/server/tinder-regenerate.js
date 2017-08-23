import { Meteor } from 'meteor/meteor';

const interval = global.currentSystemConfig.tinder_proposals_regeneration_interval;

const runRegenerateTinder = function () {
  // console.log('run tinder regeneration');
  // TODO: actually do the run
};

console.log(`start regular tinder regeneration (every ${interval}s)`);
Meteor.setInterval(runRegenerateTinder, interval); // TODO: use setTimeout and restart prevent choking
runRegenerateTinder();
