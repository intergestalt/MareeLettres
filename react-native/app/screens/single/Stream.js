import React, { PropTypes } from 'react';
import { Text, StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';

import { VoteMark, VoteMarkPanel } from '../../components/vote/VoteMark';

const Stream = props =>
  <Screen centerContent backgroundColor="#4488ff">
    <StatusBar />
    <Text>LIVE STREAM DUMMY</Text>

    <VoteMark size="s" type="yes" />
    <VoteMark size="m" type="no" />
    <VoteMark size="l" type="yes" active />
    <VoteMark size="l" active value type="yes" />
    <VoteMark size="l" active value type="no" />
    <VoteMark size="l" active value={0.5} type="no" />
    <VoteMarkPanel yes_amount={100} no_amount={50} />

    <TabBar navigation={props.navigation} />
  </Screen>;

Stream.propTypes = {
  navigation: PropTypes.object,
};
export default Stream;
