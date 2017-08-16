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
      <Screen backgroundColor={'#00aaaa'}>
        <StatusBar />
        <QRCodeScanScreen
          navigation={this.props.navigation}
          input={this.props.uniqueId}
          />
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

export default connect(mapStateToProps)(QRCodeGet);
