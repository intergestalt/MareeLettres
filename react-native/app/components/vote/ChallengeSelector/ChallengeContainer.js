import React, { Component, PropTypes } from 'react';
import { Animated, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { ChallengeDetail } from './';
import { screenWidth } from '../../../helper/screen';
import { popChallengeSelector } from '../../../helper/navigationProxy';
import { startChallengeTicker } from '../../../helper/ticker';
import { setTinderMode } from '../../../actions/general';

class ChallengeContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    challenges: PropTypes.array,
    language: PropTypes.string,
    selectedChallengeId: PropTypes.string,
    isTinder: PropTypes.bool,
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

    this.selectedChallengeIndex = -1;
    this.getIndexFromId(this.props.selectedChallengeId);
    this.state = {
      selectedChallengeId: this.props.selectedChallengeId,
      challengeContainerOffsetX: new Animated.Value(-screenWidth),
    };

    this.centralChallengeHeaderValues = null;
    this.listenChallengeHeader = false;
    this.panResponder = this.createPanResponder();
  }
  componentDidMount() {
    startChallengeTicker();
  }

  getChallenge(offset) {
    const i = this.selectedChallengeIndex + offset;
    if (i < 0) return null;
    if (i > this.props.challenges.length - 1) return null;
    const result = this.props.challenges[i];
    return result;
  }

  // Pan Logic
  // ChallengesSwipe

  setCentralChallengeHeaderLayout(event) {
    this.centralChallengeHeaderValues = event.nativeEvent.layout;
  }

  getIndexFromId(id) {
    let index = 0;
    for (let i = 0; i < this.props.challenges.length; i += 1) {
      const challenge = this.props.challenges[i];
      if (challenge._id === id) {
        index = i;
      }
    }
    this.selectedChallengeIndex = index;
  }

  handleSharePress() {
    console.log('handleSharePress');
  }
  handleCommitPress() {
    console.log('handleCommitPress');
  }

  handleTinderPress() {
    console.log('handleTinderPress');
    this.props.dispatch(setTinderMode(true));
  }

  handleListPress() {
    console.log('handleListPress');
    this.props.dispatch(setTinderMode(false));
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
    return this.selectedChallengeIndex === 0;
  }

  isChallengeRight() {
    return this.selectedChallengeIndex === this.props.challenges.length - 1;
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
    if (this.selectedChallengeIndex <= 0) {
      this.state.challengeContainerOffsetX.setValue(-screenWidth);
      return;
    }
    this.selectedChallengeIndex -= 1;
    this.navigate();
  }

  navigateUp() {
    if (this.selectedChallengeIndex >= this.props.challenges.length - 1) {
      this.state.challengeContainerOffsetX.setValue(-screenWidth);
      return;
    }
    this.selectedChallengeIndex += 1;
    this.navigate();
  }
  navigate() {
    const challenge = this.props.challenges[this.selectedChallengeIndex];
    if (challenge == null) return;
    const newId = challenge._id;
    this.state.challengeContainerOffsetX.setValue(-screenWidth);
    this.setState({ selectedChallengeId: newId });
    this.getIndexFromId(this.state.selectedChallengeId);
  }

  // Render
  render() {
    const myStyle = [styles.challengeContainer, { left: this.state.challengeContainerOffsetX }];

    return (
      <Animated.View style={myStyle}>
        <ChallengeDetail
          challenges={this.props.challenges}
          challengeIndex={this.selectedChallengeIndex - 1}
          language={this.props.language}
          isTinder={this.props.isTinder}
        />
        <ChallengeDetail
          challenges={this.props.challenges}
          challengeIndex={this.selectedChallengeIndex}
          language={this.props.language}
          isTinder={this.props.isTinder}
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
        <ChallengeDetail
          challenges={this.props.challenges}
          challengeIndex={this.selectedChallengeIndex + 1}
          language={this.props.language}
          isTinder={this.props.isTinder}
        />
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  const isTinder = state.globals.isTinder;

  return {
    isTinder,
  };
};
export default connect(mapStateToProps)(ChallengeContainer);
