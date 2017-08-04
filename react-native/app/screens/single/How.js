import React, { PropTypes } from 'react';
import { StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { Header } from '../../components/general/Header';
import { HowTo } from '../../components/text/HowTo';

const How = props =>
  <Screen backgroundColor="#aaaa00">
    <StatusBar />
    <Header title={'How to Play'} navigation={props.navigation} />
    <HowTo />
  </Screen>;

How.propTypes = {
  navigation: PropTypes.object,
};

export default How;
