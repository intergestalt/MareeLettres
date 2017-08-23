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
            {challenge.title.en}
            <br />
            {challenge.title.fr}
          </Link>
        </td>
        <td>
          {challenge.proposals_amount}
        </td>
        <td>
          <Moment format="DD.MM.YY HH:MM" tz="Europe/Paris">
            {challenge.start_date}
          </Moment>
          {challenge.start_date > Date.now() &&
            <span>
              <br />
              <small>
                <Moment fromNow element="small" tz="Europe/Paris">
                  {challenge.start_date}
                </Moment>
              </small>
            </span>}
        </td>
        <td>
          <Moment format="DD.MM.YY HH:MM" tz="Europe/Paris">
            {challenge.end_date}
          </Moment>
          {challenge.end_date > Date.now() &&
            <span>
              <br />
              <small>
                <Moment fromNow element="small" tz="Europe/Paris">
                  {challenge.end_date}
                </Moment>
              </small>
            </span>}
        </td>
        <td>
          <Moment format="DD.MM.YY HH:MM" tz="Europe/Paris">
            {challenge.proposals_end_date}
          </Moment>
          {challenge.proposals_end_date > Date.now() &&
            <span>
              <br />
              <small>
                <Moment fromNow element="small" tz="Europe/Paris">
                  {challenge.proposals_end_date}
                </Moment>
              </small>
            </span>}
        </td>
        <td className="impact">
          {challenge.winningProposal ? challenge.winningProposal.text : '-'}
        </td>
      </tr>,
    );
  }

  render() {
    return (
      <div>
        <Menu />
        <table className="tableFullBorder">
          <thead>
            <tr>
              <th>text</th>
              <th>proposals</th>
              <th>voting starts</th>
              <th>voting ends</th>
              <th>submission ends</th>
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
