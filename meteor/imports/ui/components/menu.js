import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import { Challenges } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>
          <Link to="/">Maree des Lettres</Link>
        </h1>
        <ul>
          <li>
            <Link to="/admin/challenges">Challenges</Link>
          </li>
          <li>
            <Link to="/admin/content">Content</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;
