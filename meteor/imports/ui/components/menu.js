import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import ConnectionStatus from 'meteor-react-status';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAdminMenu() {
    return (
      <ul>
        <li>
          <Link to="/admin/review">Review Console</Link>
        </li>
        <br />
        <li>
          <Link to="/admin/challenges">Challenges</Link>
        </li>
        <li>
          <Link to="/admin/content">Content</Link>
        </li>
        <li>
          <Link to="/admin/feed">Feed</Link>
        </li>
        <br />
        <li>
          <Link to="/admin/players">Players</Link>
        </li>
        <li>
          <Link to="/admin/proposals">Proposals</Link>
        </li>
        <li>
          <Link to="/admin/letters">Letters</Link>
        </li>
        <br />
        <li>
          <Link to="/admin/status">Status</Link>
        </li>
        <li>
          <Link to="/admin/config">Config</Link>
        </li>
      </ul>);
  }

  renderReviewMenu() {
    return (
      <ul>
        <li>
          <Link to="/admin/review">Review Console</Link>
        </li>
      </ul>);
  }

  render() {
    return (
      <div className="mainMenu">
        <h1>
          <Link to="/admin" >Maree des Lettres</Link>
        </h1>
        {!this.props.loading && this.props.user.username === 'admin' ? this.renderAdminMenu() : this.renderReviewMenu()}
        <ConnectionStatus fullWidth />
      </div>
    );
  }
}

export default createContainer(() => {
  const loading = !Meteor.user();
  const user = Meteor.user();
  return { loading, user };
}, Menu);
