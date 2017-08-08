import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles';
import { getDateStrings } from '../../../helper/dateFunctions';

class ChallengesListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
    language: PropTypes.string,
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
    // const endUTC = new Date(this.props.challenge.end_date);
    // const dateStrings = getDateStrings(endUTC, this.props.language);
    this.setState({ getTickerData: true });
  }
  render() {
    if (this.state.getTickerData) {
      const endUTC = new Date(this.props.data.end_date);
      this.dateStrings = getDateStrings(endUTC, this.props.language);
    }
    return (
      <View style={styles.itemContainer}>
        <TouchableHighlight onPress={this.props.onPress}>
          <View style={styles.row}>
            <Text style={styles.title}>
              {this.props.data.title}
            </Text>
            <Text style={styles.title}>
              {this.dateStrings.endString}
            </Text>
            <Text style={styles.title}>
              {this.dateStrings.tickerString}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ChallengesListItem;
