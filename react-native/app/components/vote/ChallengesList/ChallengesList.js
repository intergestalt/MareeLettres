import React, { Component, PropTypes } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import Separator from './Separator';
import ChallengesListItem from './ChallengesListItem';
import styles from './styles';
import { navigateToChallengeSelector } from '../../../helper/navigationProxy';
import { startChallengeTicker } from '../../../helper/ticker';

class ChallengesList extends Component {
  static propTypes = {
    //  navigation: PropTypes.object,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    time: PropTypes.number,
    language: PropTypes.string,
    challenges: PropTypes.array,
  };

  componentDidMount() {
    startChallengeTicker();
  }

  handlePressRow = (item) => {
    navigateToChallengeSelector(this.props, item._id);
  };

  render() {
    const isLoading = this.props.isLoading;
    const isError = this.props.isError;
    if (!isLoading && !isError) {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.props.challenges}
            renderItem={({ item }) =>
              <ChallengesListItem
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
