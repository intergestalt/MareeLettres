import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import AdminWrapper from '../components/AdminWrapper';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      generalInfo: {},
      players: '...',
    };
  }

  componentDidMount() {
    this.getGeneralInfo();
  }

  componentWillUnmount() {
    Meteor.subscribe('counts', []);
  }

  getGeneralInfo() {
    Meteor.call('getGeneralInfo', (err, res) => {
      if (err) {
        console.log(JSON.stringify(err, null, 2))
      } else {
        this.setState((prevState, props) => prevState.generalInfo = res);
      }
    });
  }

  render() {
    return (
      <AdminWrapper>
        <div className="homePage">
          <h3>Welcome to Maree des Lettres Admin Area</h3>
          <br />
          <div>Server: <b>{this.state.generalInfo.server}</b></div>
          <br />
          <ul className="statistics">
            <li>
              <b>{this.props.counts.players}</b> Players
            </li>
            <li>
              <b>{this.props.counts.proposals}</b> Proposals
            </li>
            <li>
              <b>{this.props.counts.letters}</b> Active Letters
            </li>
          </ul>
        </div>
      </AdminWrapper>
    );
  }
}


export default createContainer(() => {
  Meteor.subscribe('counts', ['players', 'proposals', 'letters']);

  return {
    counts: {
      players: Counts.get('players'),
      proposals: Counts.get('proposals'),
      letters: Counts.get('letters'),
    }
  };
}, Home);
