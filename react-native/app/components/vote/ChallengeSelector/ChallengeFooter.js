import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

class ChallengeFooter extends Component {
  static propTypes = {
    challengeOffset: PropTypes.number,
    challenges: PropTypes.array,
    selectedChallengeIndex: PropTypes.number,
    isTinder: PropTypes.bool,
    handleSharePress: PropTypes.func,
    handleTinderPress: PropTypes.func,
    handleListPress: PropTypes.func,
    handleCommitPress: PropTypes.func,
  };

  getChallengeIndex() {
    return this.props.selectedChallengeIndex + this.props.challengeOffset;
  }

  getChallenge() {
    if (
      this.getChallengeIndex() < 0 ||
      this.getChallengeIndex() > this.props.challenges.length - 1
    ) {
      return null;
    }
    return this.props.challenges[this.getChallengeIndex()];
  }

  isFinished() {
    const challenge = this.getChallenge();

    const finished = challenge.isFinished;
    return finished;
  }
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

  render() {
    if (this.isFinished()) {
      return this.renderFinished();
    }
    return this.renderUnfinished();
  }
}
const mapStateToProps = (state) => {
  const challenges = state.challenges.challenges;
  const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
  const isTinder = state.globals.isTinder;
  return {
    selectedChallengeIndex,
    challenges,
    isTinder,
  };
};
export default connect(mapStateToProps)(ChallengeFooter);
