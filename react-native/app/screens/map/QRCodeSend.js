import React, { PropTypes, Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';

import { QRCodeSendScreen } from '../../components/map/QR';

class QRCodeSend extends Component {
  static PropTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <Screen backgroundColor={'#ffffff'}>
        <StatusBar />
        <QRCodeSendScreen
          navigation={this.props.navigation}
          />
        <TabBar navigation={this.props.navigation} />
      </Screen>
    );
  }
}

export default QRCodeSend;
