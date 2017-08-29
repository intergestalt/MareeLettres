import React, { Component } from 'react';
import { OriginId } from 'maree-lettres-shared';

import 'react-table/react-table.css';

class PlayerCell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.origin_id == null || typeof this.props.origin_id === "undefined") {
      return (
        <span> - </span>
      )
    }

    return (
      <code>
        {OriginId.getOrigin(this.props.origin_id)}
      <br />
      <small>
        {this.props.origin_id}
      </small>
      </code>
    )
  }
}

export default PlayerCell