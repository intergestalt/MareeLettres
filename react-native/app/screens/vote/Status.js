import React, { Component, PropTypes } from 'react';
import { StatusBar, Text } from 'react-native';

import { Screen } from '../../components/general/Container';
import ProposalStatus from '../../components/vote/Status/ProposalStatus';

class Status extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    navigation: PropTypes.object,
    language: PropTypes.string,
  };

  componentDidMount() {}

  render() {
    const challenge = this.props.navigation.state.params.challenge;
    return (
      <Screen navigation={this.props.navigation} centerContent>
        <StatusBar />
        <ProposalStatus navigation={this.props.navigation} challenge={challenge} />
      </Screen>
    );
  }
}

export default Status;
