import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import QRCodeBox from './QRCode';
import { BackSimple } from '../../general/BackButton';

import styles from './styles';

import { navigateToMapOverview } from '../../../helper/navigationProxy';

class QRCodeSendScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    input: PropTypes.string,
  };

  handleBackPress() {
    navigateToMapOverview(this.props);
  };

  render() {
    return (
      <View style={styles.container}>
        <BackSimple onPress={() => this.handleBackPress()} />
        <Text style={styles.text}>
          Let your friends scan your QR Code
        </Text>
        <QRCodeBox input = {this.props.input} />
      </View>
    );
  }
}


export default connect()(QRCodeSendScreen);
