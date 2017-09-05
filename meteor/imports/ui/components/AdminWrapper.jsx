import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'react-meteor-data';

import AccountsUIWrapper from '../components/AccountsUIWrapper';

class AdminWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AccountsUIWrapper />
        {Meteor.userId() != null ? this.props.children : ""}
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, AdminWrapper);
