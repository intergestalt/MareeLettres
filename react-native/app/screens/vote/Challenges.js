import React, { Component, PropTypes } from 'react';
import { StatusBar, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import { Container, Screen } from '../../components/general/Container';
import { ChallengesList } from '../../components/vote/ChallengesList';
import { Header } from '../../components/general/Header';
import { loadChallenges } from '../../actions/services/challenges';

class Challenges extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  };

  // TODO: fix the fetch!
  componentDidMount() {
    this.props.dispatch(loadChallenges());
  }

  render() {
    return (
      <Screen>
        <Container backgroundColor="#88ff44">
          <StatusBar />
          <Header title={'Challenges'} navigation={this.props.navigation} />
          {<ChallengesList navigation={this.props.navigation} />}
        </Container>
      </Screen>
    );
  }
}
export default connect()(Challenges);

// export default Challenges;
