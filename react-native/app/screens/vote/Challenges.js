import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { ChallengesList } from '../../components/vote/ChallengesList';
import { loadChallengesServiceProxy } from '../../helper/apiProxy';

class Challenges extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  componentDidMount() {
    loadChallengesServiceProxy();
  };

  render() {
    return (
      <Screen centerContent backgroundColor="#88ff44">
        <StatusBar />
        {<ChallengesList navigation={this.props.navigation} />}
      </Screen>
    );
  }
}
export default connect()(Challenges);

// export default Challenges;
