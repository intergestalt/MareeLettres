import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { changeMapRegionProxy, setUserCoordinatesProxy } from '../../../helper/mapHelper';
import { connect } from 'react-redux';
import { styles, mapstyles } from './styles';
import Exponent from 'expo';

class Map extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    origin_id: PropTypes.string,
    letters: PropTypes.object,
    my_letters: PropTypes.object,
    dropzone_radius: PropTypes.number,
    coordinates: PropTypes.object,
    letter_decay_time: PropTypes.number,
    initial_delta: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      lat: this.props.coordinates.latitude,
      lng: this.props.coordinates.longitude,
      centreOnce: false,
    };
  }

  async _getPlayerCoords() {
    const {Location, Permissions} = Exponent;
    const {status} = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      Location.getCurrentPositionAsync().then((res) => {
        res.coords.latitude = 52.49330866968013;
        res.coords.longitude = 13.436372637748718;

        setUserCoordinatesProxy(res.coords.latitude, res.coords.longitude);
        this.setState({lng: res.coords.longitude, lat: res.coords.latitude});

        if (!this.state.centreOnce) {
          this.centreMap();
          this.setState({centreOnce: true});
        }
      });
    } else {
      throw new Error('Location permission not granted');
    }
  }

  componentDidMount() {
    this._getPlayerCoords();
  }

  onPress = (e) => {
    // const region = e.nativeEvent;
  };

  onRegionChange = (region) => {
    // on map drag
  };

  onRegionChangeComplete = (region) => {
    changeMapRegionProxy(region);
  };

  centreMap = () => {
    this._map._component.animateToRegion({
        ...this.props.coordinates,
        latitudeDelta: this.props.initial_delta,
        longitudeDelta: this.props.initial_delta,
      }, 300
    );
  }

  mapLettersToMarkers(item, index) {
    const t = new Date().getTime() - new Date(item.created_at).getTime();
    const opacity = Math.max(0.25, 1 - t / this.props.letter_decay_time);

    return (
      <MapView.Marker key={index}
        coordinate={{ latitude: item.coords.lat, longitude: item.coords.lng }}>
        <Text style={[styles.letter, { opacity }]}>
          {item.character}
        </Text>
      </MapView.Marker>
    );
  }

  render() {
    // convert letter objects into component array
    const mapLetters = Object.keys(this.props.letters).map((key, index) =>
      this.mapLettersToMarkers(this.props.letters[key], index)
    );
    const myLetters = Object.keys(this.props.my_letters).map((key, index) =>
      this.mapLettersToMarkers(this.props.my_letters[key], index)
    );

    return (
      <View style={styles.container}>
        <MapView.Animated
          ref={(input) => { this._map = input; }}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          onPress={this.onPress}
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.container}
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: this.props.initial_delta,
            longitudeDelta: this.props.initial_delta,
          }}
          rotateEnabled={false}
          customMapStyle={mapstyles}
        >

          { mapLetters }
          { myLetters }

          <MapView.Circle
            center={{
              latitude: this.state.lat,
              longitude: this.state.lng
            }}
            radius={1}
            strokeColor={'#fff'}
            />
          <MapView.Circle
            center={{
              latitude: this.state.lat,
              longitude: this.state.lng,
            }}
            radius={this.props.dropzone_radius}
            strokeColor={'rgba(255,255,255,0.25)'}
            fillColor={'rgba(255,255,255,0.1)'} />
          <MapView.Marker
            title={'drop_zone'}
            coordinate={{
              latitude: this.state.lat + 0.00005,
              longitude: this.state.lng,
            }} >
            <Text style={styles.letter_dropzone}>Drop Zone</Text>
          </MapView.Marker>

        </MapView.Animated>
        <TouchableOpacity onPress={this.centreMap}>
          <Text style={styles.button}>
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
    const letter_decay_time = state.config.config.map_letter_decay_time * 60000;
    const letters = state.letters.content;
    const my_letters = state.myLetters.content;
    const coordinates = state.user.coordinates;
    const dropzone_radius = state.config.config.map_drop_zone_radius;
    const initial_delta = dropzone_radius / 30000;

    return {
      origin_id,
      letters,
      my_letters,
      coordinates,
      dropzone_radius,
      letter_decay_time,
      initial_delta,
    };
  } catch (e) {
    console.log('Map');
    console.log(e); throw e;
  }
};

export default connect(mapStateToProps)(Map);
