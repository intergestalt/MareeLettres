import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

class ChallengeHeader extends Component {
  static propTypes = {
    challengeOffset: PropTypes.number,
    challenges: PropTypes.array,
    challengesTicker: PropTypes.array,
    selectedChallengeIndex: PropTypes.number,
    onHeaderPress: PropTypes.func,
    onUpPress: PropTypes.func,
    onDownPress: PropTypes.func,
    panResponder: PropTypes.object,
    language: PropTypes.string,
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
  getChallengeTickerData() {
    const myChallenge = this.getChallenge();
    if (myChallenge) {
      return this.props.challengesTicker[myChallenge._id];
    }
    return null;
  }
  render() {
    let buttonUp = null;
    if (this.getChallengeIndex() < this.props.challenges.length - 1) {
      buttonUp = (
        <TouchableOpacity onPress={this.props.onUpPress} style={{ flex: 1 }}>
          <View style={styles.headerNavContainer}>
            <Text style={styles.headerNav}>
              {'>'}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    let buttonDown = null;
    if (this.getChallengeIndex() > 0) {
      buttonDown = (
        <TouchableOpacity onPress={this.props.onDownPress} style={{ flex: 1 }}>
          <View style={styles.headerNavContainer}>
            <Text style={styles.headerNav}>
              {'<'}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    const contentDown = (
      <View style={styles.headerDownContainer}>
        {buttonDown}
      </View>
    );
    const contentUp = (
      <View style={styles.headerUpContainer}>
        {buttonUp}
      </View>
    );
    const challengeTickerData = this.getChallengeTickerData();
    const challenge = this.getChallenge();
    let myEndString = null;
    if (this.props.language === 'en') {
      myEndString = challengeTickerData.endStringEn;
    } else {
      myEndString = challengeTickerData.endStringFr;
    }

    const contentMiddle = (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity delayPressIn={30} onPress={this.props.onHeaderPress}>
          <Text style={styles.headerText}>
            VOTE #{challenge.voteNum}
          </Text>
          <Text style={styles.headerText}>
            {myEndString}
          </Text>
          <Text style={styles.headerText}>
            {challengeTickerData.tickerString}
          </Text>
          <Text style={styles.headerText}>
            {this.getChallenge().title[this.props.language]}
          </Text>
        </TouchableOpacity>
      </View>
    );
    if (this.props.panResponder) {
      return (
        <View {...this.props.panResponder.panHandlers} style={styles.challengeHeader}>
          {contentDown}
          {contentMiddle}
          {contentUp}
        </View>
      );
    }
    return (
      <View style={styles.challengeHeader}>
        {contentDown}
        {contentMiddle}
        {contentUp}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const challenges = state.challenges.challenges;
  const challengesTicker = state.challengesTicker;
  const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
  const language = state.globals.language;

  return {
    selectedChallengeIndex,
    challenges,
    challengesTicker,
    language,
  };
};
export default connect(mapStateToProps)(ChallengeHeader);
