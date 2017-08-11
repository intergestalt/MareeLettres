import React, { Component, PropTypes } from 'react';
import { Animated, PanResponder } from 'react-native';

import styles from './styles';
import { ChallengeDetail } from './';
import { screenWidth } from '../../../helper/screen';
import { popChallengeSelector } from '../../../helper/navigationProxy';
import { getDateData, isFinished } from '../../../helper/dateFunctions';

class ChallengeContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    challenges: PropTypes.array,
    language: PropTypes.string,
    selectedChallengeId: PropTypes.string,
    callBackItemFinished: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.setCentralChallengeHeaderLayout = this.setCentralChallengeHeaderLayout.bind(this);
    this.handleHeaderPressed = this.handleHeaderPressed.bind(this);
    this.navigateUp = this.navigateUp.bind(this);
    this.navigateDown = this.navigateDown.bind(this);
    this.navigateUpPress = this.navigateUpPress.bind(this);
    this.navigateDownPress = this.navigateDownPress.bind(this);

    this.selectedChallengeIndex = -1;
    this.getIndexFromId(this.props.selectedChallengeId);
    const dateStrings = this.calculateDateStrings();
    this.state = {
      selectedChallengeId: this.props.selectedChallengeId,
      challengeContainerOffsetX: new Animated.Value(-screenWidth),
      tickerStringL: dateStrings.left.tickerString,
      tickerString: dateStrings.center.tickerString,
      tickerStringR: dateStrings.right.tickerString,
      endStringL: dateStrings.left.endString,
      endString: dateStrings.center.endString,
      endStringR: dateStrings.right.endString,
    };

    this.centralChallengeHeaderValues = null;
    this.listenChallengeHeader = false;
    this.swipeGesture = false;
    this.panResponder = this.createPanResponder();
  }
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
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
  calculateDateStrings() {
    const result = {};
    let dateData = null;

    if (!this.isChallengeLeft()) {
      const endDateL = new Date(this.getChallenge(-1).end_date);
      dateData = getDateData(endDateL, this.props.language);
      result.left = { tickerString: dateData.tickerString, endString: dateData.endString };
    } else {
      result.left = { tickerString: null, endString: null };
    }

    const endDate = new Date(this.getChallenge(0).end_date);
    dateData = getDateData(endDate, this.props.language);
    result.center = { tickerString: dateData.tickerString, endString: dateData.endString };

    if (!this.isChallengeRight()) {
      const endDateR = new Date(this.getChallenge(1).end_date);
      dateData = getDateData(endDateR, this.props.language);
      result.right = { tickerString: dateData.tickerString, endString: dateData.endString };
    } else {
      result.right = { tickerString: null, endString: null };
    }

    return result;
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
        console.log(`X: ${start.x} Y: ${start.y}`);
        if (this.isChallengeHeader(start)) {
          this.listenChallengeHeader = true;
          // this.swipeGesture = true;
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
          this.swipeGesture = false;
        }
      },
    });
  }
  isChallengeHeader(start) {
    const dz = this.centralChallengeHeaderValues;
    console.log(dz);
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

  calcTimeState() {
    const dateData = this.calculateDateStrings();
    const newTicker = {};
    if (!this.isChallengeLeft()) {
      newTicker.tickerStringL = dateData.left.tickerString;
      newTicker.endStringL = dateData.left.endString;
    }
    newTicker.tickerString = dateData.center.tickerString;
    newTicker.endString = dateData.center.endString;

    if (!this.isChallengeRight()) {
      newTicker.tickerStringR = dateData.right.tickerString;
      newTicker.endStringR = dateData.right.endString;
    }
    this.setState(newTicker);
  }

  isChallengeFinished(offset) {
    const myChallenge = this.getChallenge(offset);
    if (myChallenge) {
      if (!myChallenge.isFinished) {
        const endUTC = new Date(myChallenge.end_date);
        const finish = isFinished(endUTC);
        if (finish) {
          this.props.callBackItemFinished(myChallenge._id);
        }
      }
    }
  }

  tick() {
    if (this.swipeGesture) return;
    this.calcTimeState();
    this.isChallengeFinished(-1);
    this.isChallengeFinished(0);
    this.isChallengeFinished(1);
  }

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
    this.calcTimeState();
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
          tickerString={this.state.tickerStringL}
          endString={this.state.endStringL}
          type={-1}
        />
        <ChallengeDetail
          panResponder={this.panResponder}
          challenges={this.props.challenges}
          challengeIndex={this.selectedChallengeIndex}
          type={0}
          language={this.props.language}
          onHeaderPress={this.handleHeaderPressed}
          onDownPress={this.navigateDownPress}
          onUpPress={this.navigateUpPress}
          tickerString={this.state.tickerString}
          endString={this.state.endString}
          layoutCallback={this.setCentralChallengeHeaderLayout}
        />
        <ChallengeDetail
          challenges={this.props.challenges}
          language={this.props.language}
          challengeIndex={this.selectedChallengeIndex + 1}
          tickerString={this.state.tickerStringR}
          endString={this.state.endStringR}
          type={1}
        />
      </Animated.View>
    );
  }
}
export default ChallengeContainer;
