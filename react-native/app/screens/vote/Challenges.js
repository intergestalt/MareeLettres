import React, { Component, PropTypes } from 'react';
import { StatusBar, TouchableOpacity, Text } from 'react-native';

import { Container } from '../../components/general/Container';
// import { ChallengesList } from '../../components/ChallengesList';
import { TabBar } from '../../components/general/TabBar';
import { Header } from '../../components/general/Header';
import { TABS } from '../../consts/tab';
import config from '../../config/config';

class Challenges extends Component {
  static navigationOptions = {
    title: 'Questions',
  };

  static propTypes = {
    navigation: PropTypes.object,
    challenges: PropTypes.object,
  };

  // TODO: fix the fetch!
  componentDidMount() {
    fetch(`${config.API_PREFIX}challenges/`).then((response) => {
      console.log(response.json());
    });
  }

  handlePressDummy1 = () => {
    this.props.navigation.navigate('Dummy1');
  };

  render() {
    return (
      <Container backgroundColor="#88ff44">
        <StatusBar />
        <Header title={'Challenges'} navigation={this.props.navigation} />
        {/* <ChallengesList challenges={this.props.challenges} /> */}
        <Text>CHALLENGES DUMMY</Text>
        <Text />
        <TouchableOpacity onPress={this.handlePressDummy1}>
          <Text>To: Dummy1</Text>
        </TouchableOpacity>
        <TabBar selectedTab={TABS.VOTE_TAB} navigation={this.props.navigation} />

      </Container>
    );
  }
}

export default Challenges;

// export default Challenges;
