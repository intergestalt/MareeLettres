import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import Exponent from 'expo';
import { Letter } from '../Letters';
import { LettersMenu, CameraButton } from '../Overlay';
import { styles, mapstyles } from './styles';
import styles_menu from '../Overlay/styles';
import {
  changeMapRegionProxy,
  changeMapLayoutProxy,
  setUserCoordinatesProxy,
  getDistanceBetweenCoordinates,
  metresToDelta,
} from '../../../helper/mapHelper';
import {
  loadLettersServiceProxy,
  loadLettersIntervalServiceProxy,
  loadUserServiceProxy,
} from '../../../helper/apiProxy';
import { BlinkText } from './BlinkText';
import I18n from '../../../i18n/i18n';
import { ReloadButton } from '../../../components/general/ReloadButton';

class Map extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    isDefaultUser: PropTypes.bool,
    map: PropTypes.object,
    config: PropTypes.object,
    letters: PropTypes.object,
    my_letters: PropTypes.object,
    language: PropTypes.string,
    isUserLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.handleReloadUserPressPress = this.handleReloadUserPressPress.bind(this);

    this.state = {
      lat: this.props.user.coordinates.latitude,
      lng: this.props.user.coordinates.longitude,
      letter_size: 12,
      delta_initial: metresToDelta(
        this.props.config.map_drop_zone_radius * this.props.config.map_delta_initial,
        this.props.map.coordinates.latitude,
      ),
      delta_max: metresToDelta(
        this.props.config.map_drop_zone_radius * this.props.config.map_delta_max,
        this.props.map.coordinates.latitude,
      ),
      isFontsReady: false,
      initialRegion: {
        latitude: this.props.user.map.coordinates.latitude,
        longitude: this.props.user.map.coordinates.longitude,
        latitudeDelta: this.props.user.map.coordinates.latitudeDelta,
        longitudeDelta: this.props.user.map.coordinates.longitudeDelta,
      },
      pollingCounter: 0,
    };
    this.state.region = this.state.initialRegion;
  }

  async _getPlayerCoords() {
    const { Location, Permissions } = Exponent;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      Location.getCurrentPositionAsync({ enableHighAccuracy: true }).then((res) => {
        setUserCoordinatesProxy(res.coords.latitude, res.coords.longitude);
        this.setState({ lng: res.coords.longitude, lat: res.coords.latitude });
        this.centreZoomMap();
      });
    } else {
      throw new Error('Location permission not granted');
    }
  }

  with3Decimals(num) {
    return num.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];
  }

  calculateMapLetterRequest() {
    console.log(this.props.map.coordinates);
    const centerLat = this.with3Decimals(this.props.map.coordinates.latitude);
    const centerLng = this.with3Decimals(this.props.map.coordinates.longitude);
    // console.log(this.props.map.coordinates.latitudeDelta);
    let delta = this.props.map.coordinates.latitudeDelta;
    let radius = 1;
    if (delta >= 0.002 && delta < 0.003) {
      radius = 2;
    }
    if (delta >= 0.003 && delta < 0.004) {
      radius = 3;
    }
    if (delta >= 0.004) {
      radius = 4;
    }
    const radiusMeters = Math.floor((radius * 0.001) * 40008000 / 360); // rough estimation

    let interval = Math.floor(Math.sqrt(this.state.pollingCounter));
    if (interval > 10) {
      interval = 10;
    }

    const o = {
      centerLng,
      centerLat,
      radius: radiusMeters,
      interval: Math.pow(interval + 1, 2),
    };
    // console.log(o);
    return o;
  }

  componentWillMount() {
    // get the player GPS
    this._getPlayerCoords();

    loadLettersServiceProxy(this.calculateMapLetterRequest());
    this.pollLetters();

    this.setMapLetterSize(this.state.initialRegion);
  }

  pollLetters() {
    console.ignoredYellowBox = ['Setting a timer'];
    this.timerID = setTimeout(() => {
      if (this.props.screen === 'map') {
        // only call when map is current screen
        loadLettersIntervalServiceProxy(this.calculateMapLetterRequest());
        this.setState({ pollingCounter: 0 });
      } else {
        this.setState({ pollingCounter: this.state.pollingCounter + 1 }); // this counts missed intervals
      }
      this.pollLetters();
    }, this.props.interval);
  }

  onLayout = (event) => {
    const layout = event.nativeEvent.layout;
    if (this.refs.mapContainer) {
      this.refs.mapContainer.measure((fx, fy, width, height, px, py) => {
        layout.yOffset = py;
        changeMapLayoutProxy(layout);
      });
    }
  };

  onRegionChangeComplete = (region) => {
    this.setState({ region });
    changeMapRegionProxy(region);
    this.setMapLetterSize(region);

    loadLettersServiceProxy(this.calculateMapLetterRequest());
    this.setState({ pollingCounter: 0 });

    /*if (JSON.stringify(region) !== JSON.stringify(this.props.map.coordinates)) {
      // console.log("region changed");
      // console.log(this.props.map.coordinates)
      // console.log(region);
      changeMapRegionProxy(region);
      // recalculate the letter size
      this.setMapLetterSize(region);
    }*/

  };

  onRegionChange = (region) => {
    this.setState({ region });
    //this.setMapLetterSize(region);
  };

  setMapLetterSize = (region) => {
    // rough font size corresponding to world metres
    const size = parseFloat(
      (this.props.config.map_letter_base_size * 5 / (1200 * region.latitudeDelta)).toFixed(1),
    );

    if (size != this.state.letter_size) {
      this.setState({ letter_size: size });
    }
  };

  centreZoomMap = () => {
    // use inbuilt animation + zoom function
    this.setState({
      region: {
        latitude: this.props.user.coordinates.latitude,
        longitude: this.props.user.coordinates.longitude,
        latitudeDelta: this.state.delta_initial,
        longitudeDelta: this.state.delta_initial,
      }
    }
    );
    /*this._map._component.animateToRegion(
      {
        ...this.props.user.coordinates,
        latitudeDelta: this.state.delta_initial,
        longitudeDelta: this.state.delta_initial,
      },
      300,
    );*/
  };

  onCentreMapButton = () => {
    // ask the phone for new GPS
    this._getPlayerCoords();
  };

  mapLettersToMarkers(item, index, blinking) {
    const t = new Date().getTime() - new Date(item.created_at).getTime();
    const opacity = Math.max(0, 1 - t / (1000 * this.props.config.map_letter_decay_time));

    return opacity != 0 ? (
      <MapView.Marker
        key={index}
        anchor={{ x: 0.5, y: 0.5 }}
        coordinate={{ latitude: item.coords.lat, longitude: item.coords.lng }}
      >
        <BlinkText
          blinking={blinking}
          style={[styles.letter, { opacity }, { fontSize: this.state.letter_size }]}
          text={item.character}
        />
      </MapView.Marker>
    ) : null;
  }

  mapMenuLetters(item, index) {
    const win = Dimensions.get('window');
    const step = (win.width - 1) / 6;

    if (index == 0) {
      x = step - 18;
    } else {
      x = step * (index + 1.5) - 24;
    }

    return (
      <Letter
        character={item.character}
        position={{ x: x, y: 0 }}
        key={index}
        index={index}
        navigation={this.props.navigation}
        disabled={item.disabled}
        primary={index === 0}
        secondary={index !== 0}
      />
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    // todo: only update map when it needs to be updated
    return true;
  }
  handleReloadUserPressPress = () => {
    loadUserServiceProxy(true);
  };
  renderNoUser() {
    return (
      <View style={styles.container}>
        <ReloadButton textKey="reload_user" onReload={this.handleReloadUserPressPress} />
      </View>
    );
  }
  renderIsLoading() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  render() {
    I18n.locale = this.props.language;
    if (this.props.isUserLoading) {
      return this.renderIsLoading();
    }
    if (this.props.isDefaultUser) {
      return this.renderNoUser();
    }
    console.log('RENDER MAP');

    // convert letter objects into component arrays

    // allow all user created letters onto map
    const myLetterKeys = Object.keys(this.props.my_letters.content);
    const myLetters = myLetterKeys.map((key, index) =>
      this.mapLettersToMarkers(this.props.my_letters.content[key], index, true),
    );

    const mapLetters = [];
    if (this.props.map.coordinates.longitudeDelta <= this.state.delta_max) {
      // only add markers at all if we are low enough
      Object.keys(this.props.letters.content).forEach((key) => {
        if (this.props.letters.content[key].showAsMarker) {
          // this is set in letters reducer!
          mapLetters.push(
            this.mapLettersToMarkers(
              this.props.letters.content[key],
              this.props.letters.content[key]._id,
              false,
            ),
          );
        }
      });
    }

    const menuLetters = [
      this.props.user.primary_letter,
      this.props.user.secondary_letter_1,
      this.props.user.secondary_letter_2,
      this.props.user.secondary_letter_3,
      this.props.user.secondary_letter_4,
    ].map((item, index) => this.mapMenuLetters(item, index));

    return (
      <View style={styles.container} ref="mapContainer">
        <MapView
          ref="map"
          onLayout={this.onLayout}
          ref={(input) => {
            this._map = input;
          }}

          onRegionChangeComplete={this.onRegionChangeComplete}
          onRegionChange={this.onRegionChange}
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.container}

          initialRegion={this.state.initialRegion}
          region={this.state.region}

          minZoomLevel={this.props.config.map_min_zoom_level}
          maxZoomLevel={this.props.config.map_max_zoom_level}
          customMapStyle={mapstyles}
          showsIndoorLevelPicker={false}
          showsIndoors={false}
          rotateEnabled={false}
        >
          {myLetters}
          {mapLetters}

          <MapView.Circle
            center={{ latitude: this.state.lat, longitude: this.state.lng }}
            radius={this.props.config.map_drop_zone_radius}
            strokeColor={styles.$drop_zone_border}
            strokeWidth={3}
            lineDashPattern={[1, 1]}
            zIndex={2}
          />
        </MapView>

        <CameraButton navigation={this.props.navigation} />

        <TouchableOpacity
          style={[styles.button, styles.buttonCentreMap]}
          onPress={this.onCentreMapButton}
        >
          <Image style={styles.buttonCentreMapImage} source={require('./assets/center.png')} resizeMode="contain" />
        </TouchableOpacity>
        <LettersMenu navigation={this.props.navigation} />

        {menuLetters}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const isUserLoading = state.user.isLoading;
    const interval = state.config.config.map_update_interval * 1000;
    const user = state.user;
    const map = state.user.map;
    const config = state.config.config;
    const letters = state.letters;
    const my_letters = state.myLetters;
    const isDefaultUser = state.user.isDefaultUser;

    if (!map.coordinates.latitude) map.coordinates.latitude = config.map_default_center_lat;
    if (!map.coordinates.longitude) map.coordinates.longitude = config.map_default_center_lng;

    if (!user.coordinates.latitude) user.coordinates.latitude = config.map_default_center_lat;
    if (!user.coordinates.longitude) user.coordinates.longitude = config.map_default_center_lng;

    return {
      interval,
      user,
      map,
      config,
      letters,
      my_letters,
      language: state.globals.language,
      screen: state.globals.screen,
      isDefaultUser,
      isUserLoading,
    };
  } catch (e) {
    console.log('Map Error', e);
    throw e;
  }
};

export default connect(mapStateToProps)(Map);
