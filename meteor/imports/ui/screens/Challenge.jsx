import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AutoField from 'uniforms-unstyled/AutoField';
import AutoForm from 'uniforms-unstyled/AutoForm';
import SubmitField from 'uniforms-unstyled/SubmitField';
import ErrorsField from 'uniforms-unstyled/ErrorsField';
import { OriginId, AvailableLetters } from 'maree-lettres-shared';

import { Challenges, ChallengesSchema } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';

import AdminWrapper from '../components/AdminWrapper';
import Menu from '../components/menu';

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.challenge_id = props.params.challenge_id;
    this.saveCallback = this.saveCallback.bind(this)
  }

  save(doc) {
    console.log(doc);
    if (!doc._id) {
      Challenges.insert(doc, this.saveCallback)
    }
    else
      Challenges.update(doc._id, {
        $set: {
          'title.en': doc.title.en,
          'title.fr': doc.title.fr,
          letters: doc.letters,
          start_date: doc.start_date,
          end_date: doc.end_date,
          proposals_end_date: doc.proposals_end_date,
          'winningProposalImageUrl': doc.winningProposalImageUrl,
          'winningProposalDetailImageUrl': doc.winningProposalDetailImageUrl,
        },
      },
        this.saveCallback
      );
  }

  saveCallback(error, data) {
    if (error) {
      alert("ERROR - NOT SAVED")
    }
    else {
      this.props.router.push('/admin/challenges')
    }
  }

  renderEditForm() {
    return (
      <AutoForm
        schema={ChallengesSchema}
        onSubmit={doc => this.save(doc)}
        model={this.props.challenge}
      >
        <AutoField name="title" />
        <AutoField name="letters" />
        <small>
          All available letters: <span className="impact">{AvailableLetters.proposal}</span>
        </small>
        <AutoField name="start_date" />
        <AutoField name="end_date" />
        <AutoField name="proposals_end_date" />
        <AutoField name="winningProposalImageUrl" />
        <AutoField name="winningProposalDetailImageUrl" />
        <ErrorsField />
        <SubmitField />
      </AutoForm>
    );
  }

  /*
        <AutoField name="start_date" />
        <AutoField name="end_date" />
        <SubmitField />
        */

  renderProposals() {
    const proposals = this.props.proposals;
    return proposals.map(proposal =>
      <li key={proposal._id}>
        <code>
          {OriginId.getOrigin(proposal.origin_id)} ({proposal.origin_id})
        </code>
        &nbsp; score: <tt>{proposal.score}</tt>
        &nbsp; yes: <tt>{proposal.yes_votes}</tt>
        &nbsp; no: <tt>{proposal.no_votes}</tt>
        &nbsp; pop: <tt>{proposal.votes_amount}</tt>
        &nbsp;
        <span className="impact">{proposal.text}</span>
      </li>,
    );
  }

  render() {
    return (
      <AdminWrapper>
        <Menu />
        <h2>Edit Challenge</h2>
        {this.renderEditForm()}
        {/* <ul>
          {this.renderProposals()}
        </ul> */}
      </AdminWrapper>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('get.challenge', props.params.challenge_id);
  Meteor.subscribe('get.proposals/challenge_id', props.params.challenge_id);

  return {
    challenge: Challenges.findOne(props.params.challenge_id),
    proposals: Proposals.find({ challenge_id: props.params.challenge_id }).fetch(),
  };
}, Challenge);
