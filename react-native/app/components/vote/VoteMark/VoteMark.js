import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import interpolate from 'color-interpolate';

import styles from './styles';

class VoteMark extends Component {
  static propTypes = {
    size: PropTypes.string,
    value: PropTypes.any,
    active: PropTypes.bool,
    type: PropTypes.string,
    onPress: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {};
  }

  heights = {
    l: 34,
    m: 17,
    s: 12,
    undefined: 17,
  };

  colors = {
    yes: 'green',
    no: 'red',
    neutral: 'black',
    inactive: '#535353',
  };

  renderCross(height, color) {
    const orig_height = 34;
    const orig_width = 34;
    const scale = height / orig_height;
    const width = orig_width * scale;
    return (
      <Svg width={width} height={height}>
        <Polygon
          scale={scale}
          fill={color}
          points="4.8,0 0.1,4.8 12.3,17.1 0,29.4 4.7,34.1 17,21.8 29.4,34.1 34.1,29.3 21.8,17 34,4.8 29.4,0.1 17.1,12.3 "
        />
      </Svg>
    );
  }

  renderCheck(height, color) {
    const orig_height = 34;
    const orig_width = 46;
    const scale = height / orig_height;
    const width = orig_width * scale;
    return (
      <Svg width={width} height={height}>
        <Polygon
          scale={scale}
          fill={color}
          points="41.7,0 17,24.8 4.7,12.5 0,17.3 17,34.3 46.5,4.8 "
        />
      </Svg>
    );
  }

  getColor() {
    if (this.props.active) {
      const decided_color = this.props.type == 'yes' ? this.colors.yes : this.colors.no;
      if (typeof this.props.value === 'number') {
        const colormap = interpolate([this.colors.neutral, decided_color]);
        return colormap(this.props.value);
      } else if (this.props.value) {
        return decided_color;
      }
      return this.colors.neutral;
    }
    return this.colors.inactive;
  }

  render() {
    const height = this.heights[this.props.size];
    const color = this.getColor();
    const inner =
      this.props.type === 'yes' ? this.renderCheck(height, color) : this.renderCross(height, color);
    if (this.props.active) {
      return <TouchableOpacity onPress={this.props.onPress}>{inner}</TouchableOpacity>;
    }
    return <View>{inner}</View>;
  }
}

export default VoteMark;
