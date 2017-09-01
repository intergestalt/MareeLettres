import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import MapView from 'react-native-maps';
import { changeMapRegionProxy, setUserCoordinatesProxy } from '../../../helper/mapHelper';
import { connect } from 'react-redux';
import { styles, mapstyles } from './styles';
import Exponent from 'expo';

import { DYNAMIC_CONFIG } from '../../../config/config';

class Map extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    origin_id: PropTypes.string,
    letters: PropTypes.object,
    my_letters: PropTypes.object,
    dropzone_radius: PropTypes.number,
    coordinates: PropTypes.object,
    map_coordinates: PropTypes.object,
    letter_decay_time: PropTypes.number,
    initial_delta: PropTypes.number,
    track_player_movements: PropTypes.bool,
    map_delta_max: PropTypes.number,
    map_delta_initial: PropTypes.number,
    letter_base_size: PropTypes.number,
    min_zoom_level: PropTypes.number,
    max_zoom_level: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      lat: this.props.coordinates.latitude,
      lng: this.props.coordinates.longitude,
      letter_size: 12,
      delta_initial: this.metresToDelta(this.props.dropzone_radius * this.props.map_delta_initial),
      delta_max: this.metresToDelta(this.props.dropzone_radius * this.props.map_delta_max),
      blink: new Animated.Value(0),
    };
  }

  async _getPlayerCoords() {
    const { Location, Permissions } = Exponent;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      Location.getCurrentPositionAsync({ enableHighAccuracy: true }).then((res) => {
        //res.coords.latitude = 52.49330866968013; res.coords.longitude = 13.436372637748718;
        setUserCoordinatesProxy(res.coords.latitude, res.coords.longitude);
        this.setState({ lng: res.coords.longitude, lat: res.coords.latitude });
        this.centreZoomMap();
      });
    } else {
      throw new Error('Location permission not granted');
    }
  }

  cycleAnimation() {
    Animated.sequence([
      Animated.timing(this.state.blink, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(this.state.blink, {
        toValue: 0,
        duration: 500
      })
    ]).start(() => {
      this.cycleAnimation();
    });
  }

  componentDidMount() {
    this._getPlayerCoords();
    this.cycleAnimation();
  }

  onRegionChange = (region) => {
    const size = parseFloat(((this.props.letter_base_size * 5) / (1200 * region.latitudeDelta)).toFixed(1));

    if (size != this.state.letter_size) {
      this.setState({ letter_size: size });
    }
  };

  onRegionChangeComplete = (region) => {
    changeMapRegionProxy(region);
  }

  metresToDelta = (m) => {
    // convert metres to ~map delta
    const delta = m / (111320 * Math.cos(this.props.map_coordinates.latitude * Math.PI / 180));

    return delta;
  }

  centreMap = () => {
    this._map._component.animateToCoordinate({
      ...this.props.coordinates,
    }, 600
    );
  }

  centreZoomMap = () => {
    this._map._component.animateToRegion({
      ...this.props.coordinates,
      latitudeDelta: this.state.delta_initial,
      longitudeDelta: this.state.delta_initial,
    }, 300);
  }

  onCentreMapButton = () => {
    this._getPlayerCoords();
  }

  mapLettersToMarkers(item, index, blink) {
    const t = new Date().getTime() - new Date(item.created_at).getTime();
    const opacity = Math.max(0, 1 - t / this.props.letter_decay_time);

    return (
      opacity != 0 && this.props.map_coordinates.longitudeDelta <= this.state.delta_max
        ? <MapView.Marker
            key={index}
            coordinate={{ latitude: item.coords.lat, longitude: item.coords.lng }}>
            { !blink
              ? <Text
                  style={[styles.letter, {opacity}, {fontSize: this.state.letter_size}]}>
                  {item.character}
                </Text>
              : <Animated.Text
                  style={[styles.letter, {opacity: this.state.blink}, {fontSize: this.state.letter_size}]}
                  >
                  {item.character}
                </Animated.Text>
            }
          </MapView.Marker>
        : null
    );
  }

  render() {
    // convert letter objects into component array
    const mapLetters = Object.keys(this.props.letters).map((key, index) =>
      this.mapLettersToMarkers(this.props.letters[key], index, false)
    );
    const myLetters = Object.keys(this.props.my_letters).map((key, index) =>
      this.mapLettersToMarkers(this.props.my_letters[key], index, true)
    );

    return (
      <View style={styles.container}>
        <MapView.Animated
          ref={(input) => { this._map = input; }}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.container}
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: this.state.delta_initial,
            longitudeDelta: this.state.delta_initial
          }}
          showsIndoorLevelPicker={false}
          showsIndoors={false}
          rotateEnabled={false}
          minZoomLevel={this.props.min_zoom_level}
          maxZoomLevel={this.props.max_zoom_level}
          customMapStyle={mapstyles}
        >
          { mapLetters }
          { myLetters }
          <MapView.Circle
            center={{
              latitude: this.state.lat,
              longitude: this.state.lng,
            }}
            radius={this.props.dropzone_radius}
            strokeColor={'rgba(255,255,255,0.25)'}
            fillColor={'rgba(255,255,255,0.1)'}
            />

        </MapView.Animated>
        <TouchableOpacity style={styles.button} onPress={this.onCentreMapButton}>
          <Text style={styles.button_text}>
            CENTRE MAP
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const origin_id = state.user.origin_id;
    const letter_decay_time = state.config.config.map_letter_decay_time * 1000;
    const letters = state.letters.content;
    const my_letters = state.myLetters.content;
    const coordinates = state.user.coordinates;
    const map_coordinates = state.user.map.coordinates;
    const dropzone_radius = state.config.config.map_drop_zone_radius;
    const track_player_movements = state.config.config.track_player_movements;
    const letter_base_size = state.config.config.map_letter_base_size;
    const map_delta_initial = state.config.config.map_delta_initial;
    const map_delta_max = state.config.config.map_delta_max;
    const min_zoom_level = state.config.config.map_min_zoom_level;
    const max_zoom_level = state.config.config.map_max_zoom_level;

    return {
      origin_id,
      letters,
      my_letters,
      coordinates,
      map_coordinates,
      dropzone_radius,
      letter_decay_time,
      track_player_movements,
      letter_base_size,
      map_delta_max,
      map_delta_initial,
      min_zoom_level,
      max_zoom_level,
    };
  } catch (e) {
    console.log('Map Error', e);
    throw e;
  }
};

export default connect(mapStateToProps)(Map);
