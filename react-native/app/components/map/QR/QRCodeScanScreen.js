import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import { BackSimple } from '../../general/BackButton';
import QRCodeBox from './QRCode';
import styles from './styles';

import { dispatchBackAction } from '../../../helper/navigationProxy';

import { addFriendLetterProxy } from '../../../helper/userHelper';
import { BarCodeScanner, Permissions } from 'expo';


import I18n from '../../../i18n/i18n';

class QRCodeScanScreen extends Component {
  static PropTypes = {
    navigation: PropTypes.object,
    input: PropTypes.string,
  };

  state = {
    hasCameraPermission: null,
    lastScanned: null,
    disabled: true,
  };

  componentDidMount() {
    this.setState({disabled: false});
    this.requestCameraPermission();
  }

  componentWillUnmount() {
    this.setState({disabled: true});
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    })
  }

  handleQRCode = result => {
    let char = result.data.charAt(result.data.length - 1);

    // prevent multiple scans
    if (char !== this.state.lastScanned) {
      //navigateToMapOverview(this.props);
      dispatchBackAction(this.props);
      addFriendLetterProxy(char);
      this.setState({ lastScanned: char });
    }
  };

  handleBackPress() {
    this.setState({disabled: true});
    //navigateToMapOverview(this.props);
    dispatchBackAction(this.props);
  };

  componentWillBlur() {
    console.log('will blur');
  }

  render() {
    return (
      <View style={styles.container}>
        <BackSimple colour='white' onPress={() => this.handleBackPress()} />

        {
          this.state.hasCameraPermission === null || this.state.disabled
            ? <Text>Waiting for permission</Text>
            : this.state.hasCameraPermission === false
              ? <Text></Text>
              : <BarCodeScanner
                  onBarCodeRead={this.handleQRCode}
                  style={styles.QRReader}
                  barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                  />
        }

        <Text style={styles.textWhite}>
          {I18n.t('map_scan_qr_instruction')}
        </Text>

        {/*
          this.state.lastScanned === null
            ? <Text style={styles.devMessage}></Text>
            : <Text style={styles.devMessage}>{this.state.lastScanned}</Text>
        */}
      </View>
    );
  }
}

export default QRCodeScanScreen;
