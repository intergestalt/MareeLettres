import React, { Component, PropTypes } from 'react';
import { Image, Animated, View, Text, PanResponder, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';

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
import { gradient0 } from '../../../config/gradients';
import { listIsEmpty, isEmpty } from '../../../helper/helper';
import { ReloadButton } from '../../../components/general/ReloadButton';

import I18n from '../../../i18n/i18n';
import { setUserVoteTutorialStatusProxy } from '../../../helper/userHelper';
import { connectAlert } from '../../../components/general/Alert';

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
    challengeId: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.tinderVote = this.tinderVote.bind(this);
    this.tinderVoteYes = this.tinderVoteYes.bind(this);
    this.tinderVoteNo = this.tinderVoteNo.bind(this);
    this.tinderVoteYesAnim = this.tinderVoteYesAnim.bind(this);
    this.tinderVoteNoAnim = this.tinderVoteNoAnim.bind(this);
    this.handleReloadPressPress = this.handleReloadPressPress.bind(this);
    this.state = {
      tinderContainerOffset: new Animated.ValueXY({ x: 0, y: 0 }),
      tinderBackground: new Animated.Value(0),
      tinderBackgroundOpacity: new Animated.Value(0),
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
  getAnswerImgUrl() {
    const myChallenge = this.getChallenge();
    let url = null;
    if (myChallenge) {
      url = myChallenge.winningProposalImageUrl;
      if (!url || url.trim() === '') {
        url = null;
      }
    }
    return url;
  }
  isFinished() {
    return isFinished(this.getChallenge());
  }
  // Pan Logic
  // Content: Proposal Swipe

  createPanResponderContent() {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (e, gesture) => {
        if (Math.abs(gesture.dx) > 3) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: () => {
        const d = new Date();
        this.startGestureContent = d.getTime();
        this.state.tinderBackgroundOpacity.setValue(1);
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

  tinderVoteYesAnim() {
    const toX = screenWidth * 1 * 1.3;
    Animated.timing(this.state.tinderContainerOffset, {
      toValue: { x: toX, y: 0 },
      duration: 400,
    }).start(() => {
      this.tinderVote(true);
    });
  }
  tinderVoteNoAnim() {
    const toX = screenWidth * -1 * 1.3;
    Animated.timing(this.state.tinderContainerOffset, {
      toValue: { x: toX, y: 0 },
      duration: 400,
    }).start(() => {
      this.tinderVote(false);
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
    Animated.timing(this.state.tinderBackground, {
      toValue: 1,
      duration: 200,
    }).start(() => {
      const proposalId = this.props.proposals[0]._id;
      this.props.dispatch(userVoteInternal(proposalId, yes));
      this.state.tinderContainerOffset.setValue({ x: 0, y: 0 });
      this.state.tinderBackground.setValue(0);
      this.props.dispatch(deleteProposalFromTinderList(this.getChallenge()._id));
      this.checkToLoadMoreProposals();

      if (this.props.voteTutorialStatus) {
        if (!this.props.voteTutorialStatus.tinder2) {
          this.props.alertWithType(
            'info',
            I18n.t('vote_tutorial_3_title'),
            I18n.t('vote_tutorial_3_text'),
          );
          setUserVoteTutorialStatusProxy('tinder2');
        }
      }
    });
  }

  colors = {
    yes: 'rgb(0,200,0)',
    no: 'red',
    neutral: 'black',
    inactive: '#aaaaaa',
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
      /*   const tinderBackgroundColor = this.state.tinderContainerOffset.x.interpolate({
        inputRange: [-screenWidth, 0, screenWidth],
        outputRange: ['#FFFFFF', this.colors.inactive, '#FFFFFF'],
        extrapolate: 'clamp',
      }); */

      const tinderBackgroundColor = this.state.tinderBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [this.colors.inactive, '#FFFFFF'],
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
          yesPress={this.tinderVoteYesAnim}
          noPress={this.tinderVoteNoAnim}
        />
      );
      backTinder = (
        <ProposalTinder
          tinderBackgroundColor={tinderBackgroundColor}
          tinderBackgroundOpacity={this.state.tinderBackgroundOpacity}
          challengeOffset={this.props.challengeOffset}
          proposalIndex={1}
        />
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
          isFinished={this.isFinished()}
        />
      </View>
    );
  }

  handleReloadPressPress = () => {
    let limit = null;
    if (this.props.proposalView === PROPOSAL_VIEWS.LIST) {
      limit = DYNAMIC_CONFIG.DEFAULT_PROPOSAL_LIST_LIMIT;
    } else {
      limit = DYNAMIC_CONFIG.DEFAULT_PROPOSAL_TINDER_LIMIT;
    }
    loadProposalsServiceProxy(true, this.props.challengeId, limit);
  };
  renderFinished() {
    const url = this.getAnswerImgUrl();
    if (url) {
      return (
        <View style={styles.challengeContent}>
          <View style={{ backgroundColor: 'transparent', flex: 1, opacity: 1 }}>
            <Image style={styles.imageStye} resizeMode="cover" source={{ uri: url }} />
          </View>
        </View>
      );
    }
    let answer = this.getAnswer();
    if (isEmpty(answer)) {
      return (
        <View style={styles.challengeContent}>
          <View style={styles.challengeInnerContainer}>
            <Text style={[styles.contentText, styles.contentTextWaiting]}>{I18n.t('waiting_for_answer')}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.challengeContent}>
          <LinearGradient
            colors={gradient0.colors}
            locations={gradient0.stops}
            style={{ flex: 1, opacity: 1 }}
          >
            <View style={styles.challengeInnerContainer}>
              <Text style={styles.contentText}>{answer}</Text>
            </View>
          </LinearGradient>
        </View>
      );
    }
  }
  renderEmptyList() {
    return (
      <View style={styles.challengeContent}>
        {this.props.proposalView === PROPOSAL_VIEWS.TINDER ? (
          <ReloadButton textKey="reload_proposals_tinder" onReload={this.handleReloadPressPress} />
        ) : (
            <ReloadButton textKey="reload_proposals" onReload={this.handleReloadPressPress} />
          )}
      </View>
    );
  }

  renderLoading() {
    return (
      <View style={styles.challengeContent}>
        <ActivityIndicator style={{ flex: 1 }} />
      </View>
    );
  }
  render() {
    I18n.locale = this.props.language;
    if (this.props.isLoading) {
      return this.renderLoading();
    }
    if (this.isFinished()) {
      if (this.props.proposalView === PROPOSAL_VIEWS.TINDER) {
        return this.renderFinished();
      }
      return this.renderList();
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
    let challengeId = null;
    let proposalView = null;
    let proposalListMode = null;
    let proposals = null;
    let isLoading = false;
    let lastLoaded = 1;
    if (selectedChallengeIndex !== -1) {
      const challenge = challenges[selectedChallengeIndex + ownProps.challengeOffset];
      challengeId = challenge._id;
      proposalView = challenge.proposalView;
      proposalListMode = challenge.proposalListMode;
      if (challengeId) {
        // all 4 lists
        const p = state.proposals[challengeId];
        // get the correct list

        const p2 = getProposalList(p, proposalView, proposalListMode);
        if (p2) {
          proposals = p2.proposals;
          isLoading = p2.isLoading;
          lastLoaded = p2.lastLoaded;
        }
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
      challengeId,
      language: state.globals.language,
      voteTutorialStatus: state.user.voteTutorialStatus,
    };
  } catch (e) {
    console.log('ChallengeContent');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(connectAlert(ChallengeContent));
