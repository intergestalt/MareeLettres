import React, { PropTypes, Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';

import { NativeCamera } from '../../components/map/Camera';

class MapCamera extends Component {
  static navigationsOptions = {
    title: 'MapCamera',
  };

  static PropTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <Screen navigation={this.props.navigation} backgroundColor={'#00aaaa'}>
        <StatusBar />
        <NativeCamera navigation={this.props.navigation} />
      </Screen>
    );
  }
}

export default connect()(MapCamera);
