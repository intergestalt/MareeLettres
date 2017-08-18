import React, { PropTypes } from 'react';
import { StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { InfoBox } from '../../components/info/InfoBox';

const Info = () =>
  <Screen backgroundColor="#aaaa00">
    <StatusBar />
    <InfoBox />
  </Screen>;

Info.propTypes = {
  navigation: PropTypes.object,
};

export default Info;
