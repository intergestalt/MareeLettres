import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { ChallengeHeadActive, ChallengeHeadInactive } from './../ChallengesList';

import { SwipeButton, styles } from './';
import { CHALLENGE_VIEWS } from '../../../consts';

class ChallengeHeader extends Component {
  static propTypes = {
    challengeOffset: PropTypes.number,
    challenges: PropTypes.array,
    challengesTicker: PropTypes.object,
    selectedChallengeIndex: PropTypes.number,
    onHeaderPress: PropTypes.func,
    panResponder: PropTypes.object,
    viewMode: PropTypes.string,
    callerViewMode: PropTypes.string,
    language: PropTypes.string,
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.viewMode === CHALLENGE_VIEWS.SUGGEST) {
      return false;
    }
    if (this.props.callerViewMode !== this.props.viewMode) {
      return false;
    }
    return true;
  }
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
    const challengeTickerData = this.getChallengeTickerData();
    const challenge = this.getChallenge();

    const standardizedChallenge = {
      title: challenge.title[this.props.language],
      id: this.getChallenge()._id,
    };
    const contentDown = (
      <SwipeButton
        styleAbsolute={false}
        up={false}
        challengeOffset={this.props.challengeOffset}
        opacity={1}
      />
    );
    const contentUp = (
      <SwipeButton
        styleAbsolute={false}
        up
        challengeOffset={this.props.challengeOffset}
        opacity={1}
      />
    );
    const finished = challengeTickerData.finished;
    const contentMiddle = (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity delayPressIn={50} onPress={this.props.onHeaderPress} activeOpacity={0.5}>
          {!finished ? (
            <ChallengeHeadActive
              callerViewMode={CHALLENGE_VIEWS.DETAIL}
              data={standardizedChallenge}
            />
          ) : (
            <ChallengeHeadInactive
              callerViewMode={CHALLENGE_VIEWS.DETAIL}
              data={standardizedChallenge}
              hideTicker
            />
          )}
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
  try {
    const challenges = state.challenges.challenges;
    const challengesTicker = state.challengesTicker;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
    const language = state.globals.language;
    const viewMode = state.challenges.challengeView;

    return {
      selectedChallengeIndex,
      challenges,
      challengesTicker,
      language,
      viewMode,
    };
  } catch (e) {
    console.log('ChallengeHeader');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeHeader);
