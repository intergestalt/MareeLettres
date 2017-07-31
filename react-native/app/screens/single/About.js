import React, { PropTypes } from 'react';
import { Text, StatusBar } from 'react-native';

import { Container } from '../../components/general/Container';
import { Header } from '../../components/general/Header';

const About = props => (
  <Container backgroundColor="#aa00aa">
    <StatusBar />
    <Header title={'About'} navigation={props.navigation} />
    <Text>ABOUT DUMMY</Text>
  </Container>
);

About.propTypes = {
  navigation: PropTypes.object,
};
export default About;
