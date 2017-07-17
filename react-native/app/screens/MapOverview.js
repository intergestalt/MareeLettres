import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { NativeMap } from '../components/Map';
import { Header } from '../components/Header';

class MapOverview extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    return (
      <Container>
        <StatusBar />
        <Header />
        <NativeMap />
      </Container>
    );
  }
}

export default MapOverview;
