import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const HomeIntro = () => (
    <View>
        <Text style={styles.paragraph}>
            Decide together what the Big Letters should say!
        </Text>
        <Text style={styles.paragraph}>
            Become a Letter yourself and walk around the map!
        </Text>    
    </View>
);

export default HomeIntro;
