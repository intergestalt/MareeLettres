import React, { Component, PropTypes } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from './styles';
import { getDateData } from '../../../helper/dateFunctions';

class SwipeHeader extends Component {
  static propTypes = {
    language: PropTypes.string,
    challenge: PropTypes.object,
    layoutCallback: PropTypes.func,
    offsetX: PropTypes.object,
    customStyle: PropTypes.number,
    onPress: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.timerID = null;
    // const endUTC = new Date(this.props.challenge.end_date);
    this.dateStrings = { tickerString: '', endString: '' };
    this.state = {
      getTickerData: true,
    };
    // const keyDateWinterString = '2018-08-09T20:46:00.000Z';
    // const endUTC = new Date(keyDateWinterString);

    console.log(this.state);
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ getTickerData: true });
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
          <TouchableOpacity onPress={this.props.onPress}>
            <View>
              <Text style={styles.swipeDummyText}>
                {this.props.challenge.title}
              </Text>
              <Text style={styles.swipeDummyText}>
                {this.dateStrings.endString}
              </Text>
              <Text style={styles.swipeDummyText}>
                {this.dateStrings.tickerString}
              </Text>
            </View>
          </TouchableOpacity>
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
