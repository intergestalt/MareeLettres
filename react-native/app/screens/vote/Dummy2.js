import React, { PropTypes } from 'react';
import { Text, StatusBar } from 'react-native';

import { Header } from '../../components/general/Header';
import { Container } from '../../components/general/Container';

const Dummy2 = props =>
  <Container backgroundColor="#0480aa">
    <StatusBar />
    <Header title={'Dummy 2'} navigation={props.navigation} />
    <Text>DUMMY2 DUMMY</Text>
  </Container>;

Dummy2.propTypes = {
  navigation: PropTypes.object,
};
export default Dummy2;
