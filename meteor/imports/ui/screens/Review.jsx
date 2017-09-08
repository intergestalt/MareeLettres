import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import Moment from 'react-moment';

import AdminWrapper from '../components/AdminWrapper';
import Menu from '../components/menu';

import ReviewPanel from '../components/review/Panel';

import { SystemConfig } from '../../api/systemConfig/systemConfig';
import { Proposals } from '../../api/proposals/proposals';

class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAcception(event) {
    const proposal_id = event.target.name;
    const accepted = event.target.checked;
    const state = { in_review: false, blocked: false };
    Proposals.update(proposal_id, { $set: state })
  }

  handleRejection(event) {
    const proposal_id = event.target.name;
    const rejected = event.target.checked;
    const state = { in_review: false, blocked: true };
    Proposals.update(proposal_id, { $set: state })
  }

  render() {
    return (
      <AdminWrapper>
        <Menu />
        <ReviewPanel name="Unreviewed" proposals={this.props.in_review} onAccept={this.handleAcception} onReject={this.handleRejection} />
        <ReviewPanel name="Accepted" proposals={this.props.accepted} onAccept={this.handleAcception} onReject={this.handleRejection} />
        <ReviewPanel name="Rejected" proposals={this.props.rejected} onAccept={this.handleAcception} onReject={this.handleRejection} />
      </AdminWrapper>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('get.proposals.in_review', { limit: 5 });
  Meteor.subscribe('get.proposals.recently_accepted', { limit: 5 });
  Meteor.subscribe('get.proposals.recently_rejected', { limit: 5 });

  return {
    in_review: Proposals.find({ in_review: true }, { sort: { created_at: 1 } }).fetch(),
    accepted: Proposals.find({ in_review: false, blocked: false }, { sort: { reviewed_at: 1 } }).fetch(),
    rejected: Proposals.find({ in_review: false, blocked: true }, { sort: { reviewed_at: 1 } }).fetch(),
  };
}, ReviewPage);
