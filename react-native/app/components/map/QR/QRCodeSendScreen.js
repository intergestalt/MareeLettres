import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import QRCodeBox from './QRCode';
import styles from './styles';

class QRCodeSendScreen extends Component {
  static PropTypes = {
    text: PropTypes.string,
    input: PropTypes.string,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.text}
        </Text>
        <QRCodeBox
          input = {this.props.input}
          ></QRCodeBox>
      </View>
    );
  }
}

/*
<View style={styles.container}>
  <Text>{this.props.text}</Text>
  <Text>{this.props.input}</Text>
  <QRCodeBox
    input = {this.props.input}
    ></QRCodeBox>
</View>
*/

export default QRCodeSendScreen;
