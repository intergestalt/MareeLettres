import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { HomeIntro } from '../../components/text/HomeIntro';
import { LanguageSelector } from '../../components/general/LanguageSelector';
import { navigateToHowTo, navigateToAbout } from '../../actions/navigation';

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
    navigateToHowTo(this.props);
  };

  handleAboutPress = () => {
    navigateToAbout(this.props);
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
const mapStateToProps = (state) => {
  const content = state.content;
  return {
    content,
  };
};
export default connect(mapStateToProps)(Home);
