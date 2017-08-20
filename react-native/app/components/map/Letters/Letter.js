import React, { Component, PropTypes } from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity, Dimensions } from 'react-native';

import { updateLetterMenuProxy, reviveLetterMenuProxy } from '../../../helper/userHelper';
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
          pan : new Animated.ValueXY()
      };

      this.panResponder = PanResponder.create({
          onStartShouldSetPanResponder : () => true,
          onPanResponderMove : Animated.event([null,{
            dx : this.state.pan.x,
            dy : this.state.pan.y
          }]),
          onPanResponderRelease : (e, gesture) => {
            if(this.isDropZone(gesture)){
              Animated.timing(
                this.state.pan, {
                  toValue: {x:0, y:0},
                  duration: 1
                },
              ).start();
              this.onDrop(gesture.moveX, gesture.moveY);
            } else {
              Animated.spring(
                  this.state.pan,
                  {toValue:{x:0,y:0}}
              ).start();
            }
          }
      });
  }

  onDrop = (x, y) => {
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

      setTimeout(function(){
        reviveLetterMenuProxy(index, char);
      }, 1000);
    };
  }

  isDropZone(gesture){
    let win = Dimensions.get('window');

    if (gesture.moveY < win.height - 170) {
      return true;
    } else {
      return false;
    }
  }

  onPress = () => {
    console.log(this.props)
    navigateToLetterSelector(this.props);
  }

  render() {
    if (this.props.main) {
      return this.renderYou();
    } else {
      return this.renderFriends();
    }
  }

  renderYou() {
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
                <Text style={styles.letter}>
                  {this.props.character}
                </Text>
            </Animated.View>
          }
      </View>
    );
  }

  renderFriends() {
    return (
      <View style = {styles.background_secondary}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style = {[this.state.pan.getLayout(), styles.letter_area]}>
            <Text style={this.props.selected ? styles.disabled : styles.letter}>
              {this.props.character}
            </Text>
        </Animated.View>
      </View>
    )
  }
};

export default Letter;
