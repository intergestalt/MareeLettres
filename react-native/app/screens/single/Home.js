import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { HomeIntro } from '../../components/text/HomeIntro';
import { LanguageSelector } from '../../components/general/LanguageSelector';

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
      <Screen backgroundColor="#ff8844">
        <StatusBar />
        <LanguageSelector />
        <HomeIntro
          onVotePress={this.handleVotePress}
          onMapPress={this.handleMapPress}
          onStreamPress={this.handleStreamPress}
          onHowPress={this.handleHowPress}
          onAboutPress={this.handleAboutPress}
        />
      </Screen>
    );
  }
}

export default Home;
