import React, { Component, PropTypes } from 'react';
import { StatusBar, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../../components/general/Container';
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

  handlePressDummy1 = () => {
    this.props.navigation.navigate('Dummy1');
  };

  render() {
    return (
      <Container backgroundColor="#88ff44">
        <StatusBar />
        <Header title={'Challenges'} navigation={this.props.navigation} />
        {<ChallengesList />}
        {/* <Text>CHALLENGES DUMMY</Text>
        <Text />
        <TouchableOpacity onPress={this.handlePressDummy1}>
          <Text>To: Dummy1</Text>
        </TouchableOpacity>*/}
      </Container>
    );
  }
}
export default connect()(Challenges);

// export default Challenges;
