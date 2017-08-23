import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import AutoField from 'uniforms-unstyled/AutoField';
import AutoForm from 'uniforms-unstyled/AutoForm';
import SubmitField from 'uniforms-unstyled/SubmitField';
import { OriginId } from 'maree-lettres-shared';

import { Challenges, ChallengesSchema } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';
import ProposalEntry from '../components/ProposalEntry';

import Menu from '../components/menu';

class ProposalsPage extends Component {
  constructor(props) {
    super(props);
    Session.set('proposalsListLimit', this.props.limit || 100);
    this.state = {};
  }

  more = () => {
    Session.set('proposalsListLimit', Session.get('proposalsListLimit') + 100);
    console.log(Session.get('proposalsListLimit'));
  };

  renderProposals() {
    const proposals = this.props.proposals;
    return (
      <tbody>
        {proposals.map(proposal => <ProposalEntry proposal={proposal} />)}
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <Menu />
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>
                Score<br />
                <small>Popularity</small>
              </th>
              <th>&#128077;</th>
              <th>&#128078;</th>
              <th>∑</th>
              <th>text</th>
              <th>Challenge</th>
            </tr>
          </thead>
          {this.renderProposals()}
        </table>
        <button onClick={this.more}>more</button>
      </div>
    );
  }
}

export default createContainer((props) => {
  console.log(this);
  Meteor.subscribe('get.proposals', {
    challenge_id: props.params.challenge_id,
    limit: Session.get('proposalsListLimit'),
    sort: { score: -1 },
  });

  return {
    proposals: Proposals.find().fetch(),
  };
}, ProposalsPage);
