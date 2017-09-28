import React, { PureComponent, PropTypes } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import Separator from './Separator';
import ChallengesListItem from './ChallengesListItem';
import { ReloadButton } from '../../../components/general/ReloadButton';
import { styles, ChallengesListHeaderImg } from './';
import { navigateToChallengeSelector } from '../../../helper/navigationProxy';
import { startChallengeTicker } from '../../../helper/ticker';
import { listIsEmpty, isEmpty } from '../../../helper/helper';
import { loadChallengesServiceProxy, loadUserServiceProxy } from '../../../helper/apiProxy';
import { CHALLENGE_VIEWS } from '../../../consts';
import { setShowAllFinishedChallenges } from '../../../actions/general';
import { isFinished } from '../../../helper/dateFunctions';

class ChallengesList extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    language: PropTypes.string,
    challenges: PropTypes.array,
    dispatch: PropTypes.func,
    isInitialUser: PropTypes.bool,
    showAllFinishedChallenges: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.handleReloadUserPressPress = this.handleReloadUserPressPress.bind(this);
    this.handleReloadChallengesPressPress = this.handleReloadChallengesPressPress.bind(this);
    this.handlePressShowAll = this.handlePressShowAll.bind(this);
    this.handlePressHideAll = this.handlePressHideAll.bind(this);
  }
  componentDidMount() {
    startChallengeTicker(this.props);
  }

  getAnswer(challenge) {
    let answer = null;
    if (isEmpty(challenge)) return null;
    const winning = challenge.winningProposal;
    if (winning === undefined) {
      answer = null;
    } else if (winning === null) {
      answer = '';
    } else {
      answer = winning.text;
    }
    return answer;
  }

  handlePressRow = (item) => {
    console.log(`handlePressRow ${item.id}`);
    navigateToChallengeSelector(this.props, item.id);
  };

  handlePressShowAll = () => {
    console.log('handle showAll');
    this.props.dispatch(setShowAllFinishedChallenges(true));
  };
  handlePressHideAll = () => {
    console.log('handle hideAll');
    this.props.dispatch(setShowAllFinishedChallenges(false));
  };

  renderIsLoading() {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ flex: 1 }} />
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
  getAnswerImgUrl(myChallenge) {
    let url = null;
    if (myChallenge) {
      url = myChallenge.winningProposalDetailImageUrl;
      if (!url || url.trim() === '') {
        url = null;
      }
    }
    return url;
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
    if (this.props.isInitialUser) {
      return this.renderNoUser();
    }

    if (listIsEmpty(this.props.challenges)) {
      return this.renderIsEmpty();
    }
    const language = this.props.language;
    const listData = [];
    let countFinished = 0;
    let index = 0;
    let firstFinshedIndex = -1;
    let lastFinshedIndex = -1;
    for (let i = 0; i < this.props.challenges.length; i += 1) {
      const myChallenge = this.props.challenges[i];
      if (isFinished(myChallenge)) {
        if (firstFinshedIndex === -1) {
          firstFinshedIndex = i;
        }
        lastFinshedIndex = i;
        countFinished += 1;
      }
    }
    const takeLast = true;

    for (let i = 0; i < this.props.challenges.length; i += 1) {
      const myChallenge = this.props.challenges[i];
      let add = true;
      if (!this.props.showAllFinishedChallenges) {
        if (isFinished(myChallenge)) {
          add = false;
          if (takeLast && lastFinshedIndex === i) {
            add = true;
          } else if (!takeLast && firstFinshedIndex === i) {
            add = true;
          }
        }
      }

      if (add) {
        let last = false;
        if (i === lastFinshedIndex) {
          last = true;
        }
        listData[index] = {
          id: myChallenge._id,
          index,
          voteNum: myChallenge.voteNum,
          title: myChallenge.title[language],
          answer: this.getAnswer(myChallenge),
          url: this.getAnswerImgUrl(myChallenge),
          last,
        };
        index += 1;
      }
    }
    let header = null;
    if (countFinished === 0) {
      header = <ChallengesListHeaderImg />;
    }
    let oneFished = false;
    if (countFinished === 1) {
      oneFished = true;
    }

    return (
      <View style={styles.container}>
        {header}
        <FlatList
          data={listData}
          renderItem={({ item }) => (
            <ChallengesListItem
              oneFinished={oneFished}
              showAll={this.props.showAllFinishedChallenges}
              language={this.props.language}
              data={item}
              callerViewMode={CHALLENGE_VIEWS.LIST}
              onPress={() => this.handlePressRow(item)}
              onShowAllPress={() => this.handlePressShowAll()}
              onHideAllPress={() => this.handlePressHideAll()}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const challenges = state.challenges.challenges;
    const isLoading = state.challenges.isLoading || state.user.isLoading;
    const language = state.globals.language;
    const showAllFinishedChallenges = state.globals.showAllFinishedChallenges;
    const isInitialUser = state.user.isInitialUser;
    return {
      challenges,
      isLoading,
      language,
      isInitialUser,
      showAllFinishedChallenges,
    };
  } catch (e) {
    console.log('ChallengesList');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengesList);
