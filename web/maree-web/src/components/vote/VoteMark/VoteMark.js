import React, { Component, PropTypes } from 'react';

import styles from './styles';

class VoteMark extends Component {
  static propTypes = {
    size: PropTypes.string,
    value: PropTypes.any,
    type: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {};
  }

  heights = {
    l: styles.l.height,
    m: styles.m.height,
    s: styles.s.height,
    undefined: styles.m.height,
  };

  colors = {
    yes: 'rgb(0,200,0)',
    no: 'red',
    neutral: 'black',
    inactive: '#535353',
  };

  renderCross(height, color) {
    const orig_height = 34;
    const orig_width = 34 / 16;
    const scale = height * 16 / orig_height;
    const width = orig_width * scale;
    return (
      <svg style={{width: width+"rem", height: height+"rem"}}>
        <g transform={"scale("+scale+")"}>
          <polygon
            fill={color}
            points="4.8,0 0.1,4.8 12.3,17.1 0,29.4 4.7,34.1 17,21.8 29.4,34.1 34.1,29.3 21.8,17 34,4.8 29.4,0.1 17.1,12.3 "
          />
        </g>
      </svg>
    );
  }

  renderCheck(height, color) {
    const orig_height = 34;
    const orig_width = 46 / 16;
    const scale = height * 16 / orig_height;
    const width = orig_width * scale;
    return (
      <svg style={{width: width+"rem", height: height+"rem"}}>
        <g transform={"scale("+scale+")"}>
          <polygon
            fill={color}
            points="41.7,0 17,24.8 4.7,12.5 0,17.3 17,34.3 46.5,4.8 "
          />
        </g>
      </svg>
    );
  }

  render() {
    const height = this.heights[this.props.size];
    const color = this.colors[this.props.color];
    const inner = this.props.type === 'yes' ? this.renderCheck(height, color) : this.renderCross(height, color);
    return <div style={{display: "inline-block"}}>{inner}</div>;
  }
}

export default VoteMark;
