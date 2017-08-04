import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';

import Menu from '../components/menu';

class Challenge extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
    this.challenge_id = props.params.challenge_id
  }

  renderProposals() {
    const proposals = this.props.proposals;
    return proposals.map((proposal) => (
        <li key={proposal._id}>
          { proposal.text }          
        </li>
      ));
  }

  render() {
    return (
      <div>
        <Menu/>
        <ul>
          {this.renderProposals()}
        </ul>
      </div>
    );
  }
}

export default createContainer((props) => {

  Meteor.subscribe('get.challenges');
  Meteor.subscribe('get.proposals/challenge_id',props.params.challenge_id);

  const proposalsCounts = {};

  return {
    challenges: Challenges.find().fetch(),
    proposals: Proposals.find({challenge_id: props.params.challenge_id }).fetch(),
    proposalsCounts,
  };
}, Challenge);

