/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import moment from 'moment';

import { OriginId, AvailableLetters } from 'maree-lettres-shared';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';
import { Content } from '../../api/content/content';
import { Letters } from '../../api/letters/letters';
import { Players } from '../../api/players/players';
import { SystemConfig, SystemConfigSchema } from '../../api/systemConfig/systemConfig';

const seed_proposals_and_players = process.env.MAREE_SEED_VOTES || false; // reset & seed: npm run reset:seed
const seed_letters = false;

const SeedChallenges = JSON.parse(Assets.getText('fixtures/challenges.json')).challenges;

const contents = ['web', 'about'];

Meteor.startup(() => {
  console.log('running fixures');

  if (Meteor.users.find({ username: 'admin' }).count() == 0) {
    console.log('seeding admin user');
    Accounts.createUser({
      username: 'admin',
      password: 'password',
    });
  }

  if (Meteor.users.find({ username: 'review' }).count() == 0) {
    console.log('seeding review user');
    Accounts.createUser({
      username: 'review',
      password: 'password',
    });
  }

  // Always update default SystemConfig
  console.log('resetting default config in db');
  // TODO: just upsert the values?!
  const defaultSystemConfig = SystemConfigSchema.clean({});
  const previous = SystemConfig.findOne({ name: 'default' }, { fields: { active: 1 } });
  const active = previous ? previous.active : true;
  SystemConfig.remove({ name: 'default' });
  SystemConfig.insert(defaultSystemConfig, ...{ name: 'default', active });
  SystemConfig.find({ name: { $ne: 'default' } }).forEach((doc) => { // add new defaults to existing docs
    doc = { ...defaultSystemConfig, ...doc };
    SystemConfig.update(doc._id, { $set: doc });
  });
  /* SystemConfig.rawCollection().replaceOne({ name: 'default' }, defaultSystemConfig, {
    upsert: true,
  }); */

  contents.forEach((content) => {
    if (Content.find(content).count() === 0) {
      console.log('Seeding Content');
      Content.insert({
        _id: content,
        en: Assets.getText(`fixtures/content_${content}_en.md`),
        fr: Assets.getText(`fixtures/content_${content}_fr.md`),
      });
    }
  });

  if (Challenges.find().count() === 0) {
    console.log('Seeding Challenges');
    const amount_challenges = seed_proposals_and_players ? 40 : SeedChallenges.length;
    for (let i = 1; i <= amount_challenges; i++) {
      Challenges.insert(
        {
          _id: `fixture_${i}`,
          title: {
            en: `Question #${i} [EN]`,
            fr: `Question #${i} [FR]`,
          },
          letters: AvailableLetters.proposal,
          votes_amount: 0,
          proposals_amount: 0,
          winningProposalImageUrl: (i == 1 ? 'http://maree.herokuapp.com/img/winningProposalImageUrl.jpg' : undefined),
          winningProposalDetailImageUrl: (i == 1 ? 'http://maree.herokuapp.com/img/winningProposalDetailImageUrl.jpg' : undefined),
          start_date: moment()
            .add(i - 2, 'hours')
            .toDate(),
          end_date: moment()
            .add(i - 1, 'hours')
            .toDate(),
          proposals_end_date: moment()
            .add(i - 1, 'hours')
            .add(-10, 'minutes')
            .toDate(),
          ...SeedChallenges[i - 1],
        },
        (err, id) => {
          if (seed_proposals_and_players && id != undefined) {
            console.log('Seeding Proposals');
            let amount = 1 * Math.floor(20 * Math.random());
            let shuffle = AvailableLetters.proposal;
            if (amount % 3 == 0) amount = 0; // make some challenges without proposals
            for (let j = 1; j <= amount; j++) {
              if (j % 2 == 0) {
                shuffle = AvailableLetters.proposal.substr(5, 10); // make some short proposals
              } else {
                shuffle = AvailableLetters.proposal;
              }
              Proposals.insert({
                _id: `fixture_${i}_${j}`,
                text: `${j} ${shuffleString(`${shuffle}       `)}`,
                challenge_id: id,
                score: 0, // parseInt(10 * Math.random()),
                score_trending: 0,
                votes_amount: 0, // parseInt(10 * Math.random()),
                yes_votes: 0,
                no_votes: 0,
                in_review: false,
                blocked: false,
                origin_ids: [OriginId.generateFromString(`fixture_player_${j}`)],
              });
            }
          }
        },
      );
    }
  }

  if (seed_proposals_and_players && Players.find().count() === 0) {
    console.log('Seeding Players');
    for (let i = 1; i <= 150; i++) {
      Players.insert({
        _id: `fixture_${i}`,
        origin_id: OriginId.generateFromString(`fixture_player_${i}`),
        created_at: new Date(),
        last_seen_at: new Date(),
        votes: {},
        proposals: [],
      });
    }

  }

  if (process.env.MAREE_SEED_APP_STORE && Players.find().count() === 0 && Proposals.find().count() === 0) {
    console.log('Seeding Players and Proposals - demo for app store');
    const SeedProposals = JSON.parse(Assets.getText('fixtures/challenges.json')).proposals;
    let proposalId = 1;
    Object.keys(SeedProposals).forEach((challengeKey) => {
      SeedProposals[challengeKey].forEach((proposalText) => {
        let originId = OriginId.generateFromString(`fixture_player_${proposalId}`);
        Players.insert({
          _id: `fixture_${proposalId}`,
          origin_id: originId,
          created_at: new Date(),
          last_seen_at: new Date(),
          votes: {},
        });
        Proposals.insert({
          _id: `fixture_proposal_${proposalId}`,
          text: proposalText.toUpperCase(),
          challenge_id: challengeKey,
          score: 0, // parseInt(10 * Math.random()),
          score_trending: 0,
          votes_amount: 0, // parseInt(10 * Math.random()),
          score_trending: 0,
          yes_votes: 0,
          no_votes: 0,
          in_review: false,
          blocked: false,
          origin_ids: [originId],
        });
        proposalId++;
      });
    });
  }

  if (seed_letters && Letters.find().count() === 0) {
    console.log('Seeding Letters');
    const locations = {
      berlin: {
        lat: 52.46,
        lng: 13.38,
      },
      paris: {
        lat: 48.864716,
        lng: 2.349014,
      },
    };
    const location = locations.berlin; // choose city here
    const spread_lat = 0.012;
    const spread_lng = 0.02;
    for (let i = 1; i <= 2500; i++) {
      const coords = {
        lat: location.lat - spread_lat / 2 + Math.random() * spread_lat,
        lng: location.lng - spread_lng / 2 + Math.random() * spread_lng,
      };
      Letters.insert({
        character: shuffleString(AvailableLetters.map).charAt(0),
        loc: { type: "Point", coordinates: [coords.lng, coords.lat] },
        created_at: new Date(),
      });
    }
  }
});

let shuffleString = function (str) {
  return str
    .split('')
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join('');
};
