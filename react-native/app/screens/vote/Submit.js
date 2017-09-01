import React, { Component, PropTypes } from 'react';
import { StatusBar, Text } from 'react-native';

import { Screen } from '../../components/general/Container';
import { ProposalSubmitter } from '../../components/vote/Submit';

import SimpleSubmit from '../../components/vote/SimpleSubmit';

class Submit extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    language: PropTypes.string,
  };

  // TODO: hide TabBar, see TabBar.js -> showTabBar

  componentDidMount() {}

  render() {
    const challenge = this.props.navigation.state.params.challenge;
    return (
      <Screen centerContent>
        <StatusBar />
        <ProposalSubmitter challenge={challenge} />
        {/* <SimpleSubmit challenge={challenge}/> */}
      </Screen>
    );
  }
}

export default Submit;
