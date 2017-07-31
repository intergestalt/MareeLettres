import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

import TABS from '../../../consts/tab';
import styles from './styles';

class TabBar extends Component {
  static propTypes = {
    selectedTab: PropTypes.string,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.selectedTab = props.selectedTab;
    console.log(this.selectedTab);
  }
  resetScreen(dest) {
    const resetScreen = () =>
      new Promise((resolve) => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Challenges' })],
        });
        this.props.navigation.dispatch(resetAction);
        resolve();
      });
    resetScreen().then(() => {
      this.props.navigation.navigate(dest);
    });
  }

  handleVotePress = () => {
    this.resetScreen('Vote');
  };

  handleBecomePress = () => {
    this.resetScreen('Become');
  };

  handleStreamPress = () => {
    this.resetScreen('Stream');
  };

  render() {
    let voteSelected = false;
    let becomeSelected = false;
    let streamSelected = false;

    console.log(this.selectedTab);

    if (this.selectedTab === TABS.VOTE_TAB) {
      voteSelected = true;
    }
    if (this.selectedTab === TABS.BECOME_TAB) {
      becomeSelected = true;
    }
    if (this.selectedTab === TABS.STREAM_TAB) {
      streamSelected = true;
    }
    return (
      <View style={styles.container}>
        {!voteSelected
          ? <TouchableOpacity onPress={this.handleVotePress}>
            <Text style={styles.text}>Vote</Text>
          </TouchableOpacity>
          : <Text style={styles.textHigh}>Vote</Text>}

        {!becomeSelected
          ? <TouchableOpacity onPress={this.handleBecomePress}>
            <Text style={styles.text}>Become</Text>
          </TouchableOpacity>
          : <Text style={styles.textHigh}>Become</Text>}

        {!streamSelected
          ? <TouchableOpacity onPress={this.handleStreamPress}>
            <Text style={styles.text}>Stream</Text>
          </TouchableOpacity>
          : <Text style={styles.textHigh}>Stream</Text>}
      </View>
    );
  }
}

export default TabBar;
