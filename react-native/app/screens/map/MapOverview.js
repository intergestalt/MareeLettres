import React, { PropTypes, Component } from 'react';
import { StatusBar } from 'react-native';

import { Container, Screen } from '../../components/general/Container';
import { NativeMap } from '../../components/map/Map';
import { Header } from '../../components/general/Header';
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
      <Screen>
        <Container backgroundColor={'#00aaaa'}>
          <StatusBar />
          <Header title={'Map the Map'} navigation={this.props.navigation} />
          <Header />
          <NativeMap />
          <TabBar selectedTab={TABS.BECOME_TAB} navigation={this.props.navigation} />
        </Container>
      </Screen>
    );
  }
}

export default MapOverview;
