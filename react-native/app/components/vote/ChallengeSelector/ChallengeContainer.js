import React, { Component, PropTypes } from 'react';
import { Animated, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { ChallengeDetail } from './';
import { screenWidth } from '../../../helper/screen';
import { popChallengeSelector } from '../../../helper/navigationProxy';
import { startChallengeTicker } from '../../../helper/ticker';
import { setTinderMode } from '../../../actions/general';
import { setChallengesId } from '../../../actions/challenges';
import { loadProposalsServiceProxy } from '../../../helper/apiProxy';
import { upDateSelectedChallengeIndex } from '../../../helper/challengesHelper';

class ChallengeContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    challenges: PropTypes.array,
    selectedChallengeIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.setCentralChallengeHeaderLayout = this.setCentralChallengeHeaderLayout.bind(this);
    this.handleHeaderPressed = this.handleHeaderPressed.bind(this);
    this.navigateUp = this.navigateUp.bind(this);
    this.navigateDown = this.navigateDown.bind(this);
    this.navigateUpPress = this.navigateUpPress.bind(this);
    this.navigateDownPress = this.navigateDownPress.bind(this);

    this.handleSharePress = this.handleSharePress.bind(this);
    this.handleTinderPress = this.handleTinderPress.bind(this);
    this.handleListPress = this.handleListPress.bind(this);
    this.handleCommitPress = this.handleCommitPress.bind(this);

    this.state = {
      challengeContainerOffsetX: new Animated.Value(-screenWidth),
    };

    this.centralChallengeHeaderValues = null;
    this.listenChallengeHeader = false;
    this.panResponder = this.createPanResponder();
  }
  componentDidMount() {
    startChallengeTicker();
  }

  // Pan Logic
  // ChallengesSwipe

  setCentralChallengeHeaderLayout(event) {
    this.centralChallengeHeaderValues = event.nativeEvent.layout;
  }

  handleSharePress() {
    console.log('handleSharePress');
  }
  handleCommitPress() {
    console.log('handleCommitPress');
  }

  loadProposals(index) {
    if (index < 0 || index > this.props.challenges.length - 1) return;
    const id = this.props.challenges[index]._id;
    loadProposalsServiceProxy(id);
  }

  handleTinderPress() {
    console.log('handleTinderPress');
    this.props.dispatch(setTinderMode(true));
    this.loadProposals(this.props.selectedChallengeIndex - 1);
    this.loadProposals(this.props.selectedChallengeIndex);
    this.loadProposals(this.props.selectedChallengeIndex + 1);
  }

  handleListPress() {
    console.log('handleListPress');
    this.props.dispatch(setTinderMode(false));
    this.loadProposals(this.props.selectedChallengeIndex - 1);
    this.loadProposals(this.props.selectedChallengeIndex);
    this.loadProposals(this.props.selectedChallengeIndex + 1);
  }

  createPanResponder() {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const d = new Date();
        this.startGesture = d.getTime();
        const start = {
          x: e.nativeEvent.locationX,
          y: e.nativeEvent.locationY,
        };
        if (this.isChallengeHeader(start)) {
          this.listenChallengeHeader = true;
        } else {
          this.listenChallengeHeader = false;
        }
      },
      onPanResponderMove: (e, gesture) => {
        if (this.listenChallengeHeader) {
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
        }
      },

      onPanResponderRelease: (e, gesture) => {
        if (this.listenChallengeHeader) {
          const date = new Date();
          const stopGesture = date.getTime();
          const d = stopGesture - this.startGesture;

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

          this.startGesture = -1;
        }
      },
    });
  }

  isChallengeHeader(start) {
    const dz = this.centralChallengeHeaderValues;
    return (
      start.x > dz.x && start.x < dz.x + dz.width && start.y > dz.y && start.y < dz.y + dz.height
    );
  }

  isChallengeLeft() {
    return this.props.selectedChallengeIndex === 0;
  }

  isChallengeRight() {
    return this.props.selectedChallengeIndex === this.props.challenges.length - 1;
  }

  navigateDownPress() {
    Animated.timing(this.state.challengeContainerOffsetX, {
      toValue: 0,
      duration: 300,
    }).start(this.navigateDown);
  }

  navigateUpPress() {
    Animated.timing(this.state.challengeContainerOffsetX, {
      toValue: -2 * screenWidth,
      duration: 300,
    }).start(this.navigateUp);
  }
  handleHeaderPressed = () => {
    console.log('PRESS');
    popChallengeSelector(this.props);
  };

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
    const index = this.props.selectedChallengeIndex + offset;
    let challenge = this.props.challenges[index];
    if (challenge == null) {
      if (this.props.challenges.length > 0) {
        challenge = this.props.challenges[0];
      } else {
        return;
      }
    }
    this.state.challengeContainerOffsetX.setValue(-screenWidth);
    const newId = challenge._id;
    this.loadProposals(index - 1);
    this.loadProposals(index);
    this.loadProposals(index + 1);
    this.props.dispatch(setChallengesId(newId));
    upDateSelectedChallengeIndex();
  }

  // Render
  render() {
    const myStyle = [styles.challengeContainer, { left: this.state.challengeContainerOffsetX }];
    return (
      <Animated.View style={myStyle}>
        <ChallengeDetail challengeOffset={-1} />
        <ChallengeDetail
          challengeOffset={0}
          onHeaderPress={this.handleHeaderPressed}
          onDownPress={this.navigateDownPress}
          onUpPress={this.navigateUpPress}
          handleSharePress={this.handleSharePress}
          handleTinderPress={this.handleTinderPress}
          handleListPress={this.handleListPress}
          handleCommitPress={this.handleCommitPress}
          panResponder={this.panResponder}
          layoutCallback={this.setCentralChallengeHeaderLayout}
        />
        <ChallengeDetail challengeOffset={1} />
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  const challenges = state.challenges.challenges;
  const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
  return {
    selectedChallengeIndex,
    challenges,
  };
};
export default connect(mapStateToProps)(ChallengeContainer);