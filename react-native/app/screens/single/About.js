import React, { Component, PropTypes } from 'react';
import { Text, StatusBar } from 'react-native';

import { Container } from '../../components/general/Container';
import { Header } from '../../components/general/Header';

class About extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <Container backgroundColor="#aa00aa">
        <StatusBar />
        <Header title={'About'} navigation={this.props.navigation} />
        <Text>ABOUT DUMMY</Text>
      </Container>
    );
  }
}

export default About;
