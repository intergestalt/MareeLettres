import React, { Component, PropTypes } from 'react';
import { Animated, View, Text, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import { ProposalList } from '../ProposalList/';
import { ProposalTinder } from '../ProposalTinder/';
import { isFinished } from '../../../helper/dateFunctions';
import { styles } from './';
import { screenWidth } from '../../../helper/screen';
import { deleteProposalFromTinderList } from '../../../actions/proposals';
import { userVoteInternal } from '../../../actions/user';

import { PROPOSAL_VIEWS } from '../../../consts/';
import { getProposalList } from '../../../helper/proposalsHelper';
import { loadProposalsServiceProxy } from '../../../helper/apiProxy';
import { DYNAMIC_CONFIG } from '../../../config/config';
import { listIsEmpty } from '../../../helper/helper';

class ChallengeContent extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    challengeOffset: PropTypes.number,
    selectedChallengeIndex: PropTypes.number,
    challenges: PropTypes.array,
    proposals: PropTypes.array,
    proposalView: PropTypes.string,
    isLoading: PropTypes.bool,
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
    if (length > DYNAMIC_CONFIG.PROPOSAL_RELOAD_TINDER_OFFSET) return;
    const limit = DYNAMIC_CONFIG.DEFAULT_PROPOSAL_TINDER_LIMIT;

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
      DYNAMIC_CONFIG.LOAD_QUIET_TINDER.bool,
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

  colors = {
    yes: 'green',
    no: 'red',
    neutral: 'black',
    inactive: '#535353',
  };

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

      const textColor = this.state.tinderContainerOffset.x.interpolate({
        inputRange: [-screenWidth / 8, 0, screenWidth / 8],
        outputRange: [this.colors.no, this.colors.neutral, this.colors.yes],
        extrapolate: 'clamp',
      });
      frontTinder = (
        <ProposalTinder
          panResponderContent={this.panResponderContent}
          myTinderStyle={myTinderStyle}
          challengeOffset={this.props.challengeOffset}
          noOpacity={noOpacity}
          yesOpacity={yesOpacity}
          textColor={textColor}
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
  renderEmptyList() {
    return (
      <View style={styles.challengeContent}>
        <Text>Empty Proposal List...</Text>
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
    if (this.props.isLoading) {
      return this.renderLoading();
    }
    if (this.isFinished()) {
      return this.renderFinished();
    }
    if (listIsEmpty(this.props.proposals)) {
      return this.renderEmptyList();
    }

    if (this.props.proposalView === PROPOSAL_VIEWS.TINDER) {
      return this.renderTinder();
    }
    return this.renderList();
  }
}

const mapStateToProps = (state, ownProps) => {
  try {
    const challenges = state.challenges.challenges;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
    const proposalView = state.challenges.proposalView;
    const proposalListMode = state.challenges.proposalListMode;
    let proposals = null;
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
      isLoading,
      lastLoaded,
    };
  } catch (e) {
    console.log('ChallengeContent');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeContent);
