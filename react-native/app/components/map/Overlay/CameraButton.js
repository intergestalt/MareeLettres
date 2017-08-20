import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { navigateToMapCamera } from '../../../helper/navigationProxy';
import styles from './styles';

class CameraButton extends Component {
  static PropTypes = {
    navigation: PropTypes.object,
  };

  handlePress = () => {
    navigateToMapCamera(this.props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.camera__button} onPress={this.handlePress}>
        <Text style={styles.camera__button__text}>
          CAMERA
        </Text>
      </TouchableOpacity>
    );
  }
}

export default CameraButton;
