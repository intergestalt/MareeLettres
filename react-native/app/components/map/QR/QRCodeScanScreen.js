import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import { BackSimple } from '../../general/BackButton';
import QRCodeBox from './QRCode';
import styles from './styles';

import { navigateToMapOverview } from '../../../helper/navigationProxy';
import { BarCodeScanner, Permissions } from 'expo';

class QRCodeScanScreen extends Component {
  static PropTypes = {
    navigation: PropTypes.object,
    input: PropTypes.string,
  };

  state = {
    hasCameraPermission: null,
    lastScanned: null,
  };

  componentDidMount() {
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    })
  }

  handleQRCode = result => {
    console.log(result.data);
    if (result.data !== this.state.lastScanned) {
      this.setState({ lastScanned: result.data })
    }
  };

  handleBackPress() {
    navigateToMapOverview(this.props);
  };

  render() {
    return (
      <View style={styles.container}>
        <BackSimple colour='white' onPress={() => this.handleBackPress()} />

        {
          this.state.hasCameraPermission === null
          ? <Text>Waiting for permission</Text>
          : this.state.hasCameraPermission === false
            ? <Text>Permission not granted</Text>
            : <BarCodeScanner
                onBarCodeRead={this.handleQRCode}
                style={styles.QRReader} />
        }

        <Text style={styles.textWhite}>
          Scan your friends’ QR
          code to receive their
          letter!
        </Text>

        {
          this.state.lastScanned === null
          ? <Text style={styles.devMessage}>Hello devs, scan something!</Text>
          : <Text style={styles.devMessage}>{this.state.lastScanned}</Text>
        }
      </View>
    );
  }
}

export default QRCodeScanScreen;
