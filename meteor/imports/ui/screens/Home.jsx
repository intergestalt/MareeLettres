import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import AdminWrapper from '../components/AdminWrapper';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      generalInfo: {}
    };
  }

  componentDidMount() {
    this.getGeneralInfo();
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
        </div>
      </AdminWrapper>
    );
  }
}

export default Home;

