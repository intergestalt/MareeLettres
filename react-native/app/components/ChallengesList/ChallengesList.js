import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const ChallengesList = () =>
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
  </View>;

export default ChallengesList;
