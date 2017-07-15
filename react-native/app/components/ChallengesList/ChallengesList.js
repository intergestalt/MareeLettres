import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

import styles from './styles';

class ChallengesList extends Component {

  render() {
  console.log("chall2",this.props.challenges);
    return (
      <View style={styles.container}>
        <Text>
          List of Challenges (NUIT-6) 
        </Text>
        <FlatList 
          data={this.props.challenges}
          renderItem={({item}) => <Text>{item.title}</Text>}
          keyExtractor={(item)=>item._id}
        />
      </View>
    );
  }
}
export default ChallengesList;
