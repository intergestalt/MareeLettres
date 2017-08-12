import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

class ChallengeContent extends Component {
  static propTypes = {
    isTinder: PropTypes.bool,
    challenges: PropTypes.array,
    challengeIndex: PropTypes.number,
  };

  getChallenge() {
    if (this.props.challenges) {
      if (
        this.props.challengeIndex >= 0 &&
        this.props.challengeIndex < this.props.challenges.length
      ) {
        const myChallenge = this.props.challenges[this.props.challengeIndex];
        if (myChallenge) {
          return myChallenge;
        }
      }
    }
    return null;
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
    let finished = false;
    if (myChallenge) {
      finished = myChallenge.isFinished;
    }
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

  renderUnfinished() {
    return (
      <View style={styles.challengeContent}>
        {this.props.isTinder
          ? <Text style={styles.contentText}>Tinder Mode</Text>
          : <Text style={styles.contentText}>List Mode</Text>}
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

export default ChallengeContent;
