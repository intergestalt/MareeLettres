import React, { PropTypes, Component } from 'react';
import { StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { NativeMap } from '../../components/map/Map';
import { TabBar } from '../../components/general/TabBar';
import TABS from '../../consts/tab';

class MapOverview extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <Screen backgroundColor={'#00aaaa'}>
        <StatusBar />
        <NativeMap />
        <TabBar selectedTab={TABS.BECOME_TAB} navigation={this.props.navigation} />
      </Screen>
    );
  }
}

export default MapOverview;
