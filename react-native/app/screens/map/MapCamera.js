import React, { PropTypes, Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import globalStyles from '../../config/globalStyles';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';

import ExpoCamera from '../../components/map/Camera/ExpoCamera.js';

class MapCamera extends Component {
  static navigationsOptions = {
    title: 'MapCamera',
  };

  static PropTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <Screen
        navigation={this.props.navigation}
        backgroundColor={globalStyles.$screenLoadingBackgroundColor}
      >
        <StatusBar />
        <ExpoCamera navigation={this.props.navigation} />
      </Screen>
    );
  }
}

export default connect()(MapCamera);
