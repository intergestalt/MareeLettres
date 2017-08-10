import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { ChallengesList } from '../../components/vote/ChallengesList';
<<<<<<< HEAD
import { loadChallenges } from '../../actions/services/challenges';
=======
import { Header } from '../../components/general/Header';
import { loadChallengesServiceProxy } from '../../helper/apiProxy';
>>>>>>> bb18a62d4e2b8d3ab281d26bb6f75fca9ac5b2e3

class Challenges extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  // TODO: fix the fetch!
  componentDidMount() {
    loadChallengesServiceProxy(this.props);
  }

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
