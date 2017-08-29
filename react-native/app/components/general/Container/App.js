import React, { Component } from 'react';
import { AppState, View } from 'react-native';
import { sendInternalVotesServiceProxy } from '../../../helper/apiProxy';

class AppContainer extends Component {
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    console.log('REMOVE EVENTLISTENER');
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive') {
      console.log('APP BECOMES INACTIVE');
      // || nextAppState === 'active') { In case of becoming active the ticker will do it.
      sendInternalVotesServiceProxy(true);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
      </View>
    );
  }
}

export default AppContainer;
