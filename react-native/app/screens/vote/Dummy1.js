import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity, StatusBar } from 'react-native';

import { TabBar } from '../../components/general/TabBar';
import { Header } from '../../components/general/Header';
import TABS from '../../consts/tab';
import { Container } from '../../components/general/Container';

class Dummy1 extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  handlePressDummy2 = () => {
    this.props.navigation.navigate('Dummy2');
  };

  render() {
    return (
      <Container backgroundColor="#44aa88">
        <StatusBar />
        <Header title={'Dummy 1'} navigation={this.props.navigation} />
        <Text>DUMMY1 DUMMY</Text>
        <Text />
        <TouchableOpacity onPress={this.handlePressDummy2}>
          <Text>To: Dummy2</Text>
        </TouchableOpacity>
        <TabBar selectedTab={TABS.VOTE_TAB} navigation={this.props.navigation} />
      </Container>
    );
  }
}

export default Dummy1;
