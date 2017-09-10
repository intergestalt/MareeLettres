import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { BackSimple } from '../../general/BackButton';
import QRCodeBox from './QRCode';
import styles from './styles';

import { dispatchBackActionToMapOverview } from '../../../helper/navigationProxy';
import { MAP_VIEWS } from '../../../consts';

import { addFriendLetterProxy } from '../../../helper/userHelper';
import { BarCodeScanner, Permissions } from 'expo';

import I18n from '../../../i18n/i18n';

class QRCodeScanScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    input: PropTypes.string,
    language: PropTypes.string,
  };
  state = {
    hasCameraPermission: null,
    lastScanned: null,
    disabled: true,
  };

  componentDidMount() {
    this.setState({ disabled: false });
    this.requestCameraPermission();
  }

  componentWillUnmount() {
    this.setState({ disabled: true });
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  handleQRCode = (result) => {
    const char = result.data.charAt(result.data.length - 1);

    // prevent multiple scans
    if (char !== this.state.lastScanned) {
      // navigateToMapOverview(this.props);
      dispatchBackActionToMapOverview(this.props, MAP_VIEWS.OVERVIEW);
      addFriendLetterProxy(char);
      this.setState({ lastScanned: char });
    }
  };

  handleBackPress() {
    this.setState({ disabled: true });
    // navigateToMapOverview(this.props);
    dispatchBackActionToMapOverview(this.props, MAP_VIEWS.OVERVIEW);
  }

  componentWillBlur() {
    console.log('will blur');
  }

  render() {
    I18n.locale = this.props.language;
    return (
      <View style={styles.container}>
        <BackSimple colour="white" onPress={() => this.handleBackPress()} />

        {this.state.hasCameraPermission === null || this.state.disabled
          ? <Text>Waiting for permission</Text>
          : this.state.hasCameraPermission === false
            ? <Text />
            : <BarCodeScanner
              onBarCodeRead={this.handleQRCode}
              style={styles.QRReader}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />}

        <Text style={styles.textWhite}>
          {I18n.t('map_scan_qr_instruction')}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    return {
      language: state.globals.language,
    };
  } catch (e) {
    console.log('QRCodeScanScreen');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(QRCodeScanScreen);
