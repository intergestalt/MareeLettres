import React, { Component, PropTypes } from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity, Dimensions } from 'react-native';

import { updateLetterMenuProxy, reviveLetterMenuProxy, binLetterProxy } from '../../../helper/userHelper';
import { putLetterOnMapProxy } from '../../../helper/mapHelper';
import { navigateToLetterSelector } from '../../../helper/navigationProxy';

import styles from './styles';

class Letter extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    character: PropTypes.string,
    selected: PropTypes.bool,
    id: PropTypes.string,
    main: PropTypes.bool,
    index: PropTypes.number,
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
          onStartShouldSetPanResponder : () => true,
          onPanResponderStart : () => {
            Animated.timing(
              this.state.font.size, {
                toValue: 100,
                duration: 1
              },
            ).start();
            Animated.timing(
              this.state.font.colour, {
                toValue: 100,
                duration: 1
              },
            ).start();
          },
          onPanResponderMove : Animated.event([null,{
            dx: this.state.pan.x,
            dy: this.state.pan.y
          }]),
          onPanResponderRelease : (e, gesture) => {
            if (this.isDropZone(gesture)){
              if (!this.props.selected) {
                // letter enabled, place on map, reset
                Animated.timing(
                  this.state.pan, {
                    toValue: {x:0, y:0},
                    duration: 1
                  },
                ).start();
                this.onDrop(gesture.moveX, gesture.moveY);
              } else {
                // letter disabled, reset
                Animated.spring(
                  this.state.pan,
                  {toValue:{x:0,y:0}}
                ).start();
              }
            } else if (this.isBin(gesture)) {
              // snap to start, destroy
              Animated.timing(
                this.state.pan, {
                  toValue: {x:0, y:0},
                  duration: 1
                },
              ).start();
              this.onBin();
            } else {
              // do nothing, reset
              Animated.spring(
                  this.state.pan,
                  {toValue:{x:0,y:0}}
              ).start();
            }

            // reset font
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
      });
  }

  onDrop(x, y) {
    // normalise coordinates and put in range [-1, 1]
    let win = Dimensions.get('window');
    let tx = ((x / win.width) - 0.5) * 1;
    let ty = (((y - 60) / (win.height - 230) - 0.5)) * -1;

    // put letter on map
    putLetterOnMapProxy(this.props.character, tx, ty);
    updateLetterMenuProxy(this.props.index);

    // set timer to reactivate letter
    if (!this.props.main) {
      let index = this.props.index;
      let char  = this.props.character;

      // NOTE: time will be inconsistent during development due to difference
      // between expo computer clock and device clock
      setTimeout(() => {
        reviveLetterMenuProxy(index, char);
      }, 10000);
    };
  }

  onBin = () => {
    // put letter in bin !
    binLetterProxy(this.props.index);
  }

  onPress = () => {
    navigateToLetterSelector(this.props);
  }

  isBin(gesture) {
    // check if letter is in rubbish bin

    let inBin = false;

    if (!this.props.main) {
      let win = Dimensions.get('window');
      if (gesture.moveY > win.height - 60 && gesture.moveX > win.width * 0.66) {
        inBin = true;
      }
    }

    return inBin;
  }

  isDropZone(gesture){
    // check if letter is over map

    let win = Dimensions.get('window');

    if (gesture.moveY < win.height - 170) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    // colour animation
    /*
    let colour = this.state.text.colour.interpolate({
      inputRange: [0, 100],
      outputRange: ['rgba(0,0,0,1)', 'rgba(255,255,255,1)']
    });
    */
    let size = this.state.font.size.interpolate({
      inputRange: [0, 100],
      outputRange: [14, 24]
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

export default Letter;
