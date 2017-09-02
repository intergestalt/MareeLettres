import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { changeMapRegionProxy, setUserCoordinatesProxy } from '../../../helper/mapHelper';
import { connect } from 'react-redux';
import { styles, mapstyles } from './styles';
import Exponent from 'expo';
import { LettersMenu } from '../Overlay';
import styles_menu from '../Overlay/styles';

class Map extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    map: PropTypes.object,
    config: PropTypes.object,
    letters: PropTypes.object,
    my_letters: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      lat: this.props.user.coordinates.latitude,
      lng: this.props.user.coordinates.longitude,
      letter_size: 12,
      delta_initial: this.metresToDelta(this.props.config.map_drop_zone_radius * this.props.config.map_delta_initial),
      delta_max: this.metresToDelta(this.props.config.map_drop_zone_radius * this.props.config.map_delta_max),
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
        this.setState({lng: res.coords.longitude, lat: res.coords.latitude});
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

  };

  onRegionChangeComplete = (region) => {
    changeMapRegionProxy(region);
    this.setMapLetterSize(region);
  }

  setMapLetterSize = (region) => {
    const size = parseFloat(
      ((this.props.config.map_letter_base_size * 5) / (1200 * region.latitudeDelta)).toFixed(1)
    );

    if (size != this.state.letter_size) {
      this.setState({ letter_size: size });
    }
  }

  metresToDelta = (m) => {
    // convert metres to ~map delta
    const delta = m / (111320 * Math.cos(this.props.map.coordinates.latitude * Math.PI / 180));

    return delta;
  }

  centreMap = () => {
    this._map._component.animateToCoordinate({
      ...this.props.user.coordinates,
    }, 600
    );
  }

  centreZoomMap = () => {
    this._map._component.animateToRegion({
      ...this.props.user.coordinates,
      latitudeDelta: this.state.delta_initial,
      longitudeDelta: this.state.delta_initial,
    }, 300);
  }

  onCentreMapButton = () => {
    this._getPlayerCoords();
  }

  mapLettersToMarkers(item, index, blink) {
    const t = new Date().getTime() - new Date(item.created_at).getTime();
    const opacity = Math.max(0, 1 - t / (1000 * this.props.config.map_letter_decay_time));

    return (
      opacity != 0 && this.props.map.coordinates.longitudeDelta <= this.state.delta_max
        ? <MapView.Marker
            key={index}
            coordinate={{latitude: item.coords.lat, longitude: item.coords.lng}}>
            {!blink
              ? <Text style={[styles.letter, {opacity}, {fontSize: this.state.letter_size}]}>
                  {item.character}
                </Text>
              : <Animated.Text style={[styles.letter, {opacity: this.state.blink}, {fontSize: this.state.letter_size}]}>
                  {item.character}
                </Animated.Text>
            }
          </MapView.Marker>
        : null
    );
  }

  getProxyMapLetter() {
    if (this.props.map.proxy_letter.x == 0) {
      return (
        <MapView.Marker
          coordinate={{latitude: this.props.user.coordinates.latitude, longitude: this.props.user.coordinates.longitude}}>
          <Text style={[{opacity: 0}]}>
            {char}
          </Text>
        </MapView.Marker>
      );
    }

    const x = this.props.map.proxy_letter.x;
    const y = this.props.map.proxy_letter.y;
    const char = this.props.map.proxy_letter.character;
    const status_bar_height = 60;

    // convert screen coordinates to range [-1, 1]
    const win = Dimensions.get('window');
    const tx = ((x / win.width) - 0.5) * 1;
    const ty = ((y / (win.height - status_bar_height - styles_menu.$lettersHeight) - 0.5)) * -1;

    // convert screen coordinates to map coordinates lat/lng
    const c = this.props.map.coordinates;
    const lat = c.latitude + ty * c.latitudeDelta;
    const lng = c.longitude + tx * c.longitudeDelta;

    return (
      <MapView.Marker
        coordinate={{latitude: lat, longitude: lng}}>
        <Animated.Text style={[styles.letter, {opacity: this.state.blink}, {fontSize: this.state.letter_size}]}>
          {char}
        </Animated.Text>
      </MapView.Marker>
    )
  }

  /*
  getProxyLetter() {
    return (
      <Text style={[
        styles.proxy_letter, {
          fontSize: this.state.letter_size,
          left: this.props.map.proxy_letter.x,
          top: this.props.map.proxy_letter.y,
        }]} >
        { this.props.map.proxy_letter.character }
      </Text>
    )
  }
  */

  render() {
    // convert letter objects into component array
    const mapLetters = Object.keys(this.props.letters.content).map((key, index) =>
      this.mapLettersToMarkers(this.props.letters.content[key], index, false)
    );
    const myLetters = Object.keys(this.props.my_letters.content).map((key, index) =>
      this.mapLettersToMarkers(this.props.my_letters.content[key], index, true)
    );
    //const proxyLetter = this.getProxyLetter();
    const proxyMapLetter = this.getProxyMapLetter();

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
          minZoomLevel={this.props.config.map_min_zoom_level}
          maxZoomLevel={this.props.config.map_max_zoom_level}
          customMapStyle={mapstyles}
          showsIndoorLevelPicker={false}
          showsIndoors={false}
          rotateEnabled={false}
        >
          { mapLetters }
          { myLetters }
          { proxyMapLetter }

          <MapView.Circle
            center={{latitude: this.state.lat, longitude: this.state.lng}}
            radius={this.props.config.map_drop_zone_radius}
            strokeColor={styles.$drop_zone_border}
            fillColor={styles.$drop_zone_background}
            />

        </MapView.Animated>
        <TouchableOpacity style={styles.button} onPress={this.onCentreMapButton}>
          <Text style={styles.button_text}>
            CENTRE MAP
          </Text>
        </TouchableOpacity>

        <LettersMenu navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const user = state.user;
    const map = state.user.map;
    const config = state.config.config;
    const letters = state.letters;
    const my_letters = state.myLetters;

    return {
      user,
      map,
      config,
      letters,
      my_letters,
    };
  } catch (e) {
    console.log('Map Error', e);
    throw e;
  }
};

export default connect(mapStateToProps)(Map);
