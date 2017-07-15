import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';

import { Container } from '../components/Container';
import { ChallengesList } from '../components/ChallengesList';
import { Header } from '../components/Header';

class Challenges extends Component {
  static navigationOptions = {
    title: 'Questions',
  };

  render() {
    console.log("chall",this.props.challenges);
    return (
      <Container>
        <StatusBar />
        <Header />
        <ChallengesList challenges={this.props.challenges} />
      </Container>
    );
  }
}

const ConnectedChallenges = createContainer((params) => {
  Meteor.subscribe('Challenges.pub.list', {});
  return {
    challenges: Meteor.collection('challenges').find(),
  };
}, Challenges);

export default ConnectedChallenges;

// export default Challenges;
