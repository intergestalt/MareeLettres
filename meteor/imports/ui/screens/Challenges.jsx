import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';

import Menu from '../components/menu';

class ChallengesIndex extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
  }

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
    return challenges.map((challenge) => (
      <li key={challenge._id}>
        <Link to={'challenges/'+challenge._id}>
          { challenge.title }
        </Link>
          &nbsp;({ challenge.proposals_amount })
      </li>
    ));
  }

  render() {
    return (
      <div>
        <Menu/>
        <ul>
          {this.renderChallenges()}
        </ul>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('get.challenges');

  return {
    challenges: Challenges.find().fetch(),
  };
}, ChallengesIndex);

