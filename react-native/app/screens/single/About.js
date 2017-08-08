import React, { PropTypes } from 'react';
import { StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { Header } from '../../components/general/Header';
import { AboutApp } from '../../components/text/About';

const About = props =>
  <Screen backgroundColor="#aa00aa">
    <StatusBar />
    <Header title={'About'} navigation={props.navigation} />
    <AboutApp />
  </Screen>;

About.propTypes = {
  navigation: PropTypes.object,
};
export default About;
