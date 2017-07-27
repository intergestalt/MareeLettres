import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Challenges } from '../api/challenges/challenges';
import { Proposals } from '../api/proposals/proposals';

class App extends Component {

  renderProposals() {
    const proposals = this.props.proposals;
    return proposals.map((proposal) => (
        <li key={proposal._id}>
          { proposal.text }
        </li>
      ));
  }

  renderChallenges() {
    const challenges = this.props.challenges;
    const proposalsCounts = this.props.proposalsCounts;
    return challenges.map((challenge) => (
        <li key={challenge._id}>
          { challenge.title }

           ( { proposalsCounts[challenge._id] } )
        </li>
      ));
  }

  /*
  <ul>
    {this.renderProposals()}
  </ul>
  */
  
  render() {
    console.log(this.props.challenges);
    return (
      <div>
        <h1>Maree des Lettres</h1>
        <h2>Challenges</h2>
        <ul>
          {this.renderChallenges()}
        </ul>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('get.challenges');
  Meteor.subscribe('get.proposals');

  const proposalsCounts = {};

  Challenges.find().forEach((doc) => {
    proposalsCounts[doc._id] = Proposals.find({ challenge_id: doc._id }).count();
  });

  return {
    challenges: Challenges.find(),
    proposals: Proposals.find(),
    proposalsCounts,
  };
}, App);

