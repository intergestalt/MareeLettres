import React, { PropTypes, Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';

import { QRCodeScanScreen } from '../../components/map/QR';

class QRCodeGet extends Component {
  static PropTypes = {
    navigation: PropTypes.object,
    uniqueId: PropTypes.string,
  };

  render() {
    return (
      <Screen navigation={this.props.navigation} backgroundColor={'#00aaaa'}>
        <StatusBar />
        <QRCodeScanScreen navigation={this.props.navigation} input={this.props.uniqueId} />
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const uniqueId = state.user.id;
    return {
      uniqueId,
    };
  } catch (e) {
    console.log('QRCodeGet');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(QRCodeGet);
