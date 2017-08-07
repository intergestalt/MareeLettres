import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

class ApiInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const uri = `/api/${this.props.path}`;
    return (
      <p>
        API:&nbsp;
        <a href={uri} target="_blank">
          {uri}
        </a>
      </p>
    );
  }
}

export default ApiInfo;
