import React, { PropTypes, Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

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
      <Screen backgroundColor={'#00aaaa'}>
        <StatusBar />
        <ExpoCamera navigation={this.props.navigation} />
      </Screen>
    );
  }
}

export default connect()(MapCamera);
