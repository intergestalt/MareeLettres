import React, { PureComponent, PropTypes } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import Separator from './Separator';
import ChallengesListItem from './ChallengesListItem';
import { ReloadButton } from '../../../components/general/ReloadButton';
import { styles, ChallengesListHeaderImg } from './';
import { navigateToChallengeSelector } from '../../../helper/navigationProxy';
import { startChallengeTicker } from '../../../helper/ticker';
import { listIsEmpty } from '../../../helper/helper';
import { loadChallengesServiceProxy, loadUserServiceProxy } from '../../../helper/apiProxy';
import { CHALLENGE_VIEWS } from '../../../consts';

class ChallengesList extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    language: PropTypes.string,
    challenges: PropTypes.array,
    // challengesTicker: PropTypes.object,
    isDefaultUser: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.handleReloadUserPressPress = this.handleReloadUserPressPress.bind(this);
    this.handleReloadChallengesPressPress = this.handleReloadChallengesPressPress.bind(this);
  }
  componentDidMount() {
    startChallengeTicker(this.props);
  }

  getAnswer(challenge) {
    let answer = '';
    const winning = challenge.winningProposal;
    if (winning) {
      answer = winning.text;
    }
    return answer;
  }
  handlePressRow = (item) => {
    console.log(`handlePressRow ${item.id}`);
    navigateToChallengeSelector(this.props, item.id);
  };

  renderIsLoading() {
    return (
      <View style={styles.container}>
        <Text>Loading Challenges...</Text>
      </View>
    );
  }

  handleReloadChallengesPressPress = () => {
    loadChallengesServiceProxy(true, false);
  };

  renderIsEmpty() {
    return (
      <View style={styles.container}>
        <ReloadButton
          textKey="reload_challenges"
          onReload={this.handleReloadChallengesPressPress}
        />
      </View>
    );
  }

  handleReloadUserPressPress = () => {
    loadUserServiceProxy(true);
  };
  renderNoUser() {
    return (
      <View style={styles.container}>
        <ReloadButton textKey="reload_user" onReload={this.handleReloadUserPressPress} />
      </View>
    );
  }
  render() {
    const isLoading = this.props.isLoading;

    if (isLoading) {
      return this.renderIsLoading();
    }
    if (this.props.isDefaultUser) {
      return this.renderNoUser();
    }

    if (listIsEmpty(this.props.challenges)) {
      return this.renderIsEmpty();
    }

    const language = this.props.language;
    const listData = new Array(this.props.challenges.length);

    for (let i = 0; i < this.props.challenges.length; i += 1) {
      const myChallenge = this.props.challenges[i];

      listData[i] = {
        id: myChallenge._id,
        index: i,
        voteNum: myChallenge.voteNum,
        title: myChallenge.title[language],
        answer: this.getAnswer(myChallenge),
      };
    }

    return (
      <View style={styles.container}>
        <ChallengesListHeaderImg disabled={false} />
        <FlatList
          data={listData}
          renderItem={({ item }) =>
            <ChallengesListItem
              language={this.props.language}
              data={item}
              callerViewMode={CHALLENGE_VIEWS.LIST}
              onPress={() => this.handlePressRow(item)}
            />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const challenges = state.challenges.challenges;
    const isLoading = state.challenges.isLoading;
    const language = state.globals.language;
    const isDefaultUser = state.user.isDefaultUser;
    return {
      challenges,
      isLoading,
      language,
      isDefaultUser,
    };
  } catch (e) {
    console.log('ChallengesList');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengesList);
