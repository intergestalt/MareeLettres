import React, { Component, PropTypes } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import Separator from './Separator';
import ChallengesListItem from './ChallengesListItem';
import styles from './styles';
import { navigateToChallengeSelector } from '../../../helper/navigationProxy';
import { startChallengeTicker } from '../../../helper/ticker';
import { isFinished } from '../../../helper/dateFunctions';

class ChallengesList extends Component {
  static propTypes = {
    //  navigation: PropTypes.object,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    time: PropTypes.number,
    language: PropTypes.string,
    challenges: PropTypes.array,
    challengesTicker: PropTypes.object,
  };

  componentDidMount() {
    startChallengeTicker();
  }

  handlePressRow = (item) => {
    navigateToChallengeSelector(this.props, item._id);
  };
  getAnswer(challenge) {
    let answer = '';
    const winning = challenge.winningProposal;
    if (winning) {
      answer = winning.text;
    }
    return answer;
  }
  render() {
    const isLoading = this.props.isLoading;
    const isError = this.props.isError;
    const listData = new Array(this.props.challenges.length);

    for (let i = 0; i < this.props.challenges.length; i += 1) {
      const myChallenge = this.props.challenges[i];
      let myEndString = null;
      const entry = this.props.challengesTicker[myChallenge._id];
      if (this.props.language === 'en') {
        myEndString = entry.endStringEn;
      } else {
        myEndString = entry.endStringFr;
      }
      listData[i] = {
        id: i,
        voteNum: myChallenge.voteNum,
        isFinished: isFinished(myChallenge),
        endString: myEndString,
        tickerString: entry.tickerString,
        title: myChallenge.title,
        answer: this.getAnswer(myChallenge),
      };
    }
    if (!isLoading && !isError) {
      return (
        <View style={styles.container}>
          <FlatList
            data={listData}
            renderItem={({ item }) =>
              <ChallengesListItem
                language={this.props.language}
                data={item}
                onPress={() => this.handlePressRow(item)}
              />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={Separator}
          />
        </View>
      );
    }
    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    // Else: isError==true
    return (
      <View style={styles.container}>
        <Text>ERROR!</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const challenges = state.challenges.challenges;
  const challengesTicker = state.challengesTicker;
  const isLoading = state.challenges.isLoading;
  const isError = state.challenges.isError;
  const time = state.challenges.time;
  const language = state.globals.language;

  return {
    challenges,
    challengesTicker,
    isLoading,
    isError,
    time,
    language,
  };
};
export default connect(mapStateToProps)(ChallengesList);
