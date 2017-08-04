import React, { Component, PropTypes } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { Header } from '../../components/general/Header';
import { loadChallenges } from '../../actions/services/challenges';
import { SwipeContainer, FooterMenu } from '../../components/vote/ChallengeSelector';

class ChallengeSelector extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    id: PropTypes.string,
    isErrorLoadingChallenges: PropTypes.bool,
    isLoadingChallenges: PropTypes.bool,
    timeLoadChallenges: PropTypes.number,
    language: PropTypes.string,
    challenges: PropTypes.array,
  };
  constructor(props) {
    super(props);

    this.state = {
      isFinished: false,
      isTinder: true,
    };
  }

  componentDidMount() {
    this.props.dispatch(loadChallenges());
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
        <Header title={'Challenges'} navigation={this.props.navigation} />
        <Text>Loading...</Text>
      </Screen>
    );
  }

  renderError() {
    return (
      <Screen>
        <Container backgroundColor="#88ff44">
          <StatusBar />
          <Header title={'Challenges'} navigation={this.props.navigation} />
          <Text>ERROR!</Text>
        </Container>
      </Screen>
    );
  }

  renderScreen(index) {
    return (
      <Screen>
        <StatusBar />
        <Header title={'Challenges'} navigation={this.props.navigation} />
        <SwipeContainer
          challenge={this.props.challenges[index]}
          isTinder={this.state.isTinder}
          isFinished={this.state.isFinished}
        />
        <FooterMenu
          handleListPress={this.handleListPress.bind(this)}
          handleTinderPress={this.handleTinderPress.bind(this)}
          handleSharePress={this.handleSharePress.bind(this)}
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

    let index = -1;
    for (let i = 0; i < this.props.challenges.length; i += 1) {
      const challenge = this.props.challenges[i];
      if (challenge._id === this.props.navigation.state.params.id) {
        index = i;
      }
    }
    console.log(`FOUND: ${index}`);
    if (index === -1) {
      return this.renderError();
    }
    return this.renderScreen(index);
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
