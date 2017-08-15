import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

class CameraButton extends Component {
  static PropTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
  };

  render() {
    return (
      <View style={styles.cameraButton}>
        <TouchableOpacity
          onPress={this.props.onPress}
          >
          <Text style={styles.cameraButtonText}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CameraButton;
