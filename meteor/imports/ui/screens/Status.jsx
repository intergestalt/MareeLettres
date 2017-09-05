import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import Moment from 'react-moment';

import AdminWrapper from '../components/AdminWrapper';
import Menu from '../components/menu';

import { Status } from '../../api/status/status';

class StatusPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItems(items) {
    return Object.keys(items).map(i =>
      <li>
        {i}: {items[i]}
      </li>,
    );
  }

  renderStatus() {
    const status = this.props.status;
    return status.map(s =>
      <li key={s._id}>
        {s.machine_key}
        <ul>
          {this.renderItems(s.items)}
        </ul>
      </li>,
    );
  }

  render() {
    return (
      <AdminWrapper>
        <Menu />
        <ul>
          {this.renderStatus()}
        </ul>
      </AdminWrapper>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('get.status');

  return {
    status: Status.find().fetch(),
  };
}, StatusPage);
