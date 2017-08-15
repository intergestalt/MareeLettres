import React, { PropTypes, Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';
import TABS from '../../consts/tab';

import { LetterSelectorWindow } from '../../components/map/LetterSelector';

class LetterSelector extends Component {
  static PropTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <Screen backgroundColor={'#ffffff'}>
        <StatusBar />
        <LetterSelectorWindow
          navigation={this.props.navigation}
          />
        <TabBar selectedTab={TABS.BECOME_TAB} navigation={this.props.navigation} />
      </Screen>
    )
  }
};

export default connect()(LetterSelector);
