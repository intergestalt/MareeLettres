import React, { PropTypes } from 'react';
import { StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { HowTo } from '../../components/text/HowTo';

const How = props =>
  <Screen backgroundColor="#aaaa00">
    <StatusBar />
    <HowTo />
  </Screen>;

How.propTypes = {
  navigation: PropTypes.object,
};

export default How;
