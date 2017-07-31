import React, { PropTypes } from 'react';
import { StatusBar, Text } from 'react-native';

import { Container } from '../../components/general/Container';
import { Header } from '../../components/general/Header';

const How = props => (
  <Container backgroundColor="#aaaa00">
    <StatusBar />
    <Header title={'How to Play'} navigation={props.navigation} />
    <Text>HOW TO PLAY DUMMY</Text>
  </Container>
);

How.propTypes = {
  navigation: PropTypes.object,
};

export default How;
