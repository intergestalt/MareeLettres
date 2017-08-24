import React, { Component, PropTypes } from 'react';
import { AppState, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Font } from 'expo';
import {
  loadUserServiceProxy,
  loadChallengesServiceProxy,
  sendInternalVotesServiceProxy,
  loadContentServiceProxy,
} from '../../../helper/apiProxy';
import store from '../../../config/store';
import { loadUser, saveUser } from '../../../helper/localStorage';

class AppContainer extends Component {
  static propTypes = {
    isLoadingUser: PropTypes.bool,
    userIsLoadingFromStorage: PropTypes.bool,
    isLoadingContent: PropTypes.bool,
    isLoadingChallenges: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFontsReady: false,
    };
  }

  async componentWillMount() {
    console.log('LOAD USER FROM DISC');
    await loadUser();
    const loaded = store.getState().user.userLoadedFromStorage;
    if (!loaded) {
      console.log('NO USER ON DISC!');
      loadUserServiceProxy(true);
    }

    console.log('Load Challenges');
    loadChallengesServiceProxy(true, true);
    console.log('Load Content');
    loadContentServiceProxy(true, true);

    console.log('Load Font');
    await Font.loadAsync({
      normal: require('./assets/fonts/ArialMonospacedMTPro.ttf'),
      bold: require('./assets/fonts/ArialMonospacedMTPro-Bld.ttf'),
      impact: require('./assets/fonts/impact.ttf'),
    });
    this.setState({ isFontsReady: true });
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    console.log('REMOVE EVENTLISTENER');
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive') {
      // || nextAppState === 'active') { In case of becoming active the ticker will do it.
      sendInternalVotesServiceProxy(true);
      saveUser();
    }
  };

  ready() {
    if (this.props.userIsLoadingFromStorage) {
      return false;
    }
    if (!this.state.isFontsReady) {
      return false;
    }
    if (this.props.isLoadingUser) {
      return false;
    }
    if (this.props.isLoadingContent) {
      return false;
    }
    if (this.props.isLoadingChallenges) {
      return false;
    }
    return true;
  }

  render() {
    if (!this.ready()) {
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
  try {
    const isLoadingUser = state.user.isInternalLoading;
    const isLoadingContent = state.content.isInternalLoading;
    const isLoadingChallenges = state.challenges.isInternalLoading;
    const isLoadingUserFromStorage = state.user.userIsLoadingFromStorage;

    return {
      isLoadingUser,
      isLoadingUserFromStorage,
      isLoadingContent,
      isLoadingChallenges,
    };
  } catch (e) {
    console.log('App');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(AppContainer);
