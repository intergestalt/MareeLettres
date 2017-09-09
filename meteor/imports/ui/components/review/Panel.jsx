import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

class ReviewPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  listItems(proposals) {
    return proposals.map((proposal) => {
      const accepted = (!proposal.blocked && !proposal.in_review);
      const rejected = (proposal.blocked);
      return (
        <li key={proposal._id} className="reviewPanel__entry">
          <div className="reviewPanel__proposalInfo">
            <tt className="proposal_text impact">{proposal.text}</tt>
            <a className="proposal_origin" href="">
              {proposal.origin_id}
            </a>
          </div>
          <div className="reviewPanel__proposalDecision">
            <label>
              <input type="checkbox" className="accepted" checked={accepted} onChange={this.props.onAccept} name={proposal._id} /> Accept
            </label>
            <label>
              <input type="checkbox" className="rejected" checked={rejected} onChange={this.props.onReject} name={proposal._id} /> Reject
            </label>
          </div>
        </li>
      )
    })
  }
  render() {
    return (
      <div className="reviewPanel">
        <h3 className="reviewPanel__title">{this.props.name}</h3>
        <ul className="reviewPanel__panel">
          {this.listItems(this.props.proposals)}
        </ul>
      </div >
    );
  }
}

export default ReviewPanel;
