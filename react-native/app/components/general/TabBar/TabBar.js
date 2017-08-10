import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
  navigateToVote,
  navigateToBecome,
  navigateToStream,
} from '../../../helper/navigationProxy';

import styles from './styles';

class TabBar extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  /*  resetScreen(dest, props) {
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
  }*/

  handleVotePress = () => {
    navigateToVote(this.props);
  };

  handleBecomePress = () => {
    navigateToBecome(this.props);
  };

  handleStreamPress = () => {
    navigateToStream(this.props);
  };

  render() {
    const tabIndex = this.props.navigation.state.index;
    /* let stackIndex = -1;
    if (tabIndex) {
      const tab = this.props.navigation.state.routes[tabIndex];
      if (tab.routes) {
        stackIndex = tab.index;
      }
    }*/
    let voteSelected = false;
    let becomeSelected = false;
    let streamSelected = false;
    let showTabBar = true;
    if (tabIndex === 1) {
      voteSelected = true;
      /* if (stackIndex === 1) {
        showTabBar = false;
      }*/
    } else if (tabIndex === 2) {
      becomeSelected = true;
    } else if (tabIndex === 3) {
      streamSelected = true;
    } else {
      showTabBar = false;
    }
    if (showTabBar) {
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
    return <View />;
  }
}

const mapStateToProps = (state) => {
  const showTabBar = state.globals.showTabBar;

  return {
    showTabBar,
  };
};
export default connect(mapStateToProps)(TabBar);
