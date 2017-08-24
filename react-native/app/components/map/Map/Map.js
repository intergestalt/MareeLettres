import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

import { changeMapRegionProxy } from '../../../helper/mapHelper';

import { connect } from 'react-redux';
import { styles, mapstyles } from './styles';

class Map extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    origin_id: PropTypes.string,
    letters: PropTypes.array,
    my_letters: PropTypes.array,
    dropzone_radius: PropTypes.number,
    coordinates: PropTypes.object,
  };

  onPress = (e) => {
    const region = e.nativeEvent;
    // on map press
  };

  onRegionChange = (region) => {
    // on map drag
  };

  onRegionChangeComplete = (region) => {
    changeMapRegionProxy(region);
  };

  render() {
    console.log('MAP RENDERED');

    return (
      <View style={styles.container}>
        <MapView
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          onPress={this.onPress}
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.container}
          initialRegion={{ ...this.props.coordinates }}
          rotateEnabled={false}
          customMapStyle={mapstyles}
        >
          <MapView.Circle center={{ ...this.props.coordinates }} radius={1} strokeColor={'#fff'} />
          <MapView.Circle
            center={{ ...this.props.coordinates }}
            radius={this.props.dropzone_radius}
            strokeColor={'rgba(255,255,255,0.25)'}
            fillColor={'rgba(255,255,255,0.1)'}
          />
          <MapView.Marker
            title={'drop_zone'}
            coordinate={{
              latitude: this.props.coordinates.latitude + 0.00005,
              longitude: this.props.coordinates.longitude,
            }}
          >
            <Text style={styles.letter_dropzone}>Drop Zone</Text>
          </MapView.Marker>

          {this.props.my_letters.map((item, i) => {
            // prototype fade function
            // TODO: shift to reducer, remove invisible letters

            const t = new Date().getTime() - new Date(item.last_used_at).getTime();
            let opacity = 1 - t / 60000;
            if (opacity < 0) {
              opacity = 0;
            }

            return (
              <MapView.Marker
                key={i}
                coordinate={{ latitude: item.coords.lat, longitude: item.coords.lng }}
              >
                <Text style={[styles.letter, { opacity }]}>
                  {item.character}
                </Text>
              </MapView.Marker>
            );
          })}
          {this.props.letters.map((item, i) => {
            if (i < 30) {
              return (
                <MapView.Marker
                  key={i}
                  coordinate={{ latitude: item.coords.lat, longitude: item.coords.lng }}
                >
                  <Text style={styles.letter}>
                    {item.character}
                  </Text>
                </MapView.Marker>
              );
            }
          })}
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const origin_id = state.user.origin_id;
    const letters = state.letters.content;
    const my_letters = state.myLetters.content;
    const coordinates = state.user.coordinates;
    const dropzone_radius = state.user.map.dropzone_radius;

    return {
      origin_id,
      letters,
      my_letters,
      coordinates,
      dropzone_radius,
    };
  } catch (e) {
    console.log('Map');
    console.log(e); throw e;
  }
};

export default connect(mapStateToProps)(Map);
