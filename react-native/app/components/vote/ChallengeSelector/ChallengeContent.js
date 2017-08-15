import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { ProposalList } from '../ProposalList/';
import { styles } from './';

class ChallengeContent extends Component {
  static propTypes = {
    challengeOffset: PropTypes.number,
    selectedChallengeIndex: PropTypes.number,
    challenges: PropTypes.array,
    isTinder: PropTypes.bool,
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

  getAnswer() {
    const myChallenge = this.getChallenge();
    let answer = '';
    if (myChallenge) {
      const winning = myChallenge.winningProposal;
      if (winning) {
        answer = winning.text;
      }
    }
    return answer;
  }

  isFinished() {
    const myChallenge = this.getChallenge();
    const finished = myChallenge.isFinished;
    return finished;
  }

  renderFinished() {
    return (
      <View style={styles.challengeContent}>
        <Text style={styles.contentText}>
          {this.getAnswer()}
        </Text>
      </View>
    );
  }
  renderTinder() {
    return (
      <View style={styles.challengeContent}>
        <Text style={styles.contentText}>Tinder Mode</Text>
      </View>
    );
  }
  renderList() {
    return (
      <View style={styles.challengeContent}>
        <ProposalList challengeOffset={this.props.challengeOffset} />
      </View>
    );
  }

  render() {
    if (this.isFinished()) {
      return this.renderFinished();
    }
    if (this.props.isTinder) {
      return this.renderTinder();
    }
    return this.renderList();
  }
}

const mapStateToProps = (state, ownProps) => {
  const challenges = state.challenges.challenges;
  const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
  const isTinder = state.globals.isTinder;

  return {
    selectedChallengeIndex,
    challenges,
    isTinder,
  };
};
export default connect(mapStateToProps)(ChallengeContent);
