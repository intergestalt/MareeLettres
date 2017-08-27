import React, { Component, PropTypes } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { ChallengeContainer } from '../../components/vote/ChallengeSelector';

class ChallengeSelector extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isErrorLoadingChallenges: PropTypes.bool,
    isLoadingChallenges: PropTypes.bool,
    language: PropTypes.string,
    challenges: PropTypes.array,
  };

  renderLoading() {
    return (
      <Screen backgroundColor="#88ff44">
        <StatusBar />
        <Text>Loading...</Text>
      </Screen>
    );
  }

  renderError() {
    return (
      <Screen backgroundColor="#88ff44">
        <StatusBar />
        <Text>ERROR!</Text>
      </Screen>
    );
  }
  renderScreen() {
    return (
      <Screen>
        <StatusBar />
        <ChallengeContainer
          language={this.props.language}
          challenges={this.props.challenges}
          navigation={this.props.navigation}
        />
      </Screen>
    );
  }

  render() {
    if (this.props.isLoadingChallenges) {
      return this.renderLoading();
    }
    if (this.props.isErrorLoadingChallenges) {
      return this.renderError();
    }
    return this.renderScreen();
  }
}
const mapStateToProps = (state) => {
  try {
    const challenges = state.challenges.challenges;
    const isLoadingChallenges = state.challenges.isLoading;
    const isErrorLoadingChallenges = state.challenges.isError;
    const language = state.globals.language;
    return {
      challenges,
      isLoadingChallenges,
      isErrorLoadingChallenges,
      language,
    };
  } catch (e) {
    console.log('ChallengeSelector');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeSelector);
