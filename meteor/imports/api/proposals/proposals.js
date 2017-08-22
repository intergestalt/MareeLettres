import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Proposals = new Mongo.Collection('proposals');

if (Meteor.isServer) {
  Proposals._ensureIndex({ challenge_id: 1 });
}

Proposals.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

/*
text: shuffleString('ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRS          '),
challenge_id: id,
score: 0, // parseInt(10 * Math.random()),
votes_amount: 0, // parseInt(10 * Math.random()),
score_trending: 0,
yes_votes: 0,
no_votes: 0,
origin_id: OriginId.generateFromString(`fixture_${j}`),
*/
