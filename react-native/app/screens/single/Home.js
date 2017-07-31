import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../../components/general/Container';
import { HomeIntro } from '../../components/HomeIntro';
import { Header } from '../../components/general/Header';
import { TabBar } from '../../components/general/TabBar';
import { TABS } from '../../consts/tab';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  static navigationOptions = {
    title: 'Maree des Lettres',
  };

  handleVotePress = () => {
    this.props.navigation.navigate('Vote');
  };

  handleMapPress = () => {
    this.props.navigation.navigate('Become');
  };

  handleStreamPress = () => {
    this.props.navigation.navigate('Stream');
  };

  handleHowPress = () => {
    this.props.navigation.navigate('How');
  };

  handleAboutPress = () => {
    this.props.navigation.navigate('About');
  };

  render() {
    return (
      <Container backgroundColor="#ff8844">
        <StatusBar />
        <HomeIntro
          onVotePress={this.handleVotePress}
          onMapPress={this.handleMapPress}
          onStreamPress={this.handleStreamPress}
          onHowPress={this.handleHowPress}
          onAboutPress={this.handleAboutPress}
        />
      </Container>
    );
  }
}

export default Home;
