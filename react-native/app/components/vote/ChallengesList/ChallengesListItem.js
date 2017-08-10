import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles';
import { getDateData, isFinished } from '../../../helper/dateFunctions';

class ChallengesListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
    language: PropTypes.string,
    callBackItemFinished: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.timerID = null;
    // const endUTC = new Date(this.props.challenge.end_date);
    this.dateStrings = { tickerString: '', endString: '' };
    this.state = {
      getTickerData: true,
      isFinished: false
    };
    /*    if (this.props.data._id === 'RaALpmeE8vBjdH54K') {
      const customDate = '2017-08-10T13:04:00.000Z';
      this.props.data.end_date = new Date(customDate);
    }*/
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
    // console.log('TICK');
    this.setState({ getTickerData: true });

    // Check if item is now finished, but was not
    if (!this.props.data.isFinished) {
      const endUTC = new Date(this.props.data.end_date);

      const finish = isFinished(endUTC);
      if (finish) {
        console.log('OKAY!');
        this.props.callBackItemFinished(this.props.data._id);
      }
    }
  }

  render() {
    if (this.state.getTickerData) {
      const endUTC = new Date(this.props.data.end_date);

      this.dateStrings = getDateData(endUTC, this.props.language);
    }
    return (
      <View style={styles.itemContainer}>
        {!this.props.data.isLoading
          ? <TouchableHighlight onPress={this.props.onPress}>
              {!this.props.data.isFinished
                ? <View style={styles.row}>
                    <Text style={styles.title}>
                      VOTE #{this.props.data.voteNum}
                    </Text>
                    <Text style={styles.title}>
                      {this.dateStrings.endString}
                    </Text>
                    <Text style={styles.title}>
                      {this.dateStrings.tickerString}
                    </Text>
                    <Text style={styles.title}>
                      {this.props.data.title}
                    </Text>
                  </View>
                : <View style={styles.row}>
                    <Text style={styles.title}>
                      VOTE #{this.props.data.voteNum} FINSHED
                    </Text>
                    <Text style={styles.title}>
                      {this.dateStrings.endString}
                    </Text>
                    <Text style={styles.title}>
                      {this.dateStrings.tickerString}
                    </Text>
                    <Text style={styles.title}>
                      {this.props.data.title}
                    </Text>
                  </View>}
            </TouchableHighlight>
          : <View style={styles.row}>
              <Text style={styles.title}>RELOAD ITEM</Text>
            </View>}
      </View>
    );
  }
}

export default ChallengesListItem;
