import React, { Component, PropTypes } from 'react';
import { Animated, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { ChallengeDetail } from './';
import { screenWidth } from '../../../helper/screen';
import { popChallengeSelector } from '../../../helper/navigationProxy';
import { startChallengeTicker } from '../../../helper/ticker';
import { setProposalView, setProposalListMode } from '../../../actions/general';
import { setChallengesId } from '../../../actions/challenges';
import { loadProposalsServiceProxy } from '../../../helper/apiProxy';
import { upDateSelectedChallengeIndex } from '../../../helper/challengesHelper';
import { PROPOSAL_VIEWS, PROPOSAL_LIST_MODES, CHALLENGE_VIEWS } from '../../../consts';
import { LOAD_CONFIG } from '../../../config/config';

class ChallengeContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    challenges: PropTypes.array,
    selectedChallengeIndex: PropTypes.number,
    challengeView: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleHeaderPressed = this.handleHeaderPressed.bind(this);
    this.navigateUp = this.navigateUp.bind(this);
    this.navigateDown = this.navigateDown.bind(this);
    this.navigateUpPress = this.navigateUpPress.bind(this);
    this.navigateDownPress = this.navigateDownPress.bind(this);

    this.handleSharePress = this.handleSharePress.bind(this);
    this.handleTinderPress = this.handleTinderPress.bind(this);
    this.handleListPress = this.handleListPress.bind(this);
    this.handleCommitPress = this.handleCommitPress.bind(this);

    this.onMostPress = this.onMostPress.bind(this);
    this.onNewestPress = this.onNewestPress.bind(this);
    this.onTrendingPress = this.onTrendingPress.bind(this);

    this.setFlatlistRefLeft = this.setFlatlistRefLeft.bind(this);
    this.setFlatlistRefCenter = this.setFlatlistRefCenter.bind(this);
    this.setFlatlistRefRight = this.setFlatlistRefRight.bind(this);

    this.state = {
      challengeContainerOffsetX: new Animated.Value(-screenWidth),
    };

    this.navigationEnabled = true;
    this.panResponderHeader = this.createPanResponderHeader();
  }
  componentDidMount() {
    startChallengeTicker();
  }

  handleSharePress() {
    console.log('handleSharePress');
  }
  handleCommitPress() {
    console.log('handleCommitPress');
  }

  handleHeaderPressed = () => {
    console.log('PRESS');
    popChallengeSelector(this.props);
    popChallengeSelector(this.props);
  };

  loadProposals(index) {
    if (index < 0 || index > this.props.challenges.length - 1) return;
    const id = this.props.challenges[index]._id;
    loadProposalsServiceProxy(
      false,
      id,
      LOAD_CONFIG.DEFAULT_PROPOSAL_LIMIT,
      LOAD_CONFIG.LOAD_QUIET_CHALLENGE_SELECTOR,
    );
  }
  loadAllProposals(myIndex) {
    this.loadProposals(myIndex - 1);
    this.loadProposals(myIndex);
    this.loadProposals(myIndex + 1);
  }
  handleTinderPress() {
    console.log('handleTinderPress');
    this.props.dispatch(setProposalView(PROPOSAL_VIEWS.TINDER));
    this.loadAllProposals(this.props.selectedChallengeIndex);
  }

  handleListPress() {
    console.log('handleListPress');
    this.props.dispatch(setProposalView(PROPOSAL_VIEWS.LIST));
    this.loadAllProposals(this.props.selectedChallengeIndex);
  }
  onMostPress() {
    console.log('onMostPress');
    this.props.dispatch(setProposalListMode(PROPOSAL_LIST_MODES.MOST));
    this.loadAllProposals(this.props.selectedChallengeIndex);
  }
  onNewestPress() {
    console.log('onNewestPress');
    this.props.dispatch(setProposalListMode(PROPOSAL_LIST_MODES.NEWEST));
    this.loadAllProposals(this.props.selectedChallengeIndex);
  }
  onTrendingPress() {
    console.log('onTrendingPress');
    this.props.dispatch(setProposalListMode(PROPOSAL_LIST_MODES.TRENDING));
    this.loadAllProposals(this.props.selectedChallengeIndex);
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
      onMoveShouldSetPanResponder: () => true,
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

  // Navigation logic

  navigateDownPress() {
    if (!this.navigationEnabled) {
      return;
    }
    this.navigationEnabled = false;

    Animated.timing(this.state.challengeContainerOffsetX, {
      toValue: 0,
      duration: 300,
    }).start(this.navigateDown);
  }

  navigateUpPress() {
    if (!this.navigationEnabled) {
      return;
    }
    this.navigationEnabled = false;
    Animated.timing(this.state.challengeContainerOffsetX, {
      toValue: -2 * screenWidth,
      duration: 300,
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

  navigate(offset) {
    if (this.flatlistRefLeft) {
      this.flatlistRefLeft.scrollToOffset({ animated: false, offset: 0 });
    }
    if (this.flatlistRefCenter) {
      this.flatlistRefCenter.scrollToOffset({ animated: false, offset: 0 });
    }
    if (this.flatlistRefRight) {
      this.flatlistRefRight.scrollToOffset({ animated: false, offset: 0 });
    }
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
      let t1 = new Date().getTime();
      this.props.dispatch(setChallengesId(newId));
      let t2 = new Date().getTime();
      console.log(`Time 1: ${t2 - t1}`);
      t1 = new Date().getTime();
      upDateSelectedChallengeIndex();
      t2 = new Date().getTime();
      console.log(`Time 2: ${t2 - t1}`);
      this.navigationEnabled = true;
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

  // Render
  render() {
    if (this.props.selectedChallengeIndex === -1) {
      if (this.props.challengeView === CHALLENGE_VIEWS.DETAIL) {
        popChallengeSelector(this.props);
      }
    }

    const myStyle = [styles.challengeContainer, { left: this.state.challengeContainerOffsetX }];
    return (
      <Animated.View style={myStyle}>
        <ChallengeDetail
          listEnabled={false}
          challengeOffset={-1}
          setFlatlistRef={this.setFlatlistRefLeft}
        />
        <ChallengeDetail
          challengeOffset={0}
          listEnabled
          onHeaderPress={this.handleHeaderPressed}
          onDownPress={this.navigateDownPress}
          onUpPress={this.navigateUpPress}
          handleSharePress={this.handleSharePress}
          handleTinderPress={this.handleTinderPress}
          handleListPress={this.handleListPress}
          handleCommitPress={this.handleCommitPress}
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
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const challenges = state.challenges.challenges;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
    const challengeView = state.globals.challengeView;

    return {
      selectedChallengeIndex,
      challenges,
      challengeView,
    };
  } catch (e) {
    console.log('ChallengeContainer');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeContainer);
