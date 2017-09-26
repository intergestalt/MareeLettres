import React, { Component, PropTypes } from 'react';
import { Text, View, Animated, PanResponder, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { SwipeButton, styles, ChallengeDetail } from './';
import { screenWidth } from '../../../helper/screen';
import { popChallengeSelector, navigateToSubmit } from '../../../helper/navigationProxy';
import { handleChallengeIsNotExisting } from '../../../helper/challengesHelper';

import { startChallengeTicker } from '../../../helper/ticker';
import { cutProposalListToDefault } from '../../../actions/proposals';
import { setChallengeId, setProposalListMode, setProposalView } from '../../../actions/challenges';
import {
  loadProposalServiceProxy,
  loadProposalsServiceProxy,
  loadChallengesServiceProxy,
} from '../../../helper/apiProxy';
import { PROPOSAL_VIEWS, PROPOSAL_LIST_MODES } from '../../../consts';
import { DYNAMIC_CONFIG } from '../../../config/config';
import { listIsEmpty } from '../../../helper/helper';
import { ReloadButton } from '../../../components/general/ReloadButton';
import { isFinishedSuggest, isFinished } from '../../../helper/dateFunctions';
import I18n from '../../../i18n/i18n';

import { connectAlert } from '../../../components/general/Alert';
import { setUserVoteTutorialStatusProxy } from '../../../helper/userHelper';

class ChallengeContainer extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    dispatch: PropTypes.func,
    challenges: PropTypes.array,
    selectedChallengeIndex: PropTypes.number,
    selectedChallengeId: PropTypes.string,
    language: PropTypes.string,
    userChallenges: PropTypes.object,
    alertWithType: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleHeaderPressed = this.handleHeaderPressed.bind(this);
    this.navigateUp = this.navigateUp.bind(this);
    this.navigateDown = this.navigateDown.bind(this);
    this.navigateUpPress = this.navigateUpPress.bind(this);
    this.navigateDownPress = this.navigateDownPress.bind(this);

    this.handleReloadPressPress = this.handleReloadPressPress.bind(this);
    this.handleSharePress = this.handleSharePress.bind(this);
    this.handleTinderPress = this.handleTinderPress.bind(this);
    this.handleListPress = this.handleListPress.bind(this);
    this.handleCommitPress = this.handleCommitPress.bind(this);
    this.handleStatusPress = this.handleStatusPress.bind(this);

    this.onMostPress = this.onMostPress.bind(this);
    this.onNewestPress = this.onNewestPress.bind(this);
    this.onTrendingPress = this.onTrendingPress.bind(this);

    this.setFlatlistRefLeft = this.setFlatlistRefLeft.bind(this);
    this.setFlatlistRefCenter = this.setFlatlistRefCenter.bind(this);
    this.setFlatlistRefRight = this.setFlatlistRefRight.bind(this);

    this.state = {
      challengeContainerOffsetX: new Animated.Value(-screenWidth),
      opacityLeft: new Animated.Value(1),
      opacityRight: new Animated.Value(1),
    };

    this.navigationEnabled = true;
    this.panResponderHeader = this.createPanResponderHeader();
  }
  componentDidMount() {
    startChallengeTicker(this.props);
    this.checkForTutorial();
  }

  handleSharePress() {
    console.log('handleSharePress');
  }
  handleCommitPress() {
    const challenge = this.props.challenges[this.props.selectedChallengeIndex];
    if (isFinishedSuggest(challenge, false)) {
      this.props.alertWithType(
        'info',
        I18n.t('suggestion_too_late_title'),
        I18n.t('suggestion_too_late_text'),
      );
    } else {
      navigateToSubmit(this.props, challenge);
    }
  }
  handleStatusPress() {
    loadProposalServiceProxy(
      this.props.challenges[this.props.selectedChallengeIndex]._id,
      DYNAMIC_CONFIG.LOAD_QUIET_PROPOSAL.bool,
    );
    navigateToSubmit(this.props, this.props.challenges[this.props.selectedChallengeIndex]);
  }

  handleHeaderPressed() {
    popChallengeSelector(this.props);
  }
  loadProposals(index, view, listmode) {
    if (index < 0 || index > this.props.challenges.length - 1) return;
    const challenge = this.props.challenges[index];
    if (isFinished(challenge)) {
      if (view === PROPOSAL_VIEWS.TINDER) {
        return;
      }
    }
    const challengeId = this.props.challenges[index]._id;
    let limit = -1;
    if (view === PROPOSAL_VIEWS.LIST) {
      limit = DYNAMIC_CONFIG.DEFAULT_PROPOSAL_LIST_LIMIT;
    } else {
      limit = DYNAMIC_CONFIG.DEFAULT_PROPOSAL_TINDER_LIMIT;
    }
    console.log(`LOAD PROPOSALS ${DYNAMIC_CONFIG.LOAD_QUIET_CHALLENGE_SELECTOR.bool}`);
    if (
      !loadProposalsServiceProxy(
        false,
        challengeId,
        limit,
        DYNAMIC_CONFIG.LOAD_QUIET_CHALLENGE_SELECTOR.bool,
      )
    ) {
      this.props.dispatch(cutProposalListToDefault(challengeId, view, listmode));
    }
  }
  getLoadParams(index) {
    if (index < 0 || index > this.props.challenges.length - 1) return null;
    const challenge = this.props.challenges[index];
    let selectedProposalView = null;
    let selectedProposalListMode = null;
    if (challenge) {
      selectedProposalView = challenge.proposalView;
      selectedProposalListMode = challenge.proposalListMode;
    } else {
      return null;
    }
    return { view: selectedProposalView, mode: selectedProposalListMode };
  }
  loadAllProposals(myIndex) {
    let params = null;
    params = this.getLoadParams(myIndex - 1);
    if (params !== null) {
      this.loadProposals(myIndex - 1, params.view, params.mode);
    }
    params = this.getLoadParams(myIndex);
    if (params !== null) {
      this.loadProposals(myIndex, params.view, params.mode);
    }
    params = this.getLoadParams(myIndex + 1);
    if (params !== null) {
      this.loadProposals(myIndex + 1, params.view, params.mode);
    }
  }
  handleTinderPress() {
    this.props.dispatch(setProposalView(this.props.selectedChallengeId, PROPOSAL_VIEWS.TINDER));
    this.loadProposals(this.props.selectedChallengeIndex, PROPOSAL_VIEWS.TINDER);
  }
  getUserChallenge() {
    if (!this.props.userChallenges) {
      return {};
    }
    const userChallenge = this.props.userChallenges[
      this.props.challenges[this.props.selectedChallengeIndex]._id
    ];
    return userChallenge || {};
  }
  handleListPress() {
    console.log('list press');
    this.resetProposalListPos();
    this.props.dispatch(setProposalView(this.props.selectedChallengeId, PROPOSAL_VIEWS.LIST));

    const params = this.getLoadParams(this.props.selectedChallengeIndex);

    this.loadProposals(this.props.selectedChallengeIndex, PROPOSAL_VIEWS.LIST, params.mode);
  }
  onMostPress() {
    this.resetProposalListPos();
    this.props.dispatch(
      setProposalListMode(this.props.selectedChallengeId, PROPOSAL_LIST_MODES.MOST),
    );
    this.loadProposals(
      this.props.selectedChallengeIndex,
      PROPOSAL_VIEWS.LIST,
      PROPOSAL_LIST_MODES.MOST,
    );
  }
  onNewestPress() {
    this.resetProposalListPos();
    this.props.dispatch(
      setProposalListMode(this.props.selectedChallengeId, PROPOSAL_LIST_MODES.NEWEST),
    );
    this.loadProposals(
      this.props.selectedChallengeIndex,
      PROPOSAL_VIEWS.LIST,
      PROPOSAL_LIST_MODES.NEWEST,
    );
  }
  onTrendingPress() {
    this.resetProposalListPos();
    this.props.dispatch(
      setProposalListMode(this.props.selectedChallengeId, PROPOSAL_LIST_MODES.TRENDING),
    );
    this.loadProposals(
      this.props.selectedChallengeIndex,
      PROPOSAL_VIEWS.LIST,
      PROPOSAL_LIST_MODES.TRENDING,
    );
  }
  // Pan Logic
  // Header: Challenge Swipe

  isChallengeLeft() {
    return this.props.selectedChallengeIndex === 0;
  }

  isChallengeRight() {
    return this.props.selectedChallengeIndex === this.props.challenges.length - 1;
  }

  createPanResponderHeader() {
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
        this.startGestureHeader = d.getTime();
      },
      onPanResponderMove: (e, gesture) => {
        let myDx = gesture.dx;
        if (gesture.dx > 0) {
          if (!this.isChallengeLeft()) {
            myDx = gesture.dx;
          } else {
            myDx = gesture.dx / 3;
          }
        } else if (gesture.dx < 0) {
          if (!this.isChallengeRight()) {
            myDx = gesture.dx;
          } else {
            myDx = gesture.dx / 3;
          }
        }
        if (this.props.selectedChallengeIndex === 1) {
          if (myDx > 0) {
            this.state.opacityLeft.setValue(0);
          } else {
            this.state.opacityLeft.setValue(1);
          }
        }
        if (this.props.selectedChallengeIndex === this.props.challenges.length - 2) {
          if (myDx < 0) {
            this.state.opacityRight.setValue(0);
          } else {
            this.state.opacityRight.setValue(1);
          }
        }
        this.state.challengeContainerOffsetX.setValue(myDx - screenWidth);
      },

      onPanResponderRelease: (e, gesture) => {
        const date = new Date();
        const stopGesture = date.getTime();
        const d = stopGesture - this.startGestureHeader;

        let duration = 500 * ((screenWidth - Math.abs(gesture.dx)) / screenWidth);

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

        this.startGestureHeader = -1;
      },
    });
  }

  // Tutorial

  checkForTutorial() {
    // TODO - display the right toturial message here
    // if(this.props.voteTutorialStatus == "step2") {
    /* this.props.alertWithType(
        'info',
        I18n.t('vote_tutorial_7_title'),
        I18n.t('vote_tutorial_7_text')
      ); */
    // setUserVoteTutorialStatusProxy('step3');
    // }
  }

  // Navigation logic

  navigateDownPress() {
    if (!this.navigationEnabled) {
      return;
    }
    if (this.props.selectedChallengeIndex === 1) {
      this.state.opacityLeft.setValue(0);
    }

    this.navigationEnabled = false;
    Animated.timing(this.state.challengeContainerOffsetX, {
      toValue: 0,
      duration: 200,
    }).start(this.navigateDown);
  }

  navigateUpPress() {
    if (!this.navigationEnabled) {
      return;
    }
    if (this.props.selectedChallengeIndex === this.props.challenges.length - 2) {
      this.state.opacityRight.setValue(0);
    }
    this.navigationEnabled = false;
    Animated.timing(this.state.challengeContainerOffsetX, {
      toValue: -2 * screenWidth,
      duration: 200,
    }).start(this.navigateUp);
  }

  navigateDown() {
    if (this.props.selectedChallengeIndex <= 0) {
      this.state.challengeContainerOffsetX.setValue(-screenWidth);
      return;
    }
    this.navigate(-1);
  }

  navigateUp() {
    if (this.props.selectedChallengeIndex >= this.props.challenges.length - 1) {
      this.state.challengeContainerOffsetX.setValue(-screenWidth);
      return;
    }
    this.navigate(1);
  }

  resetProposalListPos() {
    if (this.flatlistRefLeft) {
      this.flatlistRefLeft.scrollToOffset({ animated: false, offset: 0 });
    }
    if (this.flatlistRefCenter) {
      this.flatlistRefCenter.scrollToOffset({ animated: false, offset: 0 });
    }
    if (this.flatlistRefRight) {
      this.flatlistRefRight.scrollToOffset({ animated: false, offset: 0 });
    }
  }
  navigate(offset) {
    this.resetProposalListPos();
    setTimeout(() => {
      const index = this.props.selectedChallengeIndex + offset;
      let challenge = this.props.challenges[index];
      if (challenge == null) {
        if (this.props.challenges.length > 0) {
          challenge = this.props.challenges[0];
        }
      }
      this.state.challengeContainerOffsetX.setValue(-screenWidth);
      const newId = challenge._id;
      this.loadAllProposals(index);

      const t1 = new Date().getTime();
      handleChallengeIsNotExisting(this.props, newId);
      this.props.dispatch(setChallengeId(newId, this.props));
      const t2 = new Date().getTime();
      console.log(`Time For Update List: ${t2 - t1}`);
      this.navigationEnabled = true;

      this.checkForTutorial();
      this.state.opacityRight.setValue(1);
      this.state.opacityLeft.setValue(1);
    }, 1);
  }

  setFlatlistRefLeft(ref) {
    this.flatlistRefLeft = ref;
  }
  setFlatlistRefCenter(ref) {
    this.flatlistRefCenter = ref;
  }
  setFlatlistRefRight(ref) {
    this.flatlistRefRight = ref;
  }
  renderIsLoading() {
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <ActivityIndicator style={{ flex: 1 }} />
      </View>
    );
  }
  handleReloadPressPress = () => {
    loadChallengesServiceProxy(true, false);
  };

  renderIsEmpty() {
    // Should not Happen, but safety first
    return (
      <View style={styles.container}>
        <ReloadButton textKey="reload_challenges" onReload={this.handleReloadPressPress} />
      </View>
    );
  }
  // Render
  render() {
    I18n.locale = this.props.language;
    if (this.props.isLoading) {
      return this.renderIsLoading();
    }
    if (listIsEmpty(this.props.challenges)) {
      // SHOULD NOT HAPPEN
      return this.renderIsEmpty();
    }
    let listEnabled = true;
    const challenge = this.props.challenges[this.props.selectedChallengeIndex];
    if (isFinished(challenge)) {
      listEnabled = false;
    }

    const myStyle = [
      styles.challengeContainer,
      {
        transform: [
          {
            translateX: this.state.challengeContainerOffsetX,
          },
        ],
      },
    ];
    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={myStyle}>
          <ChallengeDetail
            listEnabled={false}
            challengeOffset={-1}
            setFlatlistRef={this.setFlatlistRefLeft}
          />
          <ChallengeDetail
            challengeOffset={0}
            listEnabled={listEnabled}
            onHeaderPress={this.handleHeaderPressed}
            handleSharePress={this.handleSharePress}
            handleTinderPress={this.handleTinderPress}
            handleListPress={this.handleListPress}
            handleCommitPress={this.handleCommitPress}
            handleStatusPress={this.handleStatusPress}
            onMostPress={this.onMostPress}
            onTrendingPress={this.onTrendingPress}
            onNewestPress={this.onNewestPress}
            panResponderHeader={this.panResponderHeader}
            setFlatlistRef={this.setFlatlistRefCenter}
          />
          <ChallengeDetail
            listEnabled={false}
            challengeOffset={1}
            setFlatlistRef={this.setFlatlistRefRight}
          />
        </Animated.View>
        <SwipeButton
          styleAbsolute
          up
          onPress={this.navigateUpPress}
          challengeOffset={0}
          opacity={this.state.opacityRight.Value}
        />
        <SwipeButton
          styleAbsolute
          up={false}
          onPress={this.navigateDownPress}
          challengeOffset={0}
          opacity={this.state.opacityLeft.Value}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const challenges = state.challenges.challenges;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
    const selectedChallengeId = state.challenges.selectedChallengeId;

    const isLoading = state.challenges.isLoading;

    return {
      selectedChallengeIndex,
      selectedChallengeId,
      challenges,
      isLoading,
      language: state.globals.language,
      userChallenges: state.user.challenges,
      voteTutorialStatus: state.user.voteTutorialStatus,
    };
  } catch (e) {
    console.log('ChallengeContainer');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(connectAlert(ChallengeContainer));
