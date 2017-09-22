import React, { Component, PropTypes } from 'react';
import VoteMark from './VoteMark';

import styles from './styles';

class VoteMarkPanel extends Component {
  static propTypes = {
    yes_amount: PropTypes.number,
    no_amount: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div style={styles.panel}>
        <span style={styles.panelText1}>{this.props.no_amount}</span>
        <VoteMark type="no" color="inactive" size="s" />
        <span style={styles.panelText2}>{this.props.yes_amount}</span>
        <VoteMark type="yes" color="inactive" size="s" />
      </div>
    );
  }
}

export default VoteMarkPanel;
