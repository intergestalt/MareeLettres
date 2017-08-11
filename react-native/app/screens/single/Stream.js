import React, { PropTypes } from 'react';
import { Text, StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';
import TABS from '../../consts/tab';

const Stream = props =>
  <Screen centerContent backgroundColor="#4488ff">
    <StatusBar />
    <Text>LIVE STREAM DUMMY</Text>
    <TabBar selectedTab={TABS.STREAM_TAB} navigation={props.navigation} />
  </Screen>;

Stream.propTypes = {
  navigation: PropTypes.object,
};
export default Stream;
