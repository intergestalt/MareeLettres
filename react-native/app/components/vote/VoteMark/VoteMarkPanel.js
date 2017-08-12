import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
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
      <View style={styles.panel}>
        <Text style={styles.panelText1}>
          {this.props.yes_amount}
        </Text>
        <VoteMark type="yes" />
        <Text style={styles.panelText2}>
          {this.props.no_amount}
        </Text>
        <VoteMark type="no" />
      </View>
    );
  }
}

export default VoteMarkPanel;
