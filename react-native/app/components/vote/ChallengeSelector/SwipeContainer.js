import React, { Component, PropTypes } from 'react';
import { View, Animated, PanResponder } from 'react-native';

import styles from './styles';
import SwipeHeader from './SwipeHeader';
import SwipeContent from './SwipeContent';

class SwipeContainer extends Component {
  static propTypes = {
    language: PropTypes.string,
    challenge: PropTypes.object,
    challengeRight: PropTypes.object,
    challengeLeft: PropTypes.object,
    isFinished: PropTypes.bool,
    isTinder: PropTypes.bool,
    headerSwipeOffsetX: PropTypes.object,
    navigateUp: PropTypes.func,
    navigateDown: PropTypes.func,
  };
  constructor(props) {
    super(props);

    this.setChallengeHeaderLayout = this.setChallengeHeaderLayout.bind(this);
    this.setPanOffset = this.setPanOffset.bind(this);

    this.state = {
      chalengeHeaderValues: null,
      panOffset: null,
    };
    this.startGesture = -1;
    this.listenChallengeHeader = true;
    this.panResponder = this.createPanResponder();
  }

  // Pan Logic
  // ChallengesSwipe

  setChallengeHeaderLayout(event) {
    this.setState({
      chalengeHeaderValues: event.nativeEvent.layout,
    });
  }

  setPanOffset(event) {
    this.setState({
      panOffset: { x: event.nativeEvent.layout.x, y: event.nativeEvent.layout.y },
    });
  }

  isChallengeHeader(start) {
    const dz = this.state.chalengeHeaderValues;
    return (
      start.x > dz.x && start.x < dz.x + dz.width && start.y > dz.y && start.y < dz.y + dz.height
    );
  }
  createPanResponder() {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        console.log('PAN START');
        const d = new Date();
        this.startGesture = d.getTime();
        const start = {
          x: gesture.x0 - this.state.panOffset.x,
          y: gesture.y0 - this.state.panOffset.y,
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
            if (this.props.challengeLeft) {
              myDx = gesture.dx;
            } else {
              myDx = gesture.dx / 3;
            }
          } else if (gesture.dx < 0) {
            if (this.props.challengeRight) {
              myDx = gesture.dx;
            } else {
              myDx = gesture.dx / 3;
            }
          }
          this.props.headerSwipeOffsetX.setValue(myDx);
        }
      },

      onPanResponderRelease: (e, gesture) => {
        if (this.listenChallengeHeader) {
          console.log('PAN RELEASE');

          const date = new Date();
          const stopGesture = date.getTime();
          const d = stopGesture - this.startGesture;

          const w = this.state.chalengeHeaderValues.width;
          let duration = 500 * ((w - Math.abs(gesture.dx)) / w);

          let dir = 0;
          if (d < 300) {
            if (gesture.vx > 0) {
              dir = 1;
              duration = 200;
            } else if (gesture.vx < 0) {
              dir = -1;
              duration = 200;
            }
          } else if (gesture.dx > w / 2) {
            dir = 1;
          } else if (gesture.dx < -(w / 2)) {
            dir = -1;
          }
          if (dir === 1 && !this.props.challengeLeft) {
            dir = 0;
          }
          if (dir === -1 && !this.props.challengeRight) {
            dir = 0;
          }
          console.log(`DURATION: ${duration}`);

          if (dir === 1) {
            Animated.timing(this.props.headerSwipeOffsetX, {
              toValue: w * dir,
              duration,
            }).start(this.props.navigateDown);
          } else if (dir === -1) {
            Animated.timing(this.props.headerSwipeOffsetX, {
              toValue: -w,
              duration,
            }).start(this.props.navigateUp);
          } else {
            Animated.spring(this.props.headerSwipeOffsetX, {
              toValue: 0,
            }).start();
          }

          this.startGesture = -1;
        }
      }, // Step 4
    });
  }

  // Render
  render() {
    return (
      <View
        {...this.panResponder.panHandlers}
        onLayout={this.setPanOffset}
        style={styles.swipeContainer}
      >
        <View style={styles.swipeHeaderContainer}>
          <View style={styles.headerContainerLeft}>
            <SwipeHeader
              language={this.props.language}
              customStyle={styles.headerLeft}
              offsetX={this.props.headerSwipeOffsetX}
              challenge={this.props.challengeLeft}
            />
          </View>
          <View style={styles.headerContainerCenter}>
            <SwipeHeader
              language={this.props.language}
              customStyle={styles.headerCenter}
              layoutCallback={this.setChallengeHeaderLayout}
              offsetX={this.props.headerSwipeOffsetX}
              challenge={this.props.challenge}
            />
          </View>
          <View style={styles.headerContainerRight}>
            <SwipeHeader
              language={this.props.language}
              customStyle={styles.headerRight}
              offsetX={this.props.headerSwipeOffsetX}
              challenge={this.props.challengeRight}
            />
          </View>
        </View>
        <View style={styles.swipeContentContainer}>
          <SwipeContent
            challenge={this.props.challenge}
            isFinished={this.props.isFinished}
            isTinder={this.props.isTinder}
          />
        </View>
      </View>
    );
  }
}
export default SwipeContainer;
