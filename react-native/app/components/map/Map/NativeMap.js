import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

import styles from './styles';
import mapstyles from './mapstyles';

// https://www.npmjs.com/package/react-native-maps
// Note: It's possible to use a different map tile provider for better look
// <MapView.UrlTile
// 		urlTemplate="http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
// 		zIndex={-1}
// 	  />

const NativeMap = () =>
  <View style={styles.container}>
    <Text>You are the A</Text>
    <MapView
			provider={MapView.PROVIDER_GOOGLE}
      style={styles.container}
      initialRegion={{
        latitude: 48.864716,
        longitude: 2.349014,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
			customMapStyle={mapstyles}
    >
		
			<MapView.Marker
				title="A"
				coordinate={{
					latitude: 48.864716,
					longitude: 2.349014,
				}}
				>
        <Text style={styles.letter}>A</Text>
    	</MapView.Marker>
  	</MapView>
  </View>;

export default NativeMap;