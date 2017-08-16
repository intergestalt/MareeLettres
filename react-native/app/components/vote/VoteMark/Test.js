import React, { Component } from 'react';
import { Animated, View, Text, TouchableOpacity } from 'react-native';

import Svg, { Circle } from 'react-native-svg';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = { circleRadius: new Animated.Value(50) };

    // this.state.circleRadius.addListener((circleRadius) => {
    // this._myCircle.setNativeProps({ r: circleRadius.value.toString() });
    // });
  }

  onPress() {
    console.log('PRESS');
    this.runAnimation();
  }

  runAnimation() {
    console.log('RUN');
    Animated.timing(this.state.circleRadius, {
      toValue: 100,
      duration: 2000,
    }).start();
  }

  render() {
    console.log(this.state);
    // console.log(this.state.circleRadius.value.toString());

    //  console.log(this.state.circleRadius.value.toString());
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    return (
      <Animated.View>
        <TouchableOpacity onPress={this.onPress}>
          <Text>RUN</Text>
        </TouchableOpacity>
        <Svg height="400" width="400">
          <AnimatedCircle r={this.state.circleRadius} cx="250" cy="250" fill="black" />
        </Svg>
      </Animated.View>
    );
  }
}
