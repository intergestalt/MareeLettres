import React, { Component, PropTypes } from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity, Dimensions } from 'react-native';
//import { StatusBar } from 'react-native';

import { updateLetterMenuProxy, reviveLetterMenuProxy, binLetterProxy } from '../../../helper/userHelper';
import { putLetterOnMapProxy } from '../../../helper/mapHelper';
import { navigateToLetterSelector, navigateToQRCodeGet, navigateToQRCodeSend } from '../../../helper/navigationProxy';
import { postLetterServiceProxy } from '../../../helper/apiProxy';

import { connect } from 'react-redux';
import { connectAlert } from '../../../components/general/Alert';

import styles from './styles';
import styles_menu from '../Overlay/styles';

class Letter extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    character: PropTypes.string,
    selected: PropTypes.bool,
    id: PropTypes.string,
    main: PropTypes.bool,
    index: PropTypes.number,
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
          pan: new Animated.ValueXY(),
          letter_size: 26,
          animated_letter_size: this.props.letter_base_size * 5,
          delta_max: this.metresToDelta(this.props.dropzone_radius * this.props.map_delta_max),
          letter_offset: 50,
          font: {
            size: new Animated.Value(0),
            colour: new Animated.Value(0),
            letter_offset: new Animated.Value(0),
          }
      };
      this.panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderStart: () => {
            this.selectedFont();
          },
          onPanResponderMove: Animated.event([
            null, {
              dx: this.state.pan.x,
              dy: this.state.pan.y
            }
          ]),
          onPanResponderRelease: (e, gesture) => {
            this.resetFont();
            if (this.isLetterOverMap(gesture)){
              if (!this.props.selected) {
                if (this.onDrop(gesture.moveX, gesture.moveY)) {
                  this.snapToStart();
                } else {
                  this.springToStart();
                }
              } else {
                this.springToStart();
              }
            } else {
              if (gesture.moveX < 10 && gesture.moveY < 10) {
                if (this.props.main) {
                  this.openQRCodeSend();
                } else {
                  this.openQRCodeGet();
                }
              }
              this.springToStart();
            }
          }
      });
  }

  selectedFont() {
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

  resetFont() {
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

  snapToStart() {
    Animated.timing(
      this.state.pan, {
        toValue: {x:0, y:0},
        duration: 1
      },
    ).start();
  }

  springToStart() {
    Animated.spring(
      this.state.pan,
      {toValue:{x:0,y:0}}
    ).start();
  }

  metresToDelta = (m) => {
    // convert metres to ~map delta
    const delta = m / (111320 * Math.cos(this.props.mapLat * Math.PI / 180));

    return delta;
  }

  isLetterOverMap(gesture) {
    const y = gesture.moveY;
    const x = gesture.moveX;

    if (x == 0 && y == 0) {
      return false;
    } else if (y < (Dimensions.get('window').height - styles_menu.$lettersHeight - 20)) {
      return true;
    } else {
      return false;
    }
  }

  onDrop(x, y) {
    //TODO: remove x,y and add draggable coordinate for better accuracy
    y -= this.state.letter_offset / 3;
    x -= 6;

    if (this.props.map_delta > this.state.delta_max) {
      this.props.alertWithType('info', 'Too far away', "Zoom in to the circle place letters!");
      return false;
    }

    // heights TODO replace 60 with $tabBarHeight or something
    const barHeight = 60; //(StatusBar.currentHeight || 20) + 60;
    const menuHeight = styles_menu.$lettersHeight;

    // convert screen coordinates to range [-1, 1]
    const win = Dimensions.get('window');
    const tx = ((x / win.width) - 0.5) * 1;
    const ty = (((y - barHeight) / (win.height - barHeight - menuHeight) - 0.5)) * -1;

    // convert screen coordinates to map coordinates lat/lng
    const user = this.props.user;
    const c = user.map.coordinates;
    const lat = c.latitude + ty * c.latitudeDelta;
    const lng = c.longitude + tx * c.longitudeDelta;

    // check if inside dropzone, return if not
    const dz = user.coordinates;
    const dLat = Math.abs(dz.latitude - lat) * 111319.9;
    const dLng = Math.abs(dz.longitude - lng) * (111319.9 * Math.cos(dz.latitude * Math.PI / 180.));
    const distance = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLng, 2));

    console.log("on drop");
    if (distance > this.props.dropzone_radius) {
      this.props.alertWithType('info', 'Too far away', "You cannot write outside the circle around you. Move your body to get closer!");
      return false;
    } else {
      if(user.map.tutorialState == 'welcome') {
        this.props.alertWithType('info', 'Excellent work!', 'Want to write with different letters? Get letters from your friends by scanning their QR code. Tap the Get Letters below.');
        // todo: change tutorialState
      }

    }
    // put letter on local map & send to server
    putLetterOnMapProxy(this.props.character, lat, lng);
    updateLetterMenuProxy(this.props.index);
    postLetterServiceProxy(this.props.character, lat, lng);

    // set a timer to re-activate letter
    if (!this.props.main) {
      let index = this.props.index;
      let char  = this.props.character;

      setTimeout(() => {
        reviveLetterMenuProxy(index, char);
      }, this.props.regen_time_secondary);
    };

    return true;
  }

  destroyLetter = () => {
    binLetterProxy(this.props.index);
  }

  isLetterOverBin(gesture) {
    return false;

    const y = gesture.moveY;
    if (!this.props.main) {
      let win = Dimensions.get('window');
      if (gesture.moveY > win.height - 60 && gesture.moveX > win.width * 0.66) {
        return true;
      }
    }

    return false;
  }

  onPress = () => {
    navigateToLetterSelector(this.props);
  }

  openQRCodeGet = () => {
    navigateToQRCodeGet(this.props);
  }

  openQRCodeSend = () => {
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
    let offset = this.state.font.letter_offset.interpolate({
      inputRange: [0, 100],
      outputRange: [0, this.state.letter_offset]
    });

    if (this.props.main) {
      return this.renderYou(size, colour, pan, offset);
    } else {
      return this.renderFriends(size, colour, pan, offset);
    }
  }

  renderYou(size, colour, pan, offset) {
    return (
      <View style = {styles.container_main}>
        {
          this.props.character === '+'
            ? <TouchableOpacity
                onPress={this.onPress}
                style={styles.letter_area}>
                <Text style={styles.disabled}>
                  {'+'}
                </Text>
              </TouchableOpacity>
            : <Animated.View
                {...this.panResponder.panHandlers}
                style = {[
                  pan,
                  styles.letter_area,
                ]}>
                  <Animated.Text style={[
                      styles.letter, {
                        color: colour,
                        fontSize: size,
                        marginBottom: offset,
                      }
                    ]}>
                    {this.props.character}
                  </Animated.Text>
              </Animated.View>
          }
      </View>
    );
  }

  renderFriends(size, colour, pan, offset) {
    if (this.props.index == -1) {
      return (
        <View style = {styles.container_secondary}>
          <TouchableOpacity
            onPress={this.openQRCodeGet}
            style={styles.letter_area}>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style = {[
          styles.container_secondary,
        ]}>
            <Animated.View
              {...this.panResponder.panHandlers}
              style = {[
                pan,
                styles.letter_area,
              ]}>
                <Animated.Text style={[
                  this.props.selected
                    ? styles.disabled
                    : styles.letter
                  , {
                    color: colour,
                    fontSize: size,
                    marginBottom: offset,
                  }
                ]}>
                  {this.props.character}
                </Animated.Text>
            </Animated.View>
        </View>
      );
    }
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

    // TODO get from config
    const map_delta_max = state.config.config.map_delta_max || 10;
    const letter_base_size = state.config.config.map_letter_base_size || 5;

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
