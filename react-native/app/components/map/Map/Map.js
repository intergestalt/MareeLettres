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
    let region = e.nativeEvent;
    // click map
  };

  onRegionChange = (region) => {
    // drag map
  };

  onRegionChangeComplete = (region) => {
    changeMapRegionProxy(region);
  };

  render() {
    console.log('MAP RENDERED');

    return (
      <View style = {styles.container}>
        <MapView
          onRegionChange = {this.onRegionChange}
          onRegionChangeComplete = {this.onRegionChangeComplete}
          onPress = {this.onPress}
          provider = {MapView.PROVIDER_GOOGLE}
          style = {styles.container}
          initialRegion = {{ ...this.props.coordinates }}
    	  customMapStyle={mapstyles}
        >
          <MapView.Circle
            center = {{ ...this.props.coordinates }}
            radius = {1}
            strokeColor = {'#fff'}
            />
          <MapView.Circle
            center = {{ ...this.props.coordinates }}
            radius = { this.props.dropzone_radius }
            strokeColor = { 'rgba(255,255,255,0.25)' }
            fillColor = { 'rgba(255,255,255,0.1)' }
            />
          <MapView.Marker
            title={'drop_zone'}
            coordinate={{
              latitude: this.props.coordinates.latitude + 0.0002,
              longitude: this.props.coordinates.longitude,
            }}
            >
            <Text style={styles.letter_dropzone}>
              DROP ZONE
            </Text>
          </MapView.Marker>

          {
            this.props.my_letters.map((item, i) => {
              if (i < 25) {
                return (
                  <MapView.Marker
                    key={i}
                    coordinate={{latitude:item.coords.lat, longitude:item.coords.lng}}
                    ><Text style={styles.letter}>
                      {item.character}
                    </Text>
                  </MapView.Marker>
                );
              }
            })
          }
          {
            this.props.letters.map((item, i) => {
              if (i < 25) {
                return (
                  <MapView.Marker
                    key={i}
                    coordinate={{latitude:item.coords.lat, longitude:item.coords.lng}}
                    ><Text style={styles.letter}>
                      {item.character}
                    </Text>
                  </MapView.Marker>
                );
              }
            })
          }

        </MapView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const origin_id = state.user.origin_id;
  const letters = state.letters.content;
  const my_letters = state.myLetters.content;
  const coordinates = state.user.coordinates;
  const dropzone_radius = state.user.map.dropzone_radius;

  console.log(my_letters);

  return {
    origin_id, letters, my_letters, coordinates, dropzone_radius,
  };
};

export default connect(mapStateToProps)(Map);
