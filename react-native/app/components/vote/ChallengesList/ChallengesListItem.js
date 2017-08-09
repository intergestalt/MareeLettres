import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles';
import { getDateData, isFinished } from '../../../helper/dateFunctions';

class ChallengesListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
    language: PropTypes.string,
    callBackItemFinished: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.timerID = null;
    // const endUTC = new Date(this.props.challenge.end_date);
    this.dateStrings = { tickerString: '', endString: '' };
    this.state = {
      getTickerData: true,
      isFinished: false,
    };
    this.endUTCCustom = null;
    if (this.props.data.id === 'RaALpmeE8vBjdH54K') {
      const customDate = '2017-08-09T13:56:00.000Z';
      this.endUTCCustom = new Date(customDate);
    }
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

    // Check if item is now finished, but was not
    if (!this.props.data.isFinished) {
      let endUTC = new Date(this.props.data.end_date);
      if (this.endUTCCustom) {
        endUTC = this.endUTCCustom;
      }
      const finish = isFinished(endUTC);
      if (finish) {
        this.props.callBackItemFinished(this.props.data.id);
      }
    }
  }

  render() {
    if (this.state.getTickerData) {
      let endUTC = new Date(this.props.data.end_date);
      if (this.endUTCCustom) {
        endUTC = this.endUTCCustom;
      }
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
