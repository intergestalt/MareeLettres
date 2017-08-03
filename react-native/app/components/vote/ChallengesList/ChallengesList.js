import React, { Component, PropTypes } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

class ChallengesList extends Component {
  static propTypes = {
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    time: PropTypes.number,
    language: PropTypes.string,
    challenges: PropTypes.array,
  };

  render() {
    console.log(`isError: ${this.props.isError}`);
    console.log(`isLoading: ${this.props.isLoading}`);
    console.log(`time: ${this.props.time}`);
    console.log(`language: ${this.props.language}`);
    const isLoading = this.props.isLoading;
    const isError = this.props.isError;

    const rows = [];
    if (!isLoading && !isError) {
      rows.push(
        <FlatList
          key="0"
          data={this.props.challenges}
          renderItem={({ item }) =>
            <Text key="1">
              {item.title}
            </Text>}
          keyExtractor={item => item._id}
        />,
      );
    }
    if (isLoading) {
      rows.push(<Text key="2">Loading...</Text>);
    }
    if (isError) {
      rows.push(<Text key="3">ERROR!</Text>);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>List of Challenges (NUIT-6) </Text>
        {rows}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
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
