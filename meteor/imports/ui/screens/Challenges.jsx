import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import Moment from 'react-moment';
import 'moment-timezone';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';

import Menu from '../components/menu';
import ApiInfo from '../components/ApiInfo';

class ChallengesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <Moment format="MM.DD.YY HH:MM" tz="Europe/Paris">
            {challenge.start_date}
          </Moment>
        </td>
        <td>
          <Moment format="MM.DD.YY HH:MM" tz="Europe/Paris">
            {challenge.end_date}
          </Moment>
          {challenge.end_date > Date.now() &&
            <span>
              &nbsp;(
              <Moment fromNow element="small" tz="Europe/Paris">
                {challenge.end_date}
              </Moment>
              )
            </span>}
        </td>
        <td>
          {challenge.winningProposal ? challenge.winningProposal.text : '-'}
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
              <th>winningProposal</th>
            </tr>
          </thead>
          <tbody>
            {this.renderChallenges()}
          </tbody>
        </table>
        <p>
          &#8505; <small>All times in Paris time</small>
        </p>
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
