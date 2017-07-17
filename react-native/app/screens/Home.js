import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { HomeIntro } from '../components/HomeIntro';
import { Header } from '../components/Header';

class Home extends Component {
  static navigationOptions = {
    title: 'Maree des Lettres',
  };

  handleMenuPress = () => {
    console.log('menu pressed');
    this.props.navigation.navigate('Challenges');
  };

  handleVotePress = () => {
    this.props.navigation.navigate('Challenges');
  };

  handleMapPress = () => {
    this.props.navigation.navigate('MapOverview');
  };

  render() {
    return (
      <Container>
        <StatusBar />
        <Header onPress={this.handleMenuPress} />
        <HomeIntro onVotePress={this.handleVotePress} onMapPress={this.handleMapPress} />
      </Container>
    );
  }
}

export default Home;
