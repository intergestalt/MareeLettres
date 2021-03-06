import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'react-meteor-data';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import filterDOMProps from 'uniforms/filterDOMProps';

import AccountsUIWrapper from '../components/AccountsUIWrapper';
import Menu from '../components/menu';

filterDOMProps.register('systems');

class AdminWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  authorizedContent() {
    return (
      <div className="AdminWrapper">
        <nav>
          <AccountsUIWrapper />
          {!this.props.hideMenu && <Menu router={this.props.router} />}
        </nav>
        <div className="main">
          {this.props.children}
          <Alert position='top-left'
            effect='slide'
            timeout={1500}
          />
        </div>
      </div>
    );
  }

  unauthorizedContent() {
    return (
      <div className="AdminWrapper">
        <nav>
          <AccountsUIWrapper />
        </nav>
      </div>
    );
  }

  render() {
    // console.log(this.props.router)
    return Meteor.userId() != null ? this.authorizedContent() : this.unauthorizedContent();
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, AdminWrapper);
