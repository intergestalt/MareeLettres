import React, { Component, PropTypes } from 'react';
import { Text, StatusBar } from 'react-native';

import { TabBar } from '../../components/general/TabBar';
import { Header } from '../../components/general/Header';
import { TABS } from '../../consts/tab';
import { Container } from '../../components/general/Container';

class Dummy2 extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <Container backgroundColor="#0480aa">
        <StatusBar />
        <Header title={'Dummy 2'} navigation={this.props.navigation} />
        <Text>DUMMY2 DUMMY</Text>
        <TabBar selectedTab={TABS.VOTE_TAB} navigation={this.props.navigation} />
      </Container>
    );
  }
}

export default Dummy2;
