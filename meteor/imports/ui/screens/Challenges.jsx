import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import Moment from 'react-moment';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';

import Menu from '../components/menu';
import ApiInfo from '../components/ApiInfo';

class ChallengesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderProposals() {
    const proposals = this.props.proposals;
    return proposals.map(proposal =>
      <li key={proposal._id}>
        {proposal.text}
      </li>,
    );
  }

  renderChallenges() {
    const challenges = this.props.challenges;
    return challenges.map(challenge =>
      <tr key={challenge._id}>
        <td>
          <Link to={`/admin/challenges/${challenge._id}`}>
            {challenge.title}
          </Link>
        </td>
        <td>
          {challenge.proposals_amount}
        </td>
        <td>
          <Moment fromNow>
            {challenge.start_date}
          </Moment>
        </td>
        <td>
          <Moment fromNow>
            {challenge.end_date}
          </Moment>
        </td>
      </tr>,
    );
  }

  render() {
    return (
      <div>
        <Menu />
        <table>
          <thead>
            <tr>
              <th>text</th>
              <th># proposals</th>
              <th>start</th>
              <th>end</th>
            </tr>
          </thead>
          <tbody>
            {this.renderChallenges()}
          </tbody>
        </table>
        <ApiInfo path="challenges" />
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('get.challenges');

  return {
    challenges: Challenges.find({}, { sort: { start_date: 1 } }).fetch(),
  };
}, ChallengesIndex);
