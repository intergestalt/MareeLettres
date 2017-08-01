import React, { PropTypes } from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../../components/general/Container';
import { Header } from '../../components/general/Header';
import { HowTo } from '../../components/text/HowTo';

const How = props =>
  <Container backgroundColor="#aaaa00">
    <StatusBar />
    <Header title={'How to Play'} navigation={props.navigation} />
    <HowTo />
  </Container>;

How.propTypes = {
  navigation: PropTypes.object,
};

export default How;
