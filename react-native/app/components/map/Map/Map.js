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
    letters: PropTypes.array,
    my_letters: PropTypes.array,
    dropzone_radius: PropTypes.number,
    coordinates: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      lat: this.props.coordinates.latitude,
      lng: this.props.coordinates.longitude,
      set: false,
    };
  }

  async _getPlayerCoords() {
    const {Location, Permissions} = Exponent;
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      Location.getCurrentPositionAsync().then((res) => {
        //res.coords.latitude = 52.49330866968013;
        //res.coords.longitude = 13.436372637748718;
        setUserCoordinatesProxy(res.coords.latitude, res.coords.longitude);

        if (!this.state.set) {
          // go to my coordinates once
          this._map._component.animateToCoordinate({
              latitude: res.coords.latitude,
              longitude: res.coords.longitude,
            }, 1
          );
        }
        this.setState({lng: res.coords.longitude, lat: res.coords.latitude, set: true});
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
        ...this.props.coordinates
      }, 300
    );
  }

  render() {
    console.log('MAP RENDERED');

    const myLetters = this.props.my_letters.map((item, i) => {
      const t = new Date().getTime() - new Date(item.last_used_at).getTime();
      const opacity = Math.max(0.25, 1 - t / 60000);

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
    });
    const mapLetters = this.props.letters.map((item, i) => {
      return (
        <MapView.Marker
          key={i}
          coordinate={{
            latitude: item.coords.lat,
            longitude: item.coords.lng,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
          }}
        >
          <Text style={styles.letter}>
            {item.character}
          </Text>
        </MapView.Marker>
      );
    })

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
            latitudeDelta: this.props.coordinates.latitudeDelta,
            longitudeDelta: this.props.coordinates.longitudeDelta,
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
