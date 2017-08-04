import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

class SwipeContent extends Component {
  static propTypes = {
    challenge: PropTypes.object,
    isFinished: PropTypes.bool,
    isTinder: PropTypes.bool,
  };

  renderFinished() {
    return (
      <View style={styles.swipeContent}>
        <Text style={styles.swipeDummyText}>Finished</Text>
      </View>
    );
  }
  renderUnfinished() {
    return (
      <View style={styles.swipeContent}>
        {this.props.isTinder
          ? <Text style={styles.swipeDummyText}>Tinder Mode</Text>
          : <Text style={styles.swipeDummyText}>List Mode</Text>}
      </View>
    );
  }
  render() {
    if (this.props.isFinished) {
      return this.renderFinished();
    }
    return this.renderUnfinished();
  }
}
export default SwipeContent;
