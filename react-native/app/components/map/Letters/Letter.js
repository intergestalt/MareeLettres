import React, { Component, PropTypes } from 'react';
import { View, Text, PanResponder, Animated, TouchableHighlight, Dimensions } from 'react-native';

import { updateLetterMenuProxy } from '../../../helper/userHelper';
import { putLetterOnMapProxy } from '../../../helper/mapHelper';

import styles from './styles';

class Letter extends Component {
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
              this.onDrop(
                this.props.index,
                this.props.character
              );
              Animated.timing(
                this.state.pan, {
                  toValue: {x:0, y:0},
                  duration: 1
                },
              ).start();
            } else {
              Animated.spring(
                  this.state.pan,
                  {toValue:{x:0,y:0}}
              ).start();
            }
          }
      });
  }

  static propTypes = {
    character: PropTypes.string,
    selected: PropTypes.bool,
    main: PropTypes.bool,
    index: PropTypes.number,
  }

  onDrop = () => {
    putLetterOnMapProxy(this.props.character);
    updateLetterMenuProxy(this.props.index);
  }

  isDropZone(gesture){
    let win = Dimensions.get('window');

    if (gesture.moveY < win.height - 170) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <View
        style = {this.props.main ? styles.background_main : styles.background_secondary}
        >
        <Animated.View
          {...this.panResponder.panHandlers}
          style = {[
            this.state.pan.getLayout(),
            styles.letter_area,
          ]}
          >
            <Text style={this.props.selected ? styles.selected : styles.letter}>
              {this.props.character}
            </Text>
        </Animated.View>
      </View>
    );
  }
};

export default Letter;
