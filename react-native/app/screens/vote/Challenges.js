import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { ChallengesList } from '../../components/vote/ChallengesList';
import { manageChallenges } from '../../helper/challengesHelper';

class Challenges extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  componentDidMount() {
    manageChallenges(this.props);
  }

  render() {
    return (
      <Screen centerContent backgroundColor="#88ff44">
        <StatusBar hidden={false} />
        <ChallengesList navigation={this.props.navigation} />
      </Screen>
    );
  }
}
export default Challenges;
