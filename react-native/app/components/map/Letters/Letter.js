import React, { Component, PropTypes } from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity, Dimensions } from 'react-native';
//import { StatusBar } from 'react-native';

import { updateLetterMenuProxy, reviveLetterMenuProxy, binLetterProxy, flagLetterForOverwriteProxy, setUserMapTutorialStatusProxy } from '../../../helper/userHelper';
import { putLetterOnMapProxy, getDistanceBetweenCoordinates, metresToDelta } from '../../../helper/mapHelper';
import { navigateToLetterSelector, navigateToQRCodeGet, navigateToQRCodeSend } from '../../../helper/navigationProxy';
import { postLetterServiceProxy } from '../../../helper/apiProxy';

import { connect } from 'react-redux';
import { connectAlert } from '../../../components/general/Alert';

import styles from './styles';
import styles_menu from '../Overlay/styles';
import { StatusBar } from 'react-native';
import I18n from '../../../i18n/i18n';

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
      layout: null,
      position: {x: this.props.position.x, y: this.props.position.y},
      pan: new Animated.ValueXY({x:0, y:0}),
      letter_size: 26,
      offset_bottom: 38,
      animated_letter_size: this.props.letter_base_size * 5,
      delta_max: metresToDelta(this.props.dropzone_radius * this.props.map_delta_max, this.props.mapLat),
      letter_offset: {
        x: 0,
        y: -50, // to have letter dragged above finger
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
        if(this.props.character !== '+') {
          this.setState({panning: true});
          this.animateSelectedFont();  
        }
      },
      onPanResponderMove: (e, gesture) => {
        if(this.props.character !== '+') {
          this.animateTranslate(gesture.dx, gesture.dy + this.state.letter_offset.y);
        }
      },
      onPanResponderRelease: (e, gesture) => {
        // convert to top/left coordinates relative to map and centered in letter
        const win = Dimensions.get('window');
        let x = gesture.dx + this.props.position.x + (this.state.layout.width / 2);
        let y = gesture.dy + this.state.letter_offset.y + (win.height - this.state.offset_bottom - this.state.layout.height / 2) - this.props.mapLayout.yOffset;

        this.setState({panning: false});
        this.animateResetFont();

        // check if letter is dropped on map area
        if (Math.abs(gesture.dy) > 10) {
          if (this.props.character !== '+') {
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
                this.props.alertWithType('info', 'Not so fast!', "Please wait before using that letter again.");
                return;
            }
          }
        } else {
          // open the relevant screen
          if (this.props.primary) {
            if (this.props.character === '+' || this.primaryLetterExpired()) {
              this.navigateLetterSelector();
            } else {
              this.navigateQRCodeSend();
            }
          } else {
            this.navigateQRCodeGet();
          }
          this.animateSpringToStart();  
        }
      }  
    });
  }

  // DROP HANDLER
  onDrop(mapX, mapY) {
    // letter on-release event
    // check if user has zoomed out too far
    if (this.props.map_delta > this.state.delta_max) {
      this.props.alertWithType('info', I18n.t('map_too_zoom_title'), I18n.t('map_too_zoom_text'));
      return false;
    }

    if (this.props.blockWriting) {
      this.props.alertWithType('info', I18n.t('map_too_crowded_title'), I18n.t('map_too_crowded_text'));
      return false;
    }

    // convert native screen to normalised screen
    console.log("nativeScreenToXY");
    let normalX = (mapX / this.props.mapLayout.width) - 0.5;
    let normalY = (mapY / this.props.mapLayout.height) - 0.5;
    console.log(mapX + ", " + mapY + " -> " + normalX + ", " + normalY);

    // convert normalised screen to world coordinates
    const c = this.props.user.map.coordinates;
    const lng = c.longitude + (normalX * c.longitudeDelta);
    const lat = c.latitude - (normalY * c.latitudeDelta);
    const coords = {lat: lat, lng: lng};
  
    // get ~ distance from centre of drop zone
    const distance = getDistanceBetweenCoordinates(coords.lat, coords.lng, this.props.user.coordinates.latitude, this.props.user.coordinates.longitude);

    // respond if user missed the zone
    if (distance > this.props.dropzone_radius + 2) {
      this.props.alertWithType('info', I18n.t('map_too_far_title'), I18n.t('map_too_far_text'));
      return false;
    }

    // send to server
    this.placeLetterOnMap(coords.lat, coords.lng);

    if (this.props.user.map.tutorialStatus == 'step3') {
        this.props.alertWithType('info', I18n.t('map_tutorial_3_title'), I18n.t('map_tutorial_3_text'));        
        setUserMapTutorialStatusProxy('step4');
    }

    return true;
  }

  onLayout = (event) => {
    //console.log("Letter onLayout");
    //console.log(event.nativeEvent.layout);
    this.setState({layout: event.nativeEvent.layout});
  }

  // API CALLS & INTERFACE

  placeLetterOnMap(lat, lng) {
    // send to server & put letter in temporary array
    putLetterOnMapProxy(this.props.character, lat, lng);
    updateLetterMenuProxy(this.props.index);
    postLetterServiceProxy(this.props.character, lat, lng);

    // if letter disabled, set timer to re-enable
    //if (!this.props.main) {
      let index = this.props.index;
      let char  = this.props.character;

      setTimeout(() => {
        reviveLetterMenuProxy(index, char);
      }, index == 0 ? this.props.regen_time_primary : this.props.regen_time_secondary);
    //};
  }

  destroyLetter = () => {
    // remove letter from state.user
    binLetterProxy(this.props.index);
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
    let newFont = {
      size: 1,
      letter_offset: 100,
      colour: 100
    }
    this.setState({font: newFont});
  }

  animateResetFont() {
    // reset to default font colour/ size
    let newFont = {
      size: 0,
      letter_offset: 0,
      colour: 0
    }
    this.setState({font: newFont});
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

  primaryLetterExpired() {
    //check if primary letter has expired
    let acquired = new Date(this.props.user.primary_letter.acquired_at);
    let now = new Date();
    let difference = (now.getTime() - acquired.getTime()) / (1000 * 60);
    return difference > this.props.map_primary_letter_reset;
  }

  render() {
    I18n.locale = this.props.language;
    let size = this.state.font.size == 1 ? this.props.max_letter_size : this.state.letter_size;
    let colour = this.state.font.colour == 100 ? '#fff' : '#000';
    let pan = this.state.pan.getLayout();
    let expired = this.primaryLetterExpired();

    return (
      <Animated.View onLayout={this.onLayout}
        {...this.panResponder.panHandlers}
        style={[
          this.state.panning ? styles.letter_view_dragged : styles.letter_view, {
          position: 'absolute',
          left: this.props.position.x,
          bottom: this.state.offset_bottom,
          transform: [{
              translateX: this.state.pan.x
            },{
              translateY: this.state.pan.y
          }]
        }]}>
        <Text style={[
          styles.letter,
          {
            color: colour,
            fontSize: size,
            opacity: (this.props.disabled || this.props.character == '+' || expired) ? 0.5 : 1
          }
          ]}>
          {expired ? "+" : this.props.character}
        </Text>
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
    const blockWriting = state.letters.blockWriting;
    const map_primary_letter_reset = state.config.config.map_primary_letter_reset;
    
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
      blockWriting,
      map_primary_letter_reset,
      language: state.globals.language,
    });
}

export default connect(mapStateToProps)(connectAlert(Letter));
