import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AutoForm from 'uniforms-unstyled/AutoForm';

import { Challenges, ChallengesSchema } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';

import Menu from '../components/menu';

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.challenge_id = props.params.challenge_id;
  }

  save(doc) {
    console.log(doc);
    Challenges.update(doc._id, {
      $set: {
        title: doc.title,
        start_date: doc.start_date,
        end_date: doc.end_date,
      },
    });
  }

  renderEditForm() {
    return (
      <AutoForm
        schema={ChallengesSchema}
        onSubmit={doc => this.save(doc)}
        model={this.props.challenge}
      />
    );
  }

  renderProposals() {
    const proposals = this.props.proposals;
    return proposals.map(proposal =>
      <li key={proposal._id}>
        {proposal.text}
      </li>,
    );
  }

  render() {
    return (
      <div>
        <Menu />
        {this.renderEditForm()}
        <ul>
          {this.renderProposals()}
        </ul>
      </div>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('get.challenge', props.params.challenge_id);
  Meteor.subscribe('get.proposals/challenge_id', props.params.challenge_id);

  const proposalsCounts = {};

  return {
    challenge: Challenges.findOne(props.params.challenge_id),
    proposals: Proposals.find({ challenge_id: props.params.challenge_id }).fetch(),
    proposalsCounts,
  };
}, Challenge);
