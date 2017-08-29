import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { ChallengeContainer } from '../../components/vote/ChallengeSelector';

class ChallengeSelector extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    language: PropTypes.string,
    challenges: PropTypes.array,
  };

  render() {
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
}
const mapStateToProps = (state) => {
  try {
    const challenges = state.challenges.challenges;
    const language = state.globals.language;
    return {
      challenges,
      language,
    };
  } catch (e) {
    console.log('ChallengeSelector');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeSelector);
