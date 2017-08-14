import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

class ChallengeFooter extends Component {
  static propTypes = {
    challenges: PropTypes.array,
    challengeIndex: PropTypes.number,
    isTinder: PropTypes.bool,
    handleSharePress: PropTypes.func,
    handleTinderPress: PropTypes.func,
    handleListPress: PropTypes.func,
    handleCommitPress: PropTypes.func,
  };

  renderFinished() {
    return (
      <View style={styles.challengeFooter}>
        <View style={styles.challengeFooterFinished}>
          <TouchableOpacity onPress={this.props.handleSharePress}>
            <Text style={styles.challengeFooterText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  renderTinderButton() {
    return this.props.isTinder
      ? <TouchableOpacity onPress={this.props.handleListPress}>
        <Text style={styles.challengeFooterText}>List</Text>
      </TouchableOpacity>
      : <TouchableOpacity onPress={this.props.handleTinderPress}>
        <Text style={styles.challengeFooterText}>Tinder</Text>
      </TouchableOpacity>;
  }

  renderUnfinished() {
    return (
      <View style={styles.challengeFooter}>
        <View style={styles.challengeFooterUnfinished}>
          {this.renderTinderButton()}
          <TouchableOpacity onPress={this.props.handleCommitPress}>
            <Text style={styles.challengeFooterText}>Commit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  isFinished() {
    let finished = false;
    if (this.props.challenges) {
      if (
        this.props.challengeIndex >= 0 &&
        this.props.challengeIndex < this.props.challenges.length
      ) {
        const myChallenge = this.props.challenges[this.props.challengeIndex];
        if (myChallenge) {
          finished = myChallenge.isFinished;
        }
      }
    }
    return finished;
  }

  render() {
    if (this.isFinished()) {
      return this.renderFinished();
    }
    return this.renderUnfinished();
  }
}
export default ChallengeFooter;
