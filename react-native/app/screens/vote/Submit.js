import React, { Component, PropTypes } from 'react';
import { StatusBar, Text } from 'react-native';

import { Screen } from '../../components/general/Container';
import { ProposalSubmitter } from '../../components/vote/Submit';

class Submit extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    navigation: PropTypes.object,
    language: PropTypes.string,
  };

  // TODO: hide TabBar, see TabBar.js -> showTabBar

  componentDidMount() {}

  render() {
    const challenge = this.props.navigation.state.params.challenge;
    return (
      <Screen navigation={this.props.navigation} centerContent>
        <StatusBar />
        {/* <BackSimple colour="black" onPress={() => this.handleBackPress()} /> */}
        <ProposalSubmitter navigation={this.props.navigation} challenge={challenge} />
      </Screen>
    );
  }
}

export default Submit;
