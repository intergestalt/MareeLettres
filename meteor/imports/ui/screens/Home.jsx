import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import Menu from '../components/menu';

class Home extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Menu/>
    );
  }
}

export default Home;

