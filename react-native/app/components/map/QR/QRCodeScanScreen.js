import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import QRCodeBox from './QRCode';
import styles from './styles';

class QRCodeScanScreen extends Component {
  static PropTypes = {
    text: PropTypes.string,
    input: PropTypes.string,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.text}</Text>
        <QRCodeBox
          input = {this.props.input}
          ></QRCodeBox>
      </View>
    );
  }
}

export default QRCodeScanScreen;
