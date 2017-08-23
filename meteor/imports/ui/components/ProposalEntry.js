import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { OriginId } from 'maree-lettres-shared';

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
          <code>
            {OriginId.getOrigin(proposal.origin_id)}
            <br />
            <small>
              {proposal.origin_id}
            </small>
          </code>
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
      </tr>
    );
  }
}

export default ProposalEntry;
