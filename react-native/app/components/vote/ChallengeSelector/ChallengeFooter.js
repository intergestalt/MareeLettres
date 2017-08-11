import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import styles from './styles';

class ChallengeFooter extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    challenges: PropTypes.array,
    selectedChallengeIndex: PropTypes.number,
  };
  render() {
    let color = { backgroundColor: '#FFFFFF' };
    if (this.props.backgroundColor) {
      color = { backgroundColor: this.props.backgroundColor };
    }
    return <View style={[styles.challengeFooter, color]} />;
  }
}
export default ChallengeFooter;
