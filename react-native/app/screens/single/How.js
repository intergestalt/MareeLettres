import React, { Component, PropTypes } from 'react';
import { StatusBar, Text } from 'react-native';

import { Container } from '../../components/general/Container';
import { Header } from '../../components/general/Header';

class How extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <Container backgroundColor="#aaaa00">
        <StatusBar />
        <Header title={'How to Play'} navigation={this.props.navigation} />
        <Text>HOW TO PLAY DUMMY</Text>
      </Container>
    );
  }
}

export default How;
