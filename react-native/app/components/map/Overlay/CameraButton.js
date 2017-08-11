import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class CameraButton extends Component {
  render() {
    return (
      <View style={styles.cameraButton}>
        <Text style={styles.cameraButtonText}>Camera</Text>
      </View>
    );
  }
}

export default CameraButton;
