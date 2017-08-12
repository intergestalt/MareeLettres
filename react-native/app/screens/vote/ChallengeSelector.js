import React, { Component, PropTypes } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { ChallengeContainer } from '../../components/vote/ChallengeSelector';
import { loadChallengesServiceProxy } from '../../helper/apiProxy';

class ChallengeSelector extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    //    id: PropTypes.string,
    isErrorLoadingChallenges: PropTypes.bool,
    isLoadingChallenges: PropTypes.bool,
    timeLoadChallenges: PropTypes.number,
    language: PropTypes.string,
    challenges: PropTypes.array,
  };
  constructor(props) {
    super(props);

    this.selectedChallengeId = this.props.navigation.state.params.id;
  }

  componentDidMount() {
    loadChallengesServiceProxy();
  }

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
          selectedChallengeId={this.selectedChallengeId}
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
    return this.renderScreen(this.selectedChallengeIndex);
  }
}
const mapStateToProps = (state) => {
  const challenges = state.challenges.challenges;
  const isLoadingChallenges = state.challenges.isLoading;
  const isErrorLoadingChallenges = state.challenges.isError;
  const timeLoadChallenges = state.challenges.time;
  const language = state.globals.language;
  return {
    challenges,
    isLoadingChallenges,
    isErrorLoadingChallenges,
    timeLoadChallenges,
    language,
  };
};
export default connect(mapStateToProps)(ChallengeSelector);

// export default Challenges;
