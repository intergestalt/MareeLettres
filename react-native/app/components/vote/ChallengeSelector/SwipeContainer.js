import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import styles from './styles';
import SwipeHeader from './SwipeHeader';
import SwipeContent from './SwipeContent';

class SwipeContainer extends Component {
  static propTypes = {
    challenge: PropTypes.object,
    isFinished: PropTypes.bool,
    isTinder: PropTypes.bool,
  };

  render() {
    return (
      <View style={styles.swipeContainer}>
        <SwipeHeader challenge={this.props.challenge} />
        <SwipeContent
          challenge={this.props.challenge}
          isFinished={this.props.isFinished}
          isTinder={this.props.isTinder}
        />
      </View>
    );
  }
}
export default SwipeContainer;
