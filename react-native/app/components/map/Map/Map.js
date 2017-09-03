import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import Exponent from 'expo';
import { Letter } from '../Letters';
import { LettersMenu } from '../Overlay';
import { styles, mapstyles } from './styles';
import styles_menu from '../Overlay/styles';
import { changeMapRegionProxy, changeMapLayoutProxy, setUserCoordinatesProxy } from '../../../helper/mapHelper';
import { Font } from 'expo';

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
      isFontsReady: false
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
    // blinking animation (link to opacity)
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
    // get the player GPS and begin blinking animation
    this._getPlayerCoords();
    this.cycleAnimation();

    Font.loadAsync({
      impact: require('../../../assets/fonts/impact.ttf'),
    }).then(()=>{
      console.log("font loaded");
      this.setState({ isFontsReady: true });  
    });
    
  }

  onRegionChange = (region) => {
    // placeholder
  };

  onLayout = (event) => {
    let layout = event.nativeEvent.layout;    
    if(this.refs.mapContainer) {
        this.refs.mapContainer.measure( (fx, fy, width, height, px, py) => {
        layout.yOffset = py;
        changeMapLayoutProxy(layout);
      });        
    }

  };

  onRegionChangeComplete = (region) => {
    changeMapRegionProxy(region);
    // recalculate the letter size
    this.setMapLetterSize(region);
  }

  setMapLetterSize = (region) => {
    // rough font size corresponding to world metres
    const size = parseFloat(
      ((this.props.config.map_letter_base_size * 5) / (1200 * region.latitudeDelta)).toFixed(1)
    );

    if (size != this.state.letter_size) {
      this.setState({letter_size: size});
    }
  }

  metresToDelta = (m) => {
    // convert metres to ~map delta
    const delta = m / (111320 * Math.cos(this.props.map.coordinates.latitude * Math.PI / 180));
    return delta;
  }

  centreMap = () => {
    // use inbuilt animation function
    this._map._component.animateToCoordinate({
      ...this.props.user.coordinates,
    }, 600
    );
  }

  centreZoomMap = () => {
    // use inbuilt animation + zoom function
    this._map._component.animateToRegion({
      ...this.props.user.coordinates,
      latitudeDelta: this.state.delta_initial,
      longitudeDelta: this.state.delta_initial,
    }, 300);
  }

  onCentreMapButton = () => {
    // ask the phone for new GPS
    this._getPlayerCoords();
  }

  mapLettersToMarkers(item, index, blink) {
    const t = new Date().getTime() - new Date(item.created_at).getTime();
    const opacity = Math.max(0, 1 - t / (1000 * this.props.config.map_letter_decay_time));

    return (
      opacity != 0 && this.props.map.coordinates.longitudeDelta <= this.state.delta_max && this.state.isFontsReady
        ? <MapView.Marker
            key={index}
            anchor={{x:0.5, y:0.5}}
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

  mapMenuLetters(item, index) {
    const win = Dimensions.get('window');
    const step = win.width / 6;

    if (index == 0) {
      x = step - 20;
    } else {
      x = step * (index + 1);
    }

    return (
      <Letter
        character={item.character}
        position={{x:x, y:0}}
        key={index}
        index={index}
        navigation={this.props.navigation}
        disabled={item.disabled}
        primary={index === 0}
        secondary={index !== 0}
        />
    )
  }

  render() {
    // convert letter objects into component array
    const mapLetters = Object.keys(this.props.letters.content).map((key, index) =>
      this.mapLettersToMarkers(this.props.letters.content[key], index, false)
    );
    const myLetters = Object.keys(this.props.my_letters.content).map((key, index) =>
      this.mapLettersToMarkers(this.props.my_letters.content[key], index, true)
    );
    const menuLetters = [
      this.props.user.primary_letter,
      this.props.user.secondary_letter_1,
      this.props.user.secondary_letter_2,
      this.props.user.secondary_letter_3,
      this.props.user.secondary_letter_4
    ].map((item, index) => this.mapMenuLetters(item, index));

    return (
      <View style={styles.container} ref="mapContainer">
        <MapView.Animated ref="map" onLayout={this.onLayout}
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

        { menuLetters }
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
      my_letters
    };
  } catch (e) {
    console.log('Map Error', e);
    throw e;
  }
};

export default connect(mapStateToProps)(Map);
