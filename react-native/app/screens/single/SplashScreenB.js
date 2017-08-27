import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Font } from 'expo';
import {
  loadUserServiceProxy,
  loadChallengesServiceProxy,
  sendInternalVotesServiceProxy,
  loadContentServiceProxy,
} from '../../helper/apiProxy';
import store from '../../config/store';
import { loadUser, saveAll, loadGlobals } from '../../helper/localStorage';
import { navigateToLanguageSelector, navigateToRoot } from '../../helper/navigationProxy';
import { Screen } from '../../components/general/Container';

function existing(str) {
  if (!str) return false;
  if (str !== null && str !== '') {
    return true;
  }
  return false;
}
const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#cccccc',
  },
});

class SplashScreenB extends Component {
  static propTypes = {
    isLoadingUser: PropTypes.bool,
    userIsLoadingFromStorage: PropTypes.bool,
    isLoadingContent: PropTypes.bool,
    isLoadingChallenges: PropTypes.bool,
    isLoadingGlobalsFromStorage: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.tickerId = null;
    this.state = {
      isFontsReady: false,
    };
  }

  async componentWillMount() {
    console.log('LOAD USER FROM DISC');
    await loadUser();
    const loaded = store.getState().user.userLoadedFromStorage;
    if (!loaded) {
      console.log('LOAD FROM WWW');
      loadUserServiceProxy(true);
    }

    await loadGlobals();

    console.log('Load Challenges');
    loadChallengesServiceProxy(true, true);
    console.log('Load Content');
    loadContentServiceProxy(true, true);

    console.log('Load Font');
    await Font.loadAsync({
      normal: require('../../assets/fonts/ArialMonospacedMTPro.ttf'),
      bold: require('../../assets/fonts/ArialMonospacedMTPro-Bld.ttf'),
      impact: require('../../assets/fonts/impact.ttf'),
    });
    this.setState({ isFontsReady: true });
  }
  componentDidMount() {
    setTimeout(() => {
      this.tickerId = setInterval(() => {
        this.observeState();
      }, 100);
    }, 1);
  }

  observeState() {
    if (this.ready()) {
      clearInterval(this.tickerId);
      const language = store.getState().globals.language;
      if (existing(language)) {
        navigateToRoot(this.props);
      } else {
        navigateToLanguageSelector(this.props);
      }
    }
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive') {
      // || nextAppState === 'active') { In case of becoming active the ticker will do it.
      sendInternalVotesServiceProxy(true);
      saveAll();
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
    if (this.props.isLoadingGlobalsFromStorage) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Screen style={styles.container} backgroundColor={styles._container.backgroundColor}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Init...</Text>
        </View>
      </Screen>
    );
  }
}
const mapStateToProps = (state) => {
  try {
    const isLoadingUser = state.user.isInternalLoading;
    const isLoadingContent = state.content.isInternalLoading;
    const isLoadingChallenges = state.challenges.isInternalLoading;
    const isLoadingUserFromStorage = state.user.userIsLoadingFromStorage;
    const isLoadingGlobalsFromStorage = state.globals.globalsIsLoadingFromStorage;

    return {
      isLoadingUser,
      isLoadingUserFromStorage,
      isLoadingContent,
      isLoadingChallenges,
      isLoadingGlobalsFromStorage,
    };
  } catch (e) {
    console.log('SplashScreenB');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(SplashScreenB);
