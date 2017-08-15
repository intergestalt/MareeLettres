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
      <Screen backgroundColor={'#00aaaa'}>
        <StatusBar />
<<<<<<< HEAD
        <NativeCamera
          navigation = {this.props.navigation}
          />
        <TabBar selectedTab={TABS.BECOME_TAB} navigation={this.props.navigation} />
=======
        <Text>Camera !</Text>
        <NativeCamera />
        <TabBar navigation={this.props.navigation} />
>>>>>>> master
      </Screen>
    );
  }
}

export default connect()(MapCamera);
