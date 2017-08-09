import React, { Component, PropTypes } from 'react';
import { Animated, Text } from 'react-native';

import styles from './styles';
import { getDateData, isFinished } from '../../../helper/dateFunctions';

class SwipeHeader extends Component {
  static propTypes = {
    language: PropTypes.string,
    challenge: PropTypes.object,
    layoutCallback: PropTypes.func,
    offsetX: PropTypes.object,
    customStyle: PropTypes.number,
    callBackItemFinished: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.timerID = null;
    if (this.props.challenge) {
      this.dateStrings = { tickerString: '', endString: '' };
      this.state = {
        getTickerData: true,
      };
      /* if (this.props.challenge._id === 'phmvzfwNtWyXWx7hd') {
        const customDate = '2017-08-09T14:46:20.000Z';
        this.props.challenge.end_date = new Date(customDate);
      }*/
    }
  }

  componentDidMount() {
    if (this.props.challenge) {
      this.timerID = setInterval(() => {
        this.tick();
      }, 1000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ getTickerData: true });
    // Check if item is now finished, but was not
    if (this.props.challenge) {
      if (!this.props.challenge.isFinished) {
        const endUTC = new Date(this.props.challenge.end_date);
        /* if (this.endUTCCustom) {
        endUTC = this.endUTCCustom;
      }*/
        const finish = isFinished(endUTC);
        if (finish) {
          this.props.callBackItemFinished(this.props.challenge._id);
        }
      }
    }
  }

  render() {
    if (this.props.challenge) {
      if (this.state.getTickerData) {
        const endUTC = new Date(this.props.challenge.end_date);
        this.dateStrings = getDateData(endUTC, this.props.language);
      }
      return (
        <Animated.View
          onLayout={this.props.layoutCallback}
          style={[{ left: this.props.offsetX }, this.props.customStyle]}
        >
          <Text style={styles.swipeDummyText}>
            {this.props.challenge.title}
          </Text>
          <Text style={styles.swipeDummyText}>
            {this.dateStrings.endString}
          </Text>
          <Text style={styles.swipeDummyText}>
            {this.dateStrings.tickerString}
          </Text>
        </Animated.View>
      );
    }
    return (
      <Animated.View
        onLayout={this.props.layoutCallback}
        style={[{ left: this.props.offsetX, backgroundColor: '#000000' }, this.props.customStyle]}
      />
    );
  }
}
export default SwipeHeader;
