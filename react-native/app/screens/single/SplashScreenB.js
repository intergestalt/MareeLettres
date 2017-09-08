import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Font } from 'expo';
import {
  loadUserServiceProxy,
  loadChallengesServiceProxy,
  loadContentServiceProxy,
} from '../../helper/apiProxy';
import store from '../../config/store';
import {
  loadUserFromStorage,
  loadGlobalsFromStorage,
  loadContentFromStorage,
  loadChallengesFromStorage,
  loadProposalsFromStorage,
  loadLettersFromStorage,
  loadMyLettersFromStorage,
  loadConfigFromStorage,
} from '../../helper/localStorage';
import { navigateToLanguageSelector, navigateToRoot } from '../../helper/navigationProxy';
import { writeDynamicConfig } from '../../helper/configHelper';
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
    navigation: PropTypes.object,
    isLoadingUser: PropTypes.bool,
    isLoadingContent: PropTypes.bool,
    isLoadingChallenges: PropTypes.bool,
    isLoadingUserFromStorage: PropTypes.bool,
    isLoadingGlobalsFromStorage: PropTypes.bool,
    isLoadingContentFromStorage: PropTypes.bool,
    isLoadingConfigFromStorage: PropTypes.bool,
    isLoadingChallengesFromStorage: PropTypes.bool,
    isLoadingProposalsFromStorage: PropTypes.bool,
    isLoadingLettersFromStorage: PropTypes.bool,
    isLoadingMyLettersFromStorage: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.tickerId = null;
    this.state = {
      isFontsReady: false,
    };
  }

  async componentWillMount() {
    writeDynamicConfig(store.getState().config);

    await loadUserFromStorage();
    const loaded = store.getState().user.userLoadedFromStorage;
    if (!loaded) {
      loadUserServiceProxy(true);
    }

    await loadGlobalsFromStorage();
    await loadChallengesFromStorage(this.props);
    await loadProposalsFromStorage();
    await loadContentFromStorage();
    await loadConfigFromStorage();
    await loadLettersFromStorage();
    await loadMyLettersFromStorage();

    loadChallengesServiceProxy(true, true);
    loadContentServiceProxy(true, true);
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

  ready() {
    if (this.props.isLoadingUserFromStorage) {
      return false;
    }
    if (this.props.isLoadingGlobalsFromStorage) {
      return false;
    }
    if (this.props.isLoadingContentFromStorage) {
      return false;
    }
    if (this.props.isLoadingConfigFromStorage) {
      return false;
    }
    if (this.props.isLoadingChallengesFromStorage) {
      return false;
    }
    if (this.props.isLoadingProposalsFromStorage) {
      return false;
    }
    if (this.props.isLoadingLettersFromStorage) {
      return false;
    }
    if (this.props.isLoadingMyLettersFromStorage) {
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
    return (
      <Screen
        navigation={this.props.navigation}
        style={styles.container}
        backgroundColor={styles._container.backgroundColor}
      >
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
    const isLoadingContentFromStorage = state.content.contentIsLoadingFromStorage;
    const isLoadingConfigFromStorage = state.config.configIsLoadingFromStorage;
    const isLoadingChallengesFromStorage = state.challenges.challengesIsLoadingFromStorage;
    let isLoadingProposalsFromStorage = false;
    if (state.proposals.proposalsIsLoadingFromStorage) {
      isLoadingProposalsFromStorage = true;
    }
    const isLoadingLettersFromStorage = state.letters.lettersIsLoadingFromStorage;
    const isLoadingMyLettersFromStorage = state.myLetters.myLettersIsLoadingFromStorage;

    return {
      isLoadingUser,
      isLoadingContent,
      isLoadingChallenges,
      isLoadingUserFromStorage,
      isLoadingGlobalsFromStorage,
      isLoadingConfigFromStorage,
      isLoadingContentFromStorage,
      isLoadingChallengesFromStorage,
      isLoadingProposalsFromStorage,
      isLoadingLettersFromStorage,
      isLoadingMyLettersFromStorage,
    };
  } catch (e) {
    console.log('SplashScreenB');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(SplashScreenB);
