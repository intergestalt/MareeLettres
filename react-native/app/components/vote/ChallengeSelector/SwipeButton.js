import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

class SwipeButton extends Component {
  static propTypes = {
    up: PropTypes.bool,
    selectedChallengeIndex: PropTypes.number,
    challenges: PropTypes.array,
    onPress: PropTypes.func,
    styleAbsolute: PropTypes.bool,
    challengeOffset: PropTypes.number,
    opacity: PropTypes.number,
  };

  getChallengeIndex() {
    return this.props.selectedChallengeIndex;
  }
  render() {
    let renderDown = false;
    let renderUp = false;
    let myOpacityDown = 0;
    let myOpacityUp = 0;

    // ABSOLUTE
    if (this.props.styleAbsolute) {
      if (this.props.challengeOffset === 0) {
        renderDown = true;
        renderUp = true;
        if (this.props.selectedChallengeIndex === 0) {
          renderDown = false;
        }
        if (this.props.selectedChallengeIndex === this.props.challenges.length - 1) {
          renderUp = false;
        }
      } else {
        renderDown = false;
        renderUp = false;
      }
      // RELATIVE
    } else {
      renderDown = true;
      renderUp = true;
      myOpacityUp = 0;
      myOpacityDown = 0;
      if (this.props.challengeOffset === 0) {
        if (this.props.selectedChallengeIndex === 1) {
          myOpacityDown = 1;
        }
        if (this.props.selectedChallengeIndex === this.props.challenges.length - 2) {
          myOpacityUp = 1;
        }
      } else {
        if (this.props.challengeOffset === 1 && this.props.selectedChallengeIndex === 0) {
          myOpacityDown = 1;
        }
        if (
          this.props.challengeOffset === -1 &&
          this.props.selectedChallengeIndex === this.props.challenges.length - 1
        ) {
          myOpacityUp = 1;
        }
      }
    }

    let myStyle = null;

    if (this.props.styleAbsolute) {
      if (this.props.up) {
        myStyle = [
          styles.headerUpContainer,
          styles.headerUpAbsolute,
          { opacity: this.props.opacity },
        ];
      } else {
        myStyle = [
          styles.headerDownContainer,
          styles.headerDownAbsolute,
          { opacity: this.props.opacity },
        ];
      }
    } else if (this.props.up) {
      myStyle = [styles.headerUpContainer, { opacity: myOpacityUp }];
    } else {
      myStyle = [styles.headerDownContainer, { opacity: myOpacityDown }];
    }

    if (this.props.up) {
      if (renderUp) {
        return (
          <Animated.View style={myStyle}>
            <TouchableOpacity onPress={this.props.onPress} style={{ flex: 1 }} activeOpacity={0.5}>
              <View style={styles.headerNavContainer}>
                <Text style={styles.headerNav}>&gt;</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      }
      return null;
    }
    if (renderDown) {
      return (
        <Animated.View style={myStyle}>
          <TouchableOpacity onPress={this.props.onPress} style={{ flex: 1 }} activeOpacity={0.5}>
            <View style={styles.headerNavContainer}>
              <Text style={styles.headerNav}>&lt;</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
    }
    return null;
  }
}
const mapStateToProps = (state) => {
  try {
    const challenges = state.challenges.challenges;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;

    return {
      selectedChallengeIndex,
      challenges,
    };
  } catch (e) {
    console.log('ChallengeFooter');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(SwipeButton);
