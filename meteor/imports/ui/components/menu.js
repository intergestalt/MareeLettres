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

  render() {
    return (
      <div>
        <h1>
          <Link to="/admin">Maree des Lettres</Link>
        </h1>
        <ul>
          <li>
            <Link to="/admin/challenges">Challenges</Link>
          </li>
          <li>
            <Link to="/admin/proposals">Proposals</Link>
          </li>
          <li>
            <Link to="/admin/players">Players</Link>
          </li>
          <li>
            <Link to="/admin/letters">Letters</Link>
          </li>
          <li>
            <Link to="/admin/content">Content</Link>
          </li>
          <li>
            <Link to="/admin/status">Status</Link>
          </li>
          <li>
            <Link to="/admin/config">Config</Link>
          </li>
        </ul>
        <ConnectionStatus fullWidth />
      </div>
    );
  }
}

export default Menu;
