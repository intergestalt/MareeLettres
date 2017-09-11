import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import AutoField from 'uniforms-unstyled/AutoField';
import AutoForm from 'uniforms-unstyled/AutoForm';
import SubmitField from 'uniforms-unstyled/SubmitField';
import { OriginId } from 'maree-lettres-shared';

import { Challenges, ChallengesSchema } from '../../api/challenges/challenges';
import { Proposals, ProposalsSchema } from '../../api/proposals/proposals';
import ProposalEntry from '../components/ProposalEntry';

import AdminWrapper from '../components/AdminWrapper';
import Menu from '../components/menu';
import Filter from '../components/Filter';

Session.setDefault('proposalsListLimit', 100);
Session.setDefault('proposalsListFilter', {
  sortField: 'score',
  sortOrder: 'desc',
  searchFild: false,
  searchQuery: '',
});

class ProposalsPage extends Component {
  constructor(props) {
    super(props);
    Session.set('proposalsListLimit', this.props.limit || 100);
    this.state = {};
  }

  more = () => {
    Session.set('proposalsListLimit', Session.get('proposalsListLimit') + 100);
  };

  renderProposals() {
    const proposals = this.props.proposals;
    return (
      <tbody>
        {proposals.map(proposal => <ProposalEntry key={proposal._id} proposal={proposal} onDelete={this.handleDelete} onReview={this.handleReview} />)}
      </tbody>
    );
  }

  handleDelete(event) {
    const proposal_id = event.target.name
    Proposals.remove(proposal_id)
  }

  handleReview(event) {
    const proposal_id = event.target.name
    Proposals.update(proposal_id, { $set: { in_review: true } })
  }




  render() {
    return (
      <AdminWrapper>
        <Menu />
        <Filter 
          sessionVarName="proposalsListFilter"
          schema={ProposalsSchema}
        />
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
              <th><small>Actions</small></th>
            </tr>
          </thead>
          {this.renderProposals()}
        </table>
        <button onClick={this.more}>more</button>
      </AdminWrapper>
    );
  }
}

export default createContainer((props) => {
  const session = Session.get("proposalsListFilter")
  const sort = {}; 
  sort[session.sortField] = (session.sortOrder == "asc" ? 1 : -1)
  Meteor.subscribe('get.proposals', {
    challenge_id: props.location.query.challenge_id,
    limit: Session.get('proposalsListLimit'),
    sort,
  });

  const proposals = Proposals.find({}, { sort }).fetch()

  return {
    proposals,
  };
}, ProposalsPage);
