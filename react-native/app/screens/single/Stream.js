import React, { Component, PropTypes } from 'react';
import { Text, StatusBar } from 'react-native';

import { Container } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';
import { TABS } from '../../consts/tab';

class Stream extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  render() {
    return (
      <Container backgroundColor="#4488ff">
        <StatusBar />
        <Text>LIVE STREAM DUMMY</Text>
        <TabBar selectedTab={TABS.STREAM_TAB} navigation={this.props.navigation} />
      </Container>
    );
  }
}

export default Stream;
