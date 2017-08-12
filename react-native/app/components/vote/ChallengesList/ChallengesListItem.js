import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles';

class ChallengesListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
    language: PropTypes.string,
  };

  render() {
    let myEndString = null;
    if (this.props.language === 'en') {
      myEndString = this.props.data.endStringEn;
    } else {
      myEndString = this.props.data.endStringFr;
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
                    {myEndString}
                  </Text>
                  <Text style={styles.title}>
                    {this.props.data.tickerString}
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
                    {myEndString}
                  </Text>
                  <Text style={styles.title}>
                    {this.props.data.tickerString}
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
