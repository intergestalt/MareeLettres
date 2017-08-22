import React, { Component, PropTypes } from 'react';
import { Animated, View, Text, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import { ProposalList } from '../ProposalList/';
import { ProposalTinder } from '../ProposalTinder/';
import { isFinished } from '../../../helper/dateFunctions';
import { styles } from './';
import { screenWidth } from '../../../helper/screen';
import { deleteProposalFromTinderList } from '../../../actions/proposals';
import { userVoteInternal } from '../../../actions/userVotes';

import { PROPOSAL_VIEWS } from '../../../consts/';
import { getProposalList } from '../../../helper/proposalsHelper';
import { loadProposalsServiceProxy } from '../../../helper/apiProxy';
import { LOAD_CONFIG } from '../../../config/config';

class ChallengeContent extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    challengeOffset: PropTypes.number,
    selectedChallengeIndex: PropTypes.number,
    challenges: PropTypes.array,
    proposals: PropTypes.object,
    proposalView: PropTypes.string,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    onMostPress: PropTypes.func,
    onTrendingPress: PropTypes.func,
    onNewestPress: PropTypes.func,
    lastLoaded: PropTypes.number,
    setFlatlistRef: PropTypes.func,
    listEnabled: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.tinderVote = this.tinderVote.bind(this);
    this.tinderVoteYes = this.tinderVoteYes.bind(this);
    this.tinderVoteNo = this.tinderVoteNo.bind(this);

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
          }).start(this.tinderVoteYes);
        } else if (dir === -1) {
          Animated.timing(this.state.tinderContainerOffset, {
            toValue: { x: toX, y: toY },
            duration,
          }).start(this.tinderVoteNo);
        } else {
          Animated.spring(this.state.tinderContainerOffset, {
            toValue: { x: 0, y: 0 },
          }).start();
        }

        this.startGestureContent = -1;
      },
    });
  }

  tinderVoteYes() {
    this.tinderVote(true);
  }
  tinderVoteNo() {
    this.tinderVote(false);
  }

  checkToLoadMoreProposals() {
    const id = this.props.challenges[this.props.selectedChallengeIndex]._id;
    const length = this.props.proposals.length;
    if (length > LOAD_CONFIG.PROPOSAL_RELOAD_TINDER_OFFSET) return;
    const limit = LOAD_CONFIG.DEFAULT_PROPOSAL_LIMIT;

    let force = false;
    let lastNotLoad = true;
    if (this.props.lastLoaded > 0) {
      force = true;
      lastNotLoad = false;
    }

    loadProposalsServiceProxy(
      force,
      id,
      limit,
      LOAD_CONFIG.LOAD_QUIET_TINDER,
      false,
      false,
      lastNotLoad,
    );
  }

  tinderVote(yes) {
    const proposalId = this.props.proposals[0]._id;
    this.props.dispatch(userVoteInternal(proposalId, yes));
    this.state.tinderContainerOffset.setValue({ x: 0, y: 0 });
    this.props.dispatch(deleteProposalFromTinderList(this.getChallenge()._id));
    this.checkToLoadMoreProposals();
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
        <ProposalTinder
          panResponderContent={this.panResponderContent}
          myTinderStyle={myTinderStyle}
          challengeOffset={this.props.challengeOffset}
          noOpacity={noOpacity}
          yesOpacity={yesOpacity}
          proposalIndex={0}
        />
      );
      backTinder = (
        <ProposalTinder challengeOffset={this.props.challengeOffset} proposalIndex={1} />
      );
    } else if (this.props.proposals) {
      frontTinder = (
        <ProposalTinder challengeOffset={this.props.challengeOffset} proposalIndex={0} />
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
        <ProposalList
          onMostPress={this.props.onMostPress}
          onTrendingPress={this.props.onTrendingPress}
          onNewestPress={this.props.onNewestPress}
          challengeOffset={this.props.challengeOffset}
          setFlatlistRef={this.props.setFlatlistRef}
          listEnabled={this.props.listEnabled}
        />
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
    if (this.isFinished()) {
      return this.renderFinished();
    }
    if (this.props.proposalView === PROPOSAL_VIEWS.TINDER) {
      return this.renderTinder();
    }
    return this.renderList();
  }
}

const mapStateToProps = (state, ownProps) => {
  const challenges = state.challenges.challenges;
  const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
  const proposalView = state.globals.proposalView;
  const proposalListMode = state.globals.proposalListMode;
  let proposals = null;
  let isError = false;
  let isLoading = false;
  let lastLoaded = 1;
  if (selectedChallengeIndex !== -1) {
    const id = challenges[selectedChallengeIndex + ownProps.challengeOffset]._id;
    if (id) {
      // all 4 lists
      const p = state.proposals[id];
      // get the correct list
      const p2 = getProposalList(p, proposalView, proposalListMode);
      proposals = p2.proposals;
      isError = p2.isError;
      isLoading = p2.isLoading;
      lastLoaded = p2.lastLoaded;
    }
  }

  return {
    selectedChallengeIndex,
    challenges,
    proposals,
    proposalView,
    proposalListMode,
    isError,
    isLoading,
    lastLoaded,
  };
};
export default connect(mapStateToProps)(ChallengeContent);
