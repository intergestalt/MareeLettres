import React, { Component, PropTypes } from 'react';
import { StatusBar, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../../components/general/Container';
// import { ChallengesList } from '../../components/ChallengesList';
import { Header } from '../../components/general/Header';
import config from '../../config/config';

class Challenges extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };

  static propTypes = {
    navigation: PropTypes.object,
  };

  // TODO: fix the fetch!
  componentDidMount() {
    fetch(`${config.API_PREFIX}challenges/`).then(response => response.json()).then((res) => {
      console.log(res);
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
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  const showTabBar = state.globals.showTabBar;

  return {
    showTabBar,
  };
};
export default connect(mapStateToProps)(Challenges);

// export default Challenges;
