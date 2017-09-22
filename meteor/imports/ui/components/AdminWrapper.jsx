import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'react-meteor-data';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

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
        <Alert position='top-left'
          effect='slide'
          timeout={1500}
        />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, AdminWrapper);
