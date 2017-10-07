import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import PlayerCell from './PlayerCell'

class ProposalEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const proposal = this.props.proposal;
    const players = proposal.origin_ids.map((origin_id) => (
      <PlayerCell key={origin_id} origin_id={origin_id} />
    ))
    let status = "public";
    let style = {};
    if (proposal.in_review) {
      style = { opacity: 0.5 }
      if (proposal.in_review_recheck) {
        status = "In Recheck";
      } else {
        status = "In Review";
      }
    } else if (proposal.blocked) {
      style = { opacity: 0.5, color: '#400' }
      status = "blocked";
    }
    return (
      <tr key={proposal._id} style={style}>
        <td>
          {players}
        </td>
        <td>
          <tt>
            {proposal.score}
          </tt>
        </td>
        <td>
          <tt>
            {proposal.yes_votes}
          </tt>
        </td>
        <td>
          <tt>
            {proposal.no_votes}
          </tt>
        </td>
        <td>
          <tt>
            {proposal.votes_amount}
          </tt>
        </td>
        <td>
          <tt>
            {proposal.votes_changed}
          </tt>
        </td>
        <td>
          <tt>
            {proposal.score_trending.toString().substr(0, 5)}
          </tt>
        </td>
        <td>
          <span className="impact">
            {proposal.text}
          </span>
        </td>
        <td>
          <tt>
            <Link to={'/admin/proposals?challenge_id=' + proposal.challenge_id}>{this.props.challenge.title.en}</Link>
          </tt>
        </td>
        <td>
          {status}
        </td>
        <td style={{ whiteSpace: "nowrap" }}>
          {/* <button name={proposal._id} onClick={this.props.onDelete}>delete</button>&nbsp; */}
          {!proposal.in_review && <button name={proposal._id} onClick={this.props.onReview}>review</button>}
        </td>
      </tr>
    );
  }
}

export default ProposalEntry;
