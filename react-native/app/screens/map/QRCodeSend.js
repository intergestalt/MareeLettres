import React, { PropTypes, Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';

import TABS from '../../consts/tab';

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
        <QRCodeSendScreen
          navigation={this.props.navigation}
          input={this.props.uniqueId}
          />
        <TabBar selectedTab={TABS.BECOME_TAB} navigation={this.props.navigation} />
      </Screen>
    )
  }
};

const mapStateToProps = (state) => {
  const uniqueId = state.user.id;
  return {
    uniqueId
  };
};

export default connect(mapStateToProps)(QRCodeSend);
