import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import Moment from 'react-moment';

import AdminWrapper from '../components/AdminWrapper';

import ReviewPanel from '../components/review/Panel';

import { SystemConfig } from '../../api/systemConfig/systemConfig';
import { Proposals } from '../../api/proposals/proposals';
import { Challenges } from '../../api/challenges/challenges';

class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAcception(event) {
    const proposal_id = event.target.name;
    const accepted = event.target.checked;
    const state = { in_review: false, in_review_recheck: false, blocked: false };
    Proposals.update(proposal_id, { $set: state })
  }

  handleRejection(event) {
    const proposal_id = event.target.name;
    const rejected = event.target.checked;
    const state = { in_review: false, in_review_recheck: false, blocked: true };
    Proposals.update(proposal_id, { $set: state })
  }

  handleRecheck(event) {
    console.log("recheck")
    const proposal_id = event.target.name;
    const state = { in_review: true, in_review_recheck: true };
    Proposals.update(proposal_id, { $set: state })
  }

  render() {
    return (
      <AdminWrapper>
        <ReviewPanel name="Unreviewed (max:50)" challenges={this.props.challenges} proposals={this.props.in_review} onAccept={this.handleAcception} onReject={this.handleRejection} onRecheck={this.handleRecheck} />
        <ReviewPanel name="Recheck (max:50)" challenges={this.props.challenges} proposals={this.props.recheck} onAccept={this.handleAcception} onReject={this.handleRejection} />
        <ReviewPanel name="Accepted (max:5)" challenges={this.props.challenges} proposals={this.props.accepted} onAccept={this.handleAcception} onReject={this.handleRejection} />
        <ReviewPanel name="Rejected (max:5)" challenges={this.props.challenges} proposals={this.props.rejected} onAccept={this.handleAcception} onReject={this.handleRejection} />
      </AdminWrapper>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('get.proposals.in_review', { limit: 50 });
  Meteor.subscribe('get.proposals.in_review_recheck', { limit: 50 });
  Meteor.subscribe('get.proposals.recently_accepted', { limit: 5 });
  Meteor.subscribe('get.proposals.recently_rejected', { limit: 5 });
  Meteor.subscribe('get.challenges')

  return {
    in_review: Proposals.find({ in_review: true, in_review_recheck: false }, { sort: { created_at: 1 } }).fetch(),
    recheck: Proposals.find({ in_review: true, in_review_recheck: true }, { sort: { created_at: 1 } }).fetch(),
    accepted: Proposals.find({ in_review: false, blocked: false }, { sort: { reviewed_at: -1 } }).fetch(),
    rejected: Proposals.find({ in_review: false, blocked: true }, { sort: { reviewed_at: -1 } }).fetch(),
    challenges: Challenges.find().fetch()
  };
}, ReviewPage);
