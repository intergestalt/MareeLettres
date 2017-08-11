import React, { Component, PropTypes } from 'react';
import { StatusBar, Text, Animated } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { ChallengeContainer } from '../../components/vote/ChallengeSelector';
import { loadChallengesServiceProxy, loadChallengeServiceProxy } from '../../helper/apiProxy';
import { screenWidth } from '../../helper/screen';

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
    this.state = {
      isFinished: true,
      isTinder: true,
    };
    this.selectedChallengeId = this.props.navigation.state.params.id;
    this.handleSharePress = this.handleSharePress.bind(this);
    this.handleTinderPress = this.handleTinderPress.bind(this);
    this.handleListPress = this.handleListPress.bind(this);

    this.callBackItemFinished = this.callBackItemFinished.bind(this);
  }

  componentDidMount() {
    loadChallengesServiceProxy(this.props);
  }

  callBackItemFinished(challengeId) {
    for (let i = 0; i < this.props.challenges.length; i += 1) {
      const challenge = this.props.challenges[i];
      if (challenge._id === challengeId) {
        loadChallengeServiceProxy(this.props, challengeId);
      }
    }
  }
  handleSharePress() {
    console.log('handleSharePress');
  }

  handleTinderPress() {
    console.log('handleTinderPress');
    this.setState({ isTinder: true });
    console.log(this.state);
  }
  handleListPress() {
    console.log('handleListPress');
    this.setState({ isTinder: false });
    console.log(this.state);
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
          callBackItemFinished={this.callBackItemFinished}
          navigation={this.props.navigation}
        />
        {/* <FooterMenu
          handleListPress={this.handleListPress}
          handleTinderPress={this.handleTinderPress}
          handleSharePress={this.handleSharePress}
          isFinished={this.state.isFinished}
          isTinder={this.state.isTinder}
        />*/}
      </Screen>
    );
  }
  /* renderScreen() {
    return (
      <Screen>
        <StatusBar />
        <ChallengeContainer
          language={this.props.language}
          challengeLeft={this.props.challenges[this.selectedChallengeIndex - 1]}
          challenge={this.props.challenges[this.selectedChallengeIndex]}
          challengeRight={this.props.challenges[this.selectedChallengeIndex + 1]}
          isTinder={this.state.isTinder}
          isFinished={this.state.isFinished}
          headerSwipeOffsetX={this.state.headerSwipeOffsetX}
          navigateDown={this.navigateDown}
          navigateUp={this.navigateUp}
          navigation={this.props.navigation}
          callBackItemFinished={this.callBackItemFinished}
        />
        <FooterMenu
          handleListPress={this.handleListPress}
          handleTinderPress={this.handleTinderPress}
          handleSharePress={this.handleSharePress}
          isFinished={this.state.isFinished}
          isTinder={this.state.isTinder}
        />
      </Screen>
    );
  }*/

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
