import React, { PropTypes, Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';

import { QRCodeSendScreen } from '../../components/map/QR';

class QRCodeSend extends Component {
  static PropTypes = {
    navigation: PropTypes.object,
    uniqueId: PropTypes.string,
  };

  render() {
    return (
      <Screen backgroundColor={'#ffffff'}>
        <StatusBar />
        <QRCodeSendScreen text="Let your friends scan your QR Code" input={this.props.uniqueId} />
        <TabBar navigation={this.props.navigation} />
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const uniqueId = state.user.id;
  return {
    uniqueId,
  };
};

export default connect(mapStateToProps)(QRCodeSend);
