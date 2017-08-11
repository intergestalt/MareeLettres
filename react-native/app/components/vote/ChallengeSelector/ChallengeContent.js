import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

class ChallengeContent extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    isFinished: PropTypes.bool,
    isTinder: PropTypes.bool,
    challenges: PropTypes.array,
    selectedChallengeIndex: PropTypes.number,
  };

  renderFinished(color) {
    return (
      <View style={[styles.challengeContent, color]}>
        <Text style={styles.contentText}>Finished</Text>
      </View>
    );
  }

  renderUnfinished(color) {
    return (
      <View style={[styles.challengeContent, color]}>
        {this.props.isTinder
          ? <Text style={styles.contentText}>Tinder Mode</Text>
          : <Text style={styles.contentText}>List Mode</Text>}
      </View>
    );
  }
  render() {
    let color = { backgroundColor: '#FFFFFF' };
    if (this.props.backgroundColor) {
      color = { backgroundColor: this.props.backgroundColor };
    }
    if (this.props.isFinished) {
      return this.renderFinished(color);
    }
    return this.renderUnfinished(color);
  }
}

export default ChallengeContent;
