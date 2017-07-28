import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { ChallengesList } from '../components/ChallengesList';
import { Header } from '../components/Header';

import config from '../config/config';

class Challenges extends Component {
  static navigationOptions = {
    title: 'Questions',
  };

  // TODO: fix the fetch!
  componentDidMount() {
    fetch(config.API_PREFIX + "challenges/") 
      .then(function(response) {
        console.log(response.json())
    })
  }
 

  render() {
    return (
      <Container>
        <StatusBar />
        <ChallengesList challenges={this.props.challenges} />
      </Container>
    );
  }
}

export default Challenges;

// export default Challenges;
