import React, { Component, PropTypes } from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity, Dimensions } from 'react-native';
//import { StatusBar } from 'react-native';

import { updateLetterMenuProxy, reviveLetterMenuProxy, binLetterProxy, flagLetterForOverwriteProxy } from '../../../helper/userHelper';
import { putLetterOnMapProxy } from '../../../helper/mapHelper';
import { navigateToLetterSelector, navigateToQRCodeGet, navigateToQRCodeSend } from '../../../helper/navigationProxy';
import { postLetterServiceProxy } from '../../../helper/apiProxy';

import { connect } from 'react-redux';
import { connectAlert } from '../../../components/general/Alert';

import styles from './styles';
import styles_menu from '../Overlay/styles';
import { StatusBar } from 'react-native';

class Letter extends Component {
  static propTypes = {
    // props from Map.js
    navigation: PropTypes.object,
    character: PropTypes.string,
    disabled: PropTypes.bool,
    position: PropTypes.object,
    index: PropTypes.number,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,

    // props from connect
    user: PropTypes.object,
    mapLat: PropTypes.number,
    mapLng: PropTypes.number,
    map_delta: PropTypes.number,
    dropzone_radius: PropTypes.number,
    regen_time_primary: PropTypes.number,
    regen_time_secondary: PropTypes.number,
    map_delta_max: PropTypes.number,
    letter_base_size: PropTypes.number
  }

  constructor(props){
      super(props);

      this.state = {
        panning: false,
        position: {x: this.props.position.x, y: this.props.position.y},
        pan: new Animated.ValueXY({x:0, y:0}),
        letter_size: 26,
        offset_bottom: 18,
        animated_letter_size: this.props.letter_base_size * 5,
        delta_max: this.metresToDelta(this.props.dropzone_radius * this.props.map_delta_max),
        status_bar_height: 55 + (StatusBar.currentHeight || 20),
        letter_offset: {
          x: -20,
          y: -40
        },
        font: {
          size: new Animated.Value(0),
          colour: new Animated.Value(0),
          letter_offset: new Animated.Value(0),
        }
      };
      this.panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderStart: (e) => {
            this.setState({panning: true});
            this.animateSelectedFont();
          },
          onPanResponderMove: (e, gesture) => {
            const win = Dimensions.get('window');
            const x = gesture.moveX - this.props.position.x + this.state.letter_offset.x;
            const y = gesture.moveY - (win.height - this.state.offset_bottom) + this.state.letter_offset.y;

            this.animateTranslate(x, y);
          },
          onPanResponderRelease: (e, gesture) => {
            const x = gesture.moveX + styles.$letterWidth / 2 + this.state.letter_offset.x;
            const y = gesture.moveY + this.state.letter_offset.y;

            this.setState({panning: false});
            this.animateResetFont();

            // check if letter is dropped on map area
            if (this.isLetterOverMap(x, y)){
              // check if letter is disabled
              if (!this.props.disabled) {
                // try to place letter on map
                if (this.onDrop(x, y)) {
                  this.animateSnapToStart();
                } else {
                  this.animateSpringToStart();
                }
              } else {
                this.animateSpringToStart();
              }
            } else {
              // if letter is tapped (or dropped in place)
              if (gesture.moveX < 10 && gesture.moveY < 10) {
                // open the relevant screen
                if (this.props.primary) {
                  if (this.props.character === '+') {
                    this.navigateLetterSelector();
                  } else {
                    this.navigateQRCodeSend();
                  }
                } else {
                  this.navigateQRCodeGet();
                }
              }
              // reset
              this.animateSpringToStart();
            }
          }
      });
  }

  // DROP HANDLERS

  isLetterOverMap(x, y) {
    // check if letter is over map
    const check = this.nativeScreenToXY(x, y);

    return (check.y >= -0.5 && check.y <= 0.5);
  }

  onDrop(x, y) {
    // letter on-release event
    // check if user has zoomed out too far
    if (this.props.map_delta > this.state.delta_max) {
      this.props.alertWithType('info', 'Too far away', "Zoom in to the circle place letters!");
      return false;
    }

    // convert native screen to normalised screen
    const screen = this.nativeScreenToXY(x, y);

    // convert screen to world coordinates
    const coords = this.xyToLatLng(screen.x, screen.y);

    // get ~ distance from centre of drop zone
    const distance = this.getDistanceBetweenCoordinates(coords.lat, coords.lng, this.props.user.coordinates.latitude, this.props.user.coordinates.longitude);

    // respond if user missed the zone
    if (distance > this.props.dropzone_radius + 2) {
      this.props.alertWithType('info', 'Too far away', "You cannot write outside the circle around you. Move your body to get closer!");
      return false;
    } else {
      if (this.props.user.map.tutorialState == 'welcome') {
        this.props.alertWithType('info', 'Excellent work!', 'Want to write with different letters? Get letters from your friends by scanning their QR code. Tap the Get Letters below.');
        // todo: change tutorialState
      }
    }

    // send to server
    this.placeLetterOnMap(coords.lat, coords.lng);

    return true;
  }

  // API CALLS & INTERFACE

  placeLetterOnMap(lat, lng) {
    // send to server & put letter in temporary array
    putLetterOnMapProxy(this.props.character, lat, lng);
    updateLetterMenuProxy(this.props.index);
    postLetterServiceProxy(this.props.character, lat, lng);

    // if letter disabled, set timer to re-enable
    if (!this.props.main) {
      let index = this.props.index;
      let char  = this.props.character;

      setTimeout(() => {
        reviveLetterMenuProxy(index, char);
      }, this.props.regen_time_secondary);
    };
  }

  destroyLetter = () => {
    // remove letter from state.user
    binLetterProxy(this.props.index);
  }

  // MATHS

  metresToDelta = (m) => {
    // convert metres to ~ map delta (degrees)
    const delta = m / (111320 * Math.cos(this.props.mapLat * Math.PI / 180));

    return delta;
  }

  nativeScreenToXY(nativeX, nativeY) {
    // convert native screen space to normalised screen space
    // result will be in the range [-0.5, 0.5]
    const win = Dimensions.get('window');
    const x = (nativeX / win.width) - 0.5;
    const y = (((nativeY - this.state.status_bar_height) / (win.height - this.state.status_bar_height - styles_menu.$lettersHeight) - 0.5)) * -1;

    return {x: x, y: y};
  }

  xyToNativeScreen(x, y) {
    // convert normalised screen space to native screen space
    const win = Dimensions.get('window');
    const nativeX = (x + 0.5) * win.width;
    const nativeY = (y * -1) * (win.height - this.state.status_bar_height - styles_menu.$lettersHeight) + this.state.status_bar_height;

    return {x: nativeX, y: nativeY}
  }

  xyToLatLng(x, y) {
    // convert screen space to world coordinates
    // to be on screen, input x, y should be in the range [-0.5, 0.5]
    const c = this.props.user.map.coordinates;
    const lng = c.longitude + x * c.longitudeDelta;
    const lat = c.latitude + y * c.latitudeDelta;

    return {lat: lat, lng: lng};
  }

  latLngToXY(lat, lng) {
    // convert world coordinates to screen space
    // if coordinate is on screen, the return range will be [-0.5, 0.5]
    const c = this.props.user.map.coordinates;
    const x = (lng - c.longitude) / c.longitudeDelta;
    const y = (lat - c.latitude) / c.latitudeDelta;

    return {x: x, y: y};
  }

  getDistanceBetweenCoordinates(lat0, lng0, lat1, lng1) {
    // get ~ distance between coordinates on a smooth sphere
    const dLat = Math.abs(lat1 - lat0) * 111319.9;
    const dLng = Math.abs(lng1 - lng0) * (111319.9 * Math.cos(lat1 * Math.PI / 180.));
    const distance = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLng, 2));

    return distance;
  }

  // ANIMATIONS

  animateTranslate(x, y) {
    // translate the letter
    this.state.pan.setValue({
      x: x,
      y: y
    });
  }

  animateSelectedFont() {
    // change colour & size when letter dragged
    Animated.timing(
      this.state.font.size, {
        toValue: 100,
        duration: 1
      }
    ).start();
    Animated.timing(
      this.state.font.colour, {
        toValue: 100,
        duration: 1
      }
    ).start();
    Animated.timing(
      this.state.font.letter_offset, {
        toValue: 100,
        duration: 1
      }
    ).start();
  }

  animateResetFont() {
    // reset to default font colour/ size
    Animated.timing(
      this.state.font.size, {
        toValue: 0,
        duration: 1
      },
    ).start();
    Animated.timing(
      this.state.font.colour, {
        toValue: 0,
        duration: 1
      },
    ).start();
    Animated.timing(
      this.state.font.letter_offset, {
        toValue: 0,
        duration: 1
      },
    ).start();
  }

  animateSnapToStart() {
    // snap letter to original place (not animated)
    Animated.timing(
      this.state.pan, {
        toValue: {x:0, y:0},
        duration: 1
      },
    ).start();
  }

  animateSpringToStart() {
    // spring letter to its original position (animated)
    Animated.spring(
      this.state.pan,
      {toValue:{x:0,y:0}}
    ).start();
  }

  // NAVIGATION

  navigateLetterSelector = () => {
    // open letter selection screen
    navigateToLetterSelector(this.props);
  }

  navigateQRCodeGet = () => {
    // open QR code scanner
    if (this.props.secondary) {
      flagLetterForOverwriteProxy(this.props.index);
    }
    navigateToQRCodeGet(this.props);
  }

  navigateQRCodeSend = () => {
    // generate a QR code screen
    navigateToQRCodeSend(this.props);
  }

  render() {
    const max_letter_size = parseFloat((this.state.animated_letter_size / (1200 * this.props.map_delta)).toFixed(1));

    // colour animation
    let size = this.state.font.size.interpolate({
      inputRange: [0, 25, 100],
      outputRange: [this.state.letter_size, this.state.animated_letter_size, max_letter_size]
    });
    let colour = this.state.font.colour.interpolate({
      inputRange: [0, 100],
      outputRange: ['rgb(0,0,0)', 'rgb(255,255,255)']
    });
    let pan = this.state.pan.getLayout();

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          styles.letter_view, {
          position: 'absolute',
          left: this.props.position.x,
          bottom: this.state.offset_bottom,
          transform: [{
              translateX: this.state.pan.x
            },{
              translateY: this.state.pan.y
          }]
        }]}>
        <Animated.Text style={[
          styles.letter,
          {
            color: colour,
            fontSize: size,
            opacity: this.props.disabled ? 0.5 : 1
          }
          ]}>
          {this.props.character}
        </Animated.Text>
      </Animated.View>
    );
  }
};

const mapStateToProps = (state) => {
    const user = state.user;
    const mapLat = state.user.map.coordinates.latitude;
    const mapLng = state.user.map.coordinates.longitude;
    const map_delta = state.user.map.coordinates.latitudeDelta;
    const dropzone_radius = state.config.config.map_drop_zone_radius;
    const regen_time_primary = 1000 * state.config.config.map_letter_regeneration_time_primary;
    const regen_time_secondary = 1000 * state.config.config.map_letter_regeneration_time_secondary;
    const map_delta_max = state.config.config.map_delta_max;
    const letter_base_size = state.config.config.map_letter_base_size;

    return ({
      user,
      mapLat,
      mapLng,
      map_delta,
      map_delta_max,
      letter_base_size,
      dropzone_radius,
      regen_time_primary,
      regen_time_secondary,
    });
}

export default connect(mapStateToProps)(connectAlert(Letter));
