import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

class Back extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    onPress: PropTypes.func,
  };

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Text style={styles.text}>BACK</Text>
      </TouchableOpacity>
    );
  }
};

export default Back;
