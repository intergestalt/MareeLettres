import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import { BackSimple } from '../../general/BackButton';
import QRCodeBox from './QRCode';
import styles from './styles';

import { navigateToMapOverview } from '../../../helper/navigationProxy';

class QRCodeScanScreen extends Component {
  static PropTypes = {
    navigation: PropTypes.object,
    input: PropTypes.string,
  };

  handleBackPress() {
    navigateToMapOverview(this.props);
  };

  render() {
    return (
      <View style={styles.container}>
        <BackSimple colour='white' onPress={() => this.handleBackPress()} />
        <Text style={styles.textWhite}>
          Scan your friends’ QR
          code to receive their
          letter!
        </Text>
        <View style={styles.target}>
          <View style={styles.rowTop} />
          <View style={styles.rowBottom} />
        </View>
      </View>
    );
  }
}

export default QRCodeScanScreen;
