import React, { PropTypes } from 'react';
import { Text, StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { Header } from '../../components/general/Header';

const About = props =>
  <Screen centerContent backgroundColor="#aa00aa">
    <StatusBar />
    <Header title={'About'} navigation={props.navigation} />
    <Text>ABOUT DUMMY</Text>
  </Screen>;

About.propTypes = {
  navigation: PropTypes.object,
};
export default About;
