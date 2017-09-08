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
    return (
      <tr key={proposal._id}>
        <td>
          <PlayerCell origin_id={proposal.origin_id} />
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
        <td>
          <button name={proposal._id} onClick={this.props.onDelete}>delete</button>
        </td>
      </tr>
    );
  }
}

export default ProposalEntry;
