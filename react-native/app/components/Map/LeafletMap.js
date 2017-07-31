import React from 'react';
import { View, WebView } from 'react-native';

import styles from './styles';

const ExampleMap = () =>
  <View style={styles.container}>
    <WebView style={{ flex: 1 }} javaScriptEnabled source={require('./map-leafletjs.html')} />
  </View>;

export default ExampleMap;
