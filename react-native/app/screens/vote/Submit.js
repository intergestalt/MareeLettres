import React, { Component, PropTypes } from 'react';
import { StatusBar, Text } from 'react-native';

import { Screen } from '../../components/general/Container';
import { ProposalSubmitter } from '../../components/vote/Submit';

import SimpleSubmit from '../../components/vote/SimpleSubmit';
import { BackSimple } from '../../components/general/BackButton';

import { NavigationActions } from 'react-navigation';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  static propTypes = {
    navigation: PropTypes.object,
    language: PropTypes.string,
  };

  // TODO: hide TabBar, see TabBar.js -> showTabBar

  handleBackPress() {
    console.log('back');
    const backAction = NavigationActions.back({});
    this.props.navigation.dispatch(backAction);
  }

  componentDidMount() { }

  render() {
    const challenge = this.props.navigation.state.params.challenge;
    return (
      <Screen centerContent>
        <StatusBar />
        <BackSimple colour="black" onPress={() => this.handleBackPress()} />
        <ProposalSubmitter challenge={challenge} />
        {/*<SimpleSubmit challenge={challenge} />*/}
      </Screen>
    );
  }
}

export default Submit;
