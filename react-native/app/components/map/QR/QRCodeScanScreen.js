import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import { BackSimple } from '../../general/BackButton';
import QRCodeBox from './QRCode';
import styles from './styles';

import { navigateToMapOverview } from '../../../helper/navigationProxy';
import { addFriendLetterProxy } from '../../../helper/userHelper';
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
    let char = result.data.charAt(0);

    // prevent multiple scans
    if (char !== this.state.lastScanned) {
      navigateToMapOverview(this.props);
      addFriendLetterProxy(char);
      this.setState({ lastScanned: char });
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
                style={styles.QRReader}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                />
        }

        <Text style={styles.textWhite}>
          Scan your friends’ QR
          code to receive their
          letter!
        </Text>

        {
          this.state.lastScanned === null
          ? <Text style={styles.devMessage}></Text>
          : <Text style={styles.devMessage}>{this.state.lastScanned}</Text>
        }
      </View>
    );
  }
}

export default QRCodeScanScreen;
