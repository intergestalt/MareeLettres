import React, { Component, PropTypes } from 'react';
import { Animated, View, Text, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import { ProposalList } from '../ProposalList/';
import { ProposalTinder } from '../ProposalTinder/';
import { isFinished } from '../../../helper/dateFunctions';
import { styles } from './';
import { screenWidth } from '../../../helper/screen';
import { voteTinder } from '../../../actions/proposals';

class ChallengeContent extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    challengeOffset: PropTypes.number,
    selectedChallengeIndex: PropTypes.number,
    challenges: PropTypes.array,
    proposals: PropTypes.object,
    isTinder: PropTypes.bool,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.vote = this.vote.bind(this);
    this.voteYes = this.voteYes.bind(this);
    this.voteNo = this.voteNo.bind(this);

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

        let duration = 500 * ((screenWidth - Math.abs(gesture.dx)) / screenWidth);
        const myDx = gesture.dx;
        const myDy = gesture.dy;
        let dir = 0;
        if (d < 300 && Math.abs(gesture.dx) > 30) {
          if (gesture.vx > 0) {
            dir = 1;
            duration = 200;
          } else if (gesture.vx < 0) {
            dir = -1;
            duration = 200;
          }
        } else if (gesture.dx > screenWidth / 3) {
          dir = 1;
        } else if (gesture.dx < -(screenWidth / 3)) {
          dir = -1;
        }
        const toX = screenWidth * dir * 1.3;
        let f = 0;
        if (myDx !== 0) {
          f = myDy / myDx;
        }
        f /= 2;
        const toY = toX * f;

        if (dir === 1) {
          Animated.timing(this.state.tinderContainerOffset, {
            toValue: { x: toX, y: toY },
            duration,
          }).start(this.voteYes);
        } else if (dir === -1) {
          Animated.timing(this.state.tinderContainerOffset, {
            toValue: { x: toX, y: toY },
            duration,
          }).start(this.voteNo);
        } else {
          Animated.spring(this.state.tinderContainerOffset, {
            toValue: { x: 0, y: 0 },
          }).start();
        }

        this.startGestureContent = -1;
      },
    });
  }

  voteYes() {
    this.vote(true);
  }
  voteNo() {
    this.vote(false);
  }

  vote(yes) {
    this.state.tinderContainerOffset.setValue({ x: 0, y: 0 });
    this.props.dispatch(voteTinder(this.getChallenge()._id, yes));
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
    let backTinder = null;
    let frontTinder = null;

    if (this.panResponderContent) {
      const myTinderStyle = [
        styles.tinderBoxToMove,
        {
          transform: [
            {
              rotate: this.state.tinderContainerOffset.x.interpolate({
                inputRange: [-screenWidth, screenWidth],
                outputRange: ['-20deg', '20deg'],
              }),
            },
            {
              translateX: this.state.tinderContainerOffset.x,
            },
            {
              translateY: this.state.tinderContainerOffset.y,
            },
          ],
        },
      ];
      const noOpacity = this.state.tinderContainerOffset.x.interpolate({
        inputRange: [-screenWidth / 8, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      const yesOpacity = this.state.tinderContainerOffset.x.interpolate({
        inputRange: [0, screenWidth / 8],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });
      frontTinder = (
        <Animated.View {...this.panResponderContent.panHandlers} style={myTinderStyle}>
          <ProposalTinder
            challengeOffset={this.props.challengeOffset}
            noOpacity={noOpacity}
            yesOpacity={yesOpacity}
            proposalIndex={0}
          />
        </Animated.View>
      );

      if (this.props.proposals) {
        console.log('PROPOSALS');
        console.log(this.props.proposals.length);
        if (this.props.proposals.length > 1) {
          backTinder = (
            <ProposalTinder challengeOffset={this.props.challengeOffset} proposalIndex={1} />
          );
        } else if (this.props.proposals.length === 1) {
          backTinder = (
            <View style={styles.tinderContainer}>
              <Text>Nothing to Swipe</Text>
            </View>
          );
        } else if (this.props.proposals.length === 0) {
          frontTinder = (
            <View style={styles.tinderContainer}>
              <Text>Nothing to Swipe</Text>
            </View>
          );
        }
      } else {
        console.log('NO PROPOSALS');

        backTinder = (
          <View style={styles.tinderContainer}>
            <Text>Nothing to Swipe</Text>
          </View>
        );
      }
    } else if (this.props.proposals) {
      console.log('NO PAN BUT PROPOSALS');

      if (this.props.proposals.length > 0) {
        frontTinder = (
          <ProposalTinder challengeOffset={this.props.challengeOffset} proposalIndex={0} />
        );
      } else {
        frontTinder = (
          <View style={styles.tinderContainer}>
            <Text>Nothing to Swipe</Text>
          </View>
        );
      }
    } else {
      console.log('NO PAN NO PROPOSALS');
      frontTinder = (
        <View style={styles.tinderContainer}>
          <Text>Nothing to Swipe</Text>
        </View>
      );
    }
    return (
      <View style={styles.challengeContent}>
        <View style={styles.tinderContainer}>
          {backTinder}
          {frontTinder}
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
  renderError() {
    return (
      <View style={styles.challengeContent}>
        <Text>ERROR...</Text>
      </View>
    );
  }
  renderLoading() {
    return (
      <View style={styles.challengeContent}>
        <Text>Loading...</Text>
      </View>
    );
  }
  render() {
    if (this.props.isError) {
      return this.renderError();
    }
    if (this.props.isLoading) {
      return this.renderLoading();
    }
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

const mapStateToProps = (state, ownProps) => {
  const challenges = state.challenges.challenges;
  const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
  const isTinder = state.globals.isTinder;
  let proposals = null;
  let isError = false;
  let isLoading = false;
  if (selectedChallengeIndex !== -1) {
    const id = challenges[selectedChallengeIndex + ownProps.challengeOffset]._id;
    if (id) {
      const p = state.proposals[id];
      proposals = p.proposals;
      isError = p.isError;
      isLoading = p.isLoading;
    }
  }

  return {
    selectedChallengeIndex,
    challenges,
    proposals,
    isTinder,
    isError,
    isLoading,
  };
};
export default connect(mapStateToProps)(ChallengeContent);
