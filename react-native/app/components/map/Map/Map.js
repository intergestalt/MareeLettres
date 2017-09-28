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
    isInitialUser: PropTypes.bool,
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
    this.setMapLetterSize = this.setMapLetterSize.bind(this);
    this.hideMap = this.hideMap.bind(this);
    this.showMap = this.showMap.bind(this);

    this.state = {
      lat: this.props.user.coordinates.latitude,
      lng: this.props.user.coordinates.longitude,
      letter_size: 0,
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
      showMap: 1,
      gpsChecked: false,
    };
    this.state.region = this.state.initialRegion;
  }

  componentWillMount() {
    console.log("mounting map...");

    // get the player GPS
    this._getPlayerCoords(()=>{
      this.setState({gpsChecked: true});
      this.pollLetters(true);
    });
  }

  async _getPlayerCoords(callback) {
    const { Location, Permissions } = Exponent;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      Location.getCurrentPositionAsync({ enableHighAccuracy: true }).then((res) => {
        console.log("received player position via GPS");
        setUserCoordinatesProxy(res.coords.latitude, res.coords.longitude);
        this.setState({ lng: res.coords.longitude, lat: res.coords.latitude });
        this.centreZoomMap(); // this sets region
        if(callback) { callback(); }
      }).catch((err)=>{
        console.log(err);
        if(callback) { callback(); }
      });
    } else {
      throw new Error('Location permission not granted');
      if(callback) { callback(); }
    }
  }

  with3Decimals(num) {
    return num.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];
  }

  calculateMapLetterRequest() {
    let centerLat = this.state.region.latitude.toFixed(3);
    let centerLng = this.state.region.longitude.toFixed(3);
    let radiusMeters = getDistanceBetweenCoordinates(
        this.state.region.latitude, 
        this.state.region.longitude, 
        this.state.region.latitude + this.state.region.latitudeDelta, 
        this.state.region.longitude + this.state.region.longitudeDelta);
    radiusMeters = Math.floor(radiusMeters);
    radiusMeters = Math.floor(radiusMeters / 100) * 100;
    if(radiusMeters > 500) {
      radiusMeters = 500;
    }
    
    let interval = Math.floor(Math.sqrt(this.state.pollingCounter));
    if (interval > 10) {
      interval = 10;
    }

    const o = {
      centerLng: centerLng,
      centerLat: centerLat,
      radius: radiusMeters,
      interval: Math.pow(interval, 2),
    };
    return o;
  }

  pollLetters(first = false) {
    console.ignoredYellowBox = ['Setting a timer'];
    this.timerID = setTimeout(() => {
      if (this.props.screen === 'map' && this.props.mode === 'overview') {
        // only call when map is current screen
        console.log("loadLettersIntervalServiceProxy");
        loadLettersIntervalServiceProxy(this.calculateMapLetterRequest());
        this.setState({ pollingCounter: 1 });
      } else {
        this.setState({ pollingCounter: this.state.pollingCounter + 1 }); // this counts missed intervals
      }
      this.pollLetters();
    }, (first ? 0 : this.props.interval));
  }

  componentWillUnmount() {
    console.log("unmounting map...");
    clearTimeout(this.timerID);
  }

  onLayout = (event) => {
    const layout = event.nativeEvent.layout;
    if (this.refs.mapContainer && this.props.mode === 'overview') { // only do this when not in camera mode
      this.refs.mapContainer.measure((fx, fy, width, height, px, py) => {
        layout.yOffset = py;
        this.setState({mapLayout: layout});
        changeMapLayoutProxy(layout);
      });
    }
  };

  onRegionChange = ()=> {
    // this somehow causes the map to snap back and be slow
    /*if(!this.state.dragging) {
      this.setState({dragging: true});
    }*/ 
  };

  onRegionChangeComplete = (region) => {
    console.log("region change complete");
    if(this.state.gpsChecked) {
      changeMapRegionProxy(region); // for use in reducer when new letters arrive
      this.setState({region: region, pollingCounter: 0});
      this.setMapLetterSize(region);

      // poll in a regular rythm, looks better
      /*let timeSinceLastLoad = (new Date().getTime() - this.state.lastLoad);
      if(!this.state.lastLoad || timeSinceLastLoad > 2000) {
        loadLettersServiceProxy(this.calculateMapLetterRequest());
        this.setState({lastLoad: new Date().getTime()});
      }*/   
    } else {
      console.log("rengion changed - ignoring before initial gps check");
    }
  };

  setMapLetterSize = (region) => {
    if(!this.state.mapLayout) {
      return;
    }
    const zoomFactor = (this.state.mapLayout.height / region.latitudeDelta) / 100000; 
    console.log(zoomFactor);
    const size = this.props.config.map_letter_base_size * zoomFactor;

    console.log("setting size of draggable letter to: " + size);
    this.setState({ letter_size: size });
  };

  centreZoomMap = () => {
    // use inbuilt animation + zoom function
    this.setState({
      region: {
        latitude: this.props.user.coordinates.latitude,
        longitude: this.props.user.coordinates.longitude,
        latitudeDelta: this.state.delta_initial,
        longitudeDelta: this.state.delta_initial,
      },
    });
  };

  onCentreMapButton = () => {
    // ask the phone for new GPS
    this._getPlayerCoords();
  };

  // these are the letters placed on the map from server or local storage
  mapLettersToMarkers(item, index, blinking) {
    const t = new Date().getTime() - new Date(item.created_at).getTime();
    const opacity = Math.max(0, 1 - t / (1000 * this.props.config.map_letter_decay_time));

    return opacity != 0 && this.state.letter_size != 0 ? (
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

  // these are the letters dragged onto the map
  initMenuLetter(item, index) {
    const win = Dimensions.get('window');
    const step = (win.width - 1) / 6;

    if (index == 0) {
      x = step - 18 - 20;
    } else {
      x = step * (index + 1.5) - 24 - 20;
    }

    return (
      <Letter
        character={item.character}
        position={{ x, y: 0 }}
        key={index}
        index={index}
        navigation={this.props.navigation}
        disabled={item.disabled}
        primary={index === 0}
        secondary={index !== 0}
        max_letter_size={this.state.letter_size}
        mapLayout={this.state.mapLayout}
      />
    );
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.mode === 'overview';
  }
  hideMap() {
    this.setState({showMap: false});
  }
  showMap() {
    this.setState({showMap: true}); 
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
    if (this.props.isInitialUser) {
      return this.renderNoUser();
    }
    console.log('RENDER MAP with letter size ' + this.state.letter_size);

    // convert letter objects into component arrays

    // allow all user created letters onto map
    const myLetterKeys = Object.keys(this.props.my_letters.content);
    const myLetters = myLetterKeys.map((key, index) =>
      this.mapLettersToMarkers(this.props.my_letters.content[key], index, true),
    );

    // only add markers at all if we are low enough
    const mapLetters = (this.props.map.coordinates.longitudeDelta <= this.state.delta_max) ? 
      Object.keys(this.props.letters.content).map((key) =>
        this.mapLettersToMarkers(
              this.props.letters.content[key],
              this.props.letters.content[key]._id,
              false
        )
      ) : [];

    const menuLetters = [
      this.props.user.primary_letter,
      this.props.user.secondary_letter_1,
      this.props.user.secondary_letter_2,
      this.props.user.secondary_letter_3,
      this.props.user.secondary_letter_4,
    ].map((item, index) => this.initMenuLetter(item, index));

    return (
      <View style={styles.container} ref="mapContainer">
        {!this.state.showMap ? (<View style={styles.mapCurtain}/>):null}
        <MapView
          ref="map"
          onLayout={this.onLayout}
          ref={(input) => {
            this._map = input;
          }}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
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
          loadingEnabled={true}
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

        <CameraButton navigation={this.props.navigation} hideMap={this.hideMap} showMap={this.showMap}/>

        <TouchableOpacity
          style={[styles.button, styles.buttonCentreMap]}
          onPress={this.onCentreMapButton}
        >
          <Image
            style={styles.buttonCentreMapImage}
            source={require('./assets/center.png')}
            resizeMode="contain"
          />
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
    const isInitialUser = state.user.isInitialUser;
    const mode = state.globals.mapView;

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
      isInitialUser,
      isUserLoading,
      mode
    };
  } catch (e) {
    console.log('Map Error', e);
    throw e;
  }
};

export default connect(mapStateToProps)(Map);
