import React, { Component, PropTypes } from 'react';
import { Animated, Text } from 'react-native';

import styles from './styles';

class SwipeHeader extends Component {
  static propTypes = {
    challenge: PropTypes.object,
    layoutCallback: PropTypes.func,
    offsetX: PropTypes.object,
    customStyle: PropTypes.number,
  };

  render() {
    if (this.props.challenge) {
      return (
        <Animated.View
          onLayout={this.props.layoutCallback}
          style={[{ left: this.props.offsetX }, this.props.customStyle]}
        >
          <Text style={styles.swipeDummyText}>
            {this.props.challenge.title}
          </Text>
        </Animated.View>
      );
    }
    return (
      <Animated.View
        onLayout={this.props.layoutCallback}
        style={[{ left: this.props.offsetX, backgroundColor: '#000000' }, this.props.customStyle]}
      />
    );
  }
}
export default SwipeHeader;
