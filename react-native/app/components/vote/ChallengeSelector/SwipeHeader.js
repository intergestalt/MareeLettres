import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

class SwipeHeader extends Component {
  static propTypes = {
    challenge: PropTypes.object,
  };

  render() {
    return (
      <View style={styles.swipeHeader}>
        <Text style={styles.swipeDummyText}>
          {this.props.challenge.title}
        </Text>
      </View>
    );
  }
}
export default SwipeHeader;
