import React, { Component, PropTypes } from 'react';
import { StatusBar, Text, Animated } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { Header } from '../../components/general/Header';
import { loadChallenges } from '../../actions/services/challenges';
import { SwipeContainer, FooterMenu } from '../../components/vote/ChallengeSelector';

class ChallengeSelector extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
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
      selectedChallengeId: this.props.navigation.state.params.id,
      headerSwipeOffsetX: new Animated.Value(),
    };

    this.selectedChallengeIndex = -1;
    this.handleSharePress = this.handleSharePress.bind(this);
    this.handleTinderPress = this.handleTinderPress.bind(this);
    this.handleListPress = this.handleListPress.bind(this);
    this.navigateUp = this.navigateUp.bind(this);
    this.navigateDown = this.navigateDown.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadChallenges());
  }
  getIndexFromId() {
    let index = -1;
    for (let i = 0; i < this.props.challenges.length; i += 1) {
      const challenge = this.props.challenges[i];
      if (challenge.id === this.state.selectedChallengeId) {
        index = i;
      }
    }
    this.selectedChallengeIndex = index;
  }
  handleSharePress() {
    console.log('handleSharePress');
  }

  navigateDown() {
    if (this.selectedChallengeIndex <= 0) {
      return;
    }
    this.selectedChallengeIndex -= 1;
    this.navigate();
  }

  navigateUp() {
    if (this.selectedChallengeIndex >= this.props.challenges.length) {
      return;
    }
    this.selectedChallengeIndex += 1;
    this.navigate();
  }
  navigate() {
    const challenge = this.props.challenges[this.selectedChallengeIndex];
    if (challenge == null) return;
    const newId = challenge.id;
    this.state.headerSwipeOffsetX.setValue(0);

    this.setState({ selectedChallengeId: newId });
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
        <Header title={'Challenges'} navigation={this.props.navigation} />
        <Text>Loading...</Text>
      </Screen>
    );
  }

  renderError() {
    return (
      <Screen backgroundColor="#88ff44">
        <StatusBar />
        <Header title={'Challenges'} navigation={this.props.navigation} />
        <Text>ERROR!</Text>
      </Screen>
    );
  }

  renderScreen() {
    return (
      <Screen>
        <StatusBar />
        <Header title={'Challenges'} navigation={this.props.navigation} />
        <SwipeContainer
          language={this.props.language}
          challengeLeft={this.props.challenges[this.selectedChallengeIndex - 1]}
          challenge={this.props.challenges[this.selectedChallengeIndex]}
          challengeRight={this.props.challenges[this.selectedChallengeIndex + 1]}
          isTinder={this.state.isTinder}
          isFinished={this.state.isFinished}
          headerSwipeOffsetX={this.state.headerSwipeOffsetX}
          navigateDown={this.navigateDown}
          navigateUp={this.navigateUp}
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
  }

  render() {
    if (this.props.isLoadingChallenges) {
      return this.renderLoading();
    }
    if (this.props.isErrorLoadingChallenges) {
      return this.renderError();
    }

    this.getIndexFromId();
    console.log(`FOUND: ${this.selectedChallengeIndex}`);
    if (this.selectedChallengeIndex === -1) {
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
