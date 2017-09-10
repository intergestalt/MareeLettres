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
      <PlayerCell origin_id={origin_id} />
    ))
    return (
      <tr key={proposal._id}>
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
          <span className="impact">
            {proposal.text}
          </span>
        </td>
        <td>
          <tt>
            {proposal.challenge_id}
          </tt>
        </td>
        <td style={{ whiteSpace: "nowrap" }}>
          <button name={proposal._id} onClick={this.props.onDelete}>delete</button>&nbsp;
          {!proposal.in_review && <button name={proposal._id} onClick={this.props.onReview}>review</button>}
        </td>
      </tr>
    );
  }
}

export default ProposalEntry;
