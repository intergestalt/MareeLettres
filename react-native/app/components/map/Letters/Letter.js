import React, { Component, PropTypes } from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity, Dimensions } from 'react-native';

import { updateLetterMenuProxy, reviveLetterMenuProxy, binLetterProxy } from '../../../helper/userHelper';
import { putLetterOnMapProxy } from '../../../helper/mapHelper';
import { navigateToLetterSelector } from '../../../helper/navigationProxy';
import { postLetterServiceProxy } from '../../../helper/apiProxy';

import { connect } from 'react-redux';

import styles from './styles';

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
    dropzone_radius: PropTypes.number,
    regen_time_primary: PropTypes.number,
    regen_time_secondary: PropTypes.number,
  }

  constructor(props){
      super(props);

      this.state = {
          pan: new Animated.ValueXY(),
          font: {
            size: new Animated.Value(0),
            colour: new Animated.Value(0),
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
            } else if (this.isLetterOverBin(gesture)) {
              this.snapToStart();
              this.destroyLetter();
            } else {
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

  onDrop(x, y) {
    // convert screen coordinates to range [-1, 1]
    const win = Dimensions.get('window');
    const tx = ((x / win.width) - 0.5) * 1;
    const ty = (((y - 60) / (win.height - 230) - 0.5)) * -1;

    // convert screen coordinates to map coordinates lat/lng
    const user = this.props.user;
    const c = user.map.coordinates;
    const lat = c.latitude + ty * c.latitudeDelta;
    const lng = c.longitude + tx * c.longitudeDelta;

    // check if inside dropzone, return if not
    const dz = user.coordinates;
    const dLat = Math.abs(dz.latitude - lat) * 111320;
    const dLng = Math.abs(dz.longitude - lng) * (111320 * Math.cos(dz.latitude * Math.PI / 180.));
    const distance = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLng, 2));

    if (distance > this.props.dropzone_radius) {
      return false;
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
    if (!this.props.main) {
      let win = Dimensions.get('window');
      if (gesture.moveY > win.height - 60 && gesture.moveX > win.width * 0.66) {
        return true;
      }
    }

    return false;
  }

  isLetterOverMap(gesture) {
    if (gesture.moveY < Dimensions.get('window').height - 170) {
      return true;
    } else {
      return false;
    }
  }

  onPress = () => {
    navigateToLetterSelector(this.props);
  }

  render() {
    // colour animation
    let size = this.state.font.size.interpolate({
      inputRange: [0, 100],
      outputRange: [26, 36]
    });
    let colour = this.state.font.colour.interpolate({
      inputRange: [0, 100],
      outputRange: ['rgb(0,0,0)', 'rgb(255,255,255)']
    });

    if (this.props.main) {
      return this.renderYou(size, colour);
    } else {
      return this.renderFriends(size, colour);
    }
  }

  renderYou(size, colour) {
    return (
      <View style = {styles.background_main}>
        {
          this.props.character === '...'
            ? <TouchableOpacity
                onPress={this.onPress}
                style={styles.letter_area}>
                <Text style={styles.disabled}>
                  {'...'}
                </Text>
              </TouchableOpacity>
            : <Animated.View
                {...this.panResponder.panHandlers}
                style = {[
                  this.state.pan.getLayout(),
                  styles.letter_area,
                ]}>
                  <Animated.Text style={[
                      styles.letter, {
                        color: colour,
                        fontSize: size,
                      }
                    ]}>
                    {this.props.character}
                  </Animated.Text>
              </Animated.View>
          }
      </View>
    );
  }

  renderFriends(size, colour) {
    if (this.props.index == -1) {
      return (
        <View style = {styles.background_secondary} />
      );
    } else {
      return (
        <View style = {styles.background_secondary}>
            <Animated.View
              {...this.panResponder.panHandlers}
              style = {[
                this.state.pan.getLayout(),
                styles.letter_area,
              ]}>
                <Animated.Text style={[
                  this.props.selected
                    ? styles.disabled
                    : styles.letter, {
                    color: colour,
                    fontSize: size,
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
    const dropzone_radius = state.config.config.map_drop_zone_radius;
    const regen_time_primary = 1000 * state.config.config.map_letter_regeneration_time_primary;
    const regen_time_secondary = 1000 * state.config.config.map_letter_regeneration_time_secondary;

    return ({
      user,
      mapLat,
      mapLng,
      dropzone_radius,
      regen_time_primary,
      regen_time_secondary,
    });
}

export default connect(mapStateToProps)(Letter);
