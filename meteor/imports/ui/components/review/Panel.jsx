import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import _ from "underscore";

class ReviewPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  listItems(proposals) {
    return proposals.map((proposal) => {
      const accepted = (!proposal.blocked && !proposal.in_review && !proposal.in_review_recheck);
      const rejected = (proposal.blocked);
      console.log(proposal.challenge_id, _.findWhere(this.props.challenges, { _id: proposal.challenge_id }))
      const challenge = _.findWhere(this.props.challenges, { _id: proposal.challenge_id })
      return (
        <li key={proposal._id} className="reviewPanel__entry">
          <div className="reviewPanel__proposalInfo">
            <small>{challenge ? challenge.title.en : "(?)"}</small><br />
            <tt className="proposal_text impact">{proposal.text}</tt>
            <a className="proposal_origin" href="">
              {proposal.origin_id}
            </a>
          </div>
          <div className="reviewPanel__proposalDecision">
            <label>
              <input type="checkbox" className="accepted" checked={accepted} onChange={this.props.onAccept} name={proposal._id} /> Accept
            </label>
            {this.props.onRecheck && <button name={proposal._id} className="button button-inline" onClick={this.props.onRecheck}>Recheck</button>}
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
