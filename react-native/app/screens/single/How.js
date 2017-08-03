import React, { PropTypes } from 'react';
import { StatusBar } from 'react-native';

import { Container, Screen } from '../../components/general/Container';
import { Header } from '../../components/general/Header';
import { HowTo } from '../../components/text/HowTo';

const How = props =>
  <Screen>
    <Container backgroundColor="#aaaa00">
      <StatusBar />
      <Header title={'How to Play'} navigation={props.navigation} />
      <HowTo />
    </Container>
  </Screen>;

How.propTypes = {
  navigation: PropTypes.object,
};

export default How;
