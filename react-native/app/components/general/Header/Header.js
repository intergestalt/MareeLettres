import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from './styles';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    navigation: PropTypes.object,
  };

  handleHomePress = () => {
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
      this.props.navigation.navigate('Home');
    });

    //    this.props.navigation.goBack('Challenges');
  };

  handleBackPress = () => {
    if (!this.props.navigation.goBack()) {
      this.props.navigation.navigate('Home');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleBackPress}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text>
          {this.props.title}
        </Text>
        <TouchableOpacity onPress={this.handleHomePress}>
          <Text>Home</Text>
        </TouchableOpacity>
        {/*    <TouchableOpacity style={styles.button} onPress={props.onPress}>
    </TouchableOpacity>*/}
      </View>
    );
  }
}

export default Header;
