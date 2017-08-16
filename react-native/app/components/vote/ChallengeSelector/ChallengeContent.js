import React, { Component, PropTypes } from 'react';
import { Animated, View, Text, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import { ProposalList } from '../ProposalList/';
import { ProposalTinder } from '../ProposalTinder/';
import { isFinished } from '../../../helper/dateFunctions';
import { styles } from './';

class ChallengeContent extends Component {
  static propTypes = {
    challengeOffset: PropTypes.number,
    selectedChallengeIndex: PropTypes.number,
    challenges: PropTypes.array,
    challengesTicker: PropTypes.array,
    isTinder: PropTypes.bool,
    isFinished: PropTypes.bool,
  };
  constructor(props) {
    super(props);

    this.state = {
      tinderContainerOffset: new Animated.ValueXY({ x: 0, y: 0 }),
    };
    if (this.props.challengeOffset === 0) {
      this.panResponderContent = this.createPanResponderContent();
    }
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
    return isFinished(this.getChallenge());
  }
  // Pan Logic
  // Content: Proposal Swipe

  createPanResponderContent() {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const d = new Date();
        this.startGestureContent = d.getTime();
        console.log('GOGOGO TINDER');
      },
      onPanResponderMove: (e, gesture) => {
        const myDx = gesture.dx;
        const myDy = gesture.dy;

        this.state.tinderContainerOffset.setValue({ x: myDx, y: myDy });
      },

      onPanResponderRelease: (e, gesture) => {
        const date = new Date();
        const stopGesture = date.getTime();
        const d = stopGesture - this.startGestureContent;

        /* let duration = 500 * ((screenWidth - Math.abs(gesture.dx)) / screenWidth);

        let dir = 0;
        if (d < 300 && Math.abs(gesture.dx) > 30) {
          if (gesture.vx > 0) {
            dir = 1;
            duration = 200;
          } else if (gesture.vx < 0) {
            dir = -1;
            duration = 200;
          }
        } else if (gesture.dx > screenWidth / 2) {
          dir = 1;
        } else if (gesture.dx < -(screenWidth / 2)) {
          dir = -1;
        }
        if (dir === 1 && this.isChallengeLeft()) {
          dir = 0;
        }
        if (dir === -1 && this.isChallengeRight()) {
          dir = 0;
        }

        if (dir === 1) {
          Animated.timing(this.state.challengeContainerOffsetX, {
            toValue: 0,
            duration,
          }).start(this.navigateDown);
        } else if (dir === -1) {
          Animated.timing(this.state.challengeContainerOffsetX, {
            toValue: -2 * screenWidth,
            duration,
          }).start(this.navigateUp);
        } else {
          Animated.spring(this.state.challengeContainerOffsetX, {
            toValue: -screenWidth,
          }).start();
        }
*/
        this.startGestureContent = -1;
      },
    });
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
    if (this.panResponderContent) {
      const myTinderStyle = [
        styles.tinderBoxToMove,
        { left: this.state.tinderContainerOffset.x, top: this.state.tinderContainerOffset.y },
      ];

      return (
        <View style={styles.challengeContent}>
          <View style={styles.tinderContainer}>
            <ProposalTinder proposalIndex={1} />
            <Animated.View {...this.panResponderContent.panHandlers} style={myTinderStyle}>
              <ProposalTinder proposalIndex={0} />
            </Animated.View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.challengeContent}>
        <View style={styles.tinderContainer}>
          <ProposalTinder proposalIndex={0} />
        </View>
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
    console.log('RENDER CONTENT');
    if (this.isFinished()) {
      return this.renderFinished();
    }
    if (this.props.isTinder) {
      return this.renderTinder();
    }
    return this.renderList();
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
export default connect(mapStateToProps)(ChallengeContent);
