import React, { Component, PropTypes } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import Separator from './Separator';
import ChallengesListItem from './ChallengesListItem';
import styles from './styles';
import { navigateToChallengeSelector } from '../../../helper/navigationProxy';
import { loadChallengeServiceProxy } from '../../../helper/apiProxy';

class ChallengesList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    time: PropTypes.number,
    language: PropTypes.string,
    challenges: PropTypes.array,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.callBackItemFinished = this.callBackItemFinished.bind(this);
  }
  handlePressRow = (item) => {
    navigateToChallengeSelector(this.props, item);
  };

  callBackItemFinished(challengeId) {
    for (let i = 0; i < this.props.challenges.length; i += 1) {
      const challenge = this.props.challenges[i];
      if (challenge._id === challengeId) {
        loadChallengeServiceProxy(this.props, challengeId);
      }
    }
  }

  render() {
    const isLoading = this.props.isLoading;
    const isError = this.props.isError;
    if (!isLoading && !isError) {
      return (
        <View style={styles.container}>
          <Text style={styles.headline}>List of Challenges (NUIT-6) </Text>
          <FlatList
            data={this.props.challenges}
            renderItem={({ item }) =>
              <ChallengesListItem
                callBackItemFinished={this.callBackItemFinished}
                language={this.props.language}
                data={item}
                onPress={() => this.handlePressRow(item)}
              />}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={Separator}
          />
        </View>
      );
    }
    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.headline}>List of Challenges (NUIT-6) </Text>
          <Text>Loading...</Text>
        </View>
      );
    }
    // Else: isError==true
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>List of Challenges (NUIT-6) </Text>
        <Text>ERROR!</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const challenges = state.challenges.challenges;
  const isLoading = state.challenges.isLoading;
  const isError = state.challenges.isError;
  const time = state.challenges.time;
  const language = state.globals.language;

  return {
    challenges,
    isLoading,
    isError,
    time,
    language,
  };
};
export default connect(mapStateToProps)(ChallengesList);
