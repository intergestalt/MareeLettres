import React, { Component } from 'react';
import { View, Text, WebView } from 'react-native';
import MapView from 'react-native-maps';

import styles from './styles';


class ExampleMap extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView style={{flex:1}} javaScriptEnabled={true} source={require('./map-leafletjs.html')}/>
      </View>
    );
  }
}

export default ExampleMap;
