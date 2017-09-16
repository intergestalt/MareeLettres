import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class BlinkText extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};
  }

  componentWillMount() {
    // Change the state every second or the time given by User.
    this.timerID = setInterval(() => {

      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 
    // Define any blinking time.
    500);    
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    let visibilityStyle = this.props.blinking ? (this.state.showText ? {color: "transparent"} : {}) : {};
    return (
      <Text style={[this.props.style, visibilityStyle]}>{this.props.text}</Text>
    );
  }
}