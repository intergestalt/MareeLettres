import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class DropZone extends Component {
  render() {
    return (
      <View pointerEvents='none' style={styles.dropZoneContainer}>
        <View style={styles.dropZone}>
          <Text style={styles.dropZoneText}>The Drop Zone</Text>
        </View>
      </View>
    );
  }
}

export default DropZone;
