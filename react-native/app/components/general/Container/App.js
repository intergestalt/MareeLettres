import React, { Component, PropTypes } from 'react';
import { AppState, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { loadUserServiceProxy, sendInternalVotesServiceProxy } from '../../../helper/apiProxy';

class AppContainer extends Component {
  static propTypes = {
    isLoadingUser: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentWillMount() {
    console.log('Load User');
    loadUserServiceProxy(true);
    await Font.loadAsync({
      normal: require('./assets/fonts/ArialMonospacedMTPro.ttf'),
      bold: require('./assets/fonts/ArialMonospacedMTPro-Bld.ttf'),
      impact: require('./assets/fonts/impact.ttf'),
    });
    this.setState({ isReady: true });
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive' || nextAppState === 'active') {
      sendInternalVotesServiceProxy(true);
    }
  };

  render() {
    if (!this.state.isReady || this.props.isLoadingUser) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Init...</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const isLoadingUser = state.user.isInternalLoading;
  return {
    isLoadingUser,
  };
};
export default connect(mapStateToProps)(AppContainer);
