import React, { Component } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';

import styles from './styles';

class ChallengesList extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>List of Challenges (NUIT-6) </Text>
        <FlatList
          data={this.props.challenges}
          renderItem={({ item }) =>
            <Text>
              {item.title}
            </Text>}
          keyExtractor={item => item._id}
        />*/}
      </View>
    );
  }
}
export default ChallengesList;
