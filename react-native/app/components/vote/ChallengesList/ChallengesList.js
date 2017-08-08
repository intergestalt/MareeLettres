import React, { Component, PropTypes } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import Separator from './Separator';
import ChallengesListItem from './ChallengesListItem';
import styles from './styles';

class ChallengesList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    time: PropTypes.number,
    language: PropTypes.string,
    challenges: PropTypes.array,
  };
  handlePress = (item) => {
    console.log('PRESS ROW');
    console.log(item);

    this.props.navigation.navigate('ChallengeSelector', { id: item.id });
  };

  render() {
    console.log(`isError: ${this.props.isError}`);
    console.log(`isLoading: ${this.props.isLoading}`);
    console.log(`time: ${this.props.time}`);
    console.log(`language: ${this.props.language}`);
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
                language={this.props.language}
                data={item}
                onPress={() => this.handlePress(item)}
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
