import React, { PropTypes } from 'react';
import { Text, StatusBar } from 'react-native';

import { Container, Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';
import TABS from '../../consts/tab';
import { Header } from '../../components/general/Header';

const Stream = props =>
  <Screen>
    <Container backgroundColor="#4488ff">
      <StatusBar />
      <Header title={'Live Stream'} navigation={props.navigation} />
      <Text>LIVE STREAM DUMMY</Text>
      <TabBar selectedTab={TABS.STREAM_TAB} navigation={props.navigation} />
    </Container>
  </Screen>;

Stream.propTypes = {
  navigation: PropTypes.object,
};
export default Stream;
