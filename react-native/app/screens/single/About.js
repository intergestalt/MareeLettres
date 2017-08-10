import React, { PropTypes } from 'react';
import { StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { AboutApp } from '../../components/text/About';

const About = props =>
  <Screen backgroundColor="#aa00aa">
    <StatusBar />
    <AboutApp />
  </Screen>;

About.propTypes = {
  navigation: PropTypes.object,
};
export default About;
