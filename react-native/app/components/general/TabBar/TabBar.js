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
    hidden: PropTypes.bool,
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
  } */

  handleVotePress = () => {
    navigateToVote(this.props);
  };

  handleBecomePress = () => {
    navigateToBecome(this.props);
  };

  handleStreamPress = () => {
    navigateToStream(this.props);
  };

  handleInfoPress = () => {
    navigateToStream(this.props);
  };

  render() {
    const tabIndex = this.props.navigation.state.index;
    const newState = this.props.navigation.state;
    const params = newState.params;
    const isVisible = !params || params.visible;

    //console.log(newState);

    /* let stackIndex = -1;
    if (tabIndex) {
      const tab = this.props.navigation.state.routes[tabIndex];
      if (tab.routes) {
        stackIndex = tab.index;
      }
    } */
    let voteSelected = false;
    let becomeSelected = false;
    let streamSelected = false;
    let infoSelected = false;
    let showTabBar = true;

    if (tabIndex === 1) {
      voteSelected = true;
      /* if (stackIndex === 1) {
        showTabBar = false;
      } */
    } else if (tabIndex === 2) {
      becomeSelected = true;
    } else if (tabIndex === 3) {
      streamSelected = true;
    } else if (tabIndex === 4) {
      infoSelected = true;
    } else {
      showTabBar = false;
    }

    if (showTabBar && !this.props.hidden) {
        return (
          <View style={styles.container}>
            <View style={[styles.tab, styles.tabFirst]}>
              {!voteSelected
                ? <TouchableOpacity onPress={this.handleVotePress}>
                  <Text style={styles.text}>ABC</Text>
                </TouchableOpacity>
                : <Text style={styles.textHigh}>ABC</Text>}
            </View>
            <View style={styles.tab}>
              {!becomeSelected
                ? <TouchableOpacity onPress={this.handleBecomePress} style={styles.touchable}>
                  <Text style={styles.text}>MAP</Text>
                </TouchableOpacity>
                : <Text style={styles.textHigh}>MAP</Text>}
            </View>
            <View style={styles.tab}>
              {!streamSelected
                ? <TouchableOpacity onPress={this.handleStreamPress}>
                  <Text style={styles.text}>IMG</Text>
                </TouchableOpacity>
                : <Text style={styles.textHigh}>IMG</Text>}
            </View>
            <View style={styles.tab}>
              {!infoSelected
                ? <TouchableOpacity onPress={this.handleInfoPress}>
                  <Text style={styles.text}>INFO</Text>
                </TouchableOpacity>
                : <Text style={styles.textHigh}>INFO</Text>}
            </View>
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

// class TabBarTest extends React.Component {
//   render() {
//     return (
//       <View>
//         <Text>Test</Text>
//       </View>
//     );
//   }
// }
//
// export default TabBar;
