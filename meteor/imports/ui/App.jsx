import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Challenges } from '../api/challenges/challenges';
import { Proposals } from '../api/proposals/proposals';

class App extends Component {

  renderProposals() {
    let proposals = this.props.proposals;
    return proposals.map((proposal) => {
      return (
        <li key={proposal._id}>
          { proposal.text }
        </li>
      );
    });
  }

  renderChallenges() {
    let challenges = this.props.challenges;
    return challenges.map((challenge) => {
      return (
        <li key={challenge._id}>
          { challenge.title }
          <ul>
            {this.renderProposals()}
          </ul>
        </li>
      );
    });
  }

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
  Meteor.subscribe('Challenges.pub.list');
  Meteor.subscribe('Proposals.pub.list');

  return {
    challenges: Challenges.find().fetch(),
    proposals: Proposals.find().fetch(),
  };
}, App);

