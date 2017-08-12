import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import { LettersMenu, DropZone, CameraButton } from '../Overlay';

import styles from './styles';
import mapstyles from './mapstyles';

// https://www.npmjs.com/package/react-native-maps
// Note: It's possible to use a different map tile provider for better look
// <MapView.UrlTile
//	 urlTemplate="http://c.tile.stamen.com/toner/{z}/{x}/{y}.jpg"
//	 zIndex={-1} />

class NativeMap extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    letters: PropTypes.array,
  };

  render() {
    const isLoading = this.props.isLoading;
    const isError = this.props.isError;
    const length = this.props.letters.length;

    return (
      <View style={styles.container}>
        <MapView
    	    provider={MapView.PROVIDER_GOOGLE}
          style={styles.container}
          initialRegion={{
            latitude: 52.48, //48.864716 (Paris)
            longitude: 13.41, //2.349014 (Paris)
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
    	  customMapStyle={mapstyles}
        >
          {
            this.props.letters.map((item, i) => {
              if (i < 20) {
                return (
                  <MapView.Marker
                    key={i}
                    title={item.character}
                    coordinate={{
                      latitude: item.coords.lat,
                      longitude: item.coords.lng,
                    }}
                    ><Text style={styles.letter}>
                      {item.character}
                    </Text>
                  </MapView.Marker>
                );
              } else {
                return null;
              }
            })
          }

        </MapView>
        <LettersMenu />
        <DropZone />
        <CameraButton />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const isLoading = state.letters.isLoading;
  const isError = state.letters.isError;
  const letters = state.letters.content;

  return {
    isLoading,
    isError,
    letters,
  };
};

export default connect(mapStateToProps)(NativeMap);
