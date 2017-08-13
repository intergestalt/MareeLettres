import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

class ChallengesListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
    language: PropTypes.string,
  };
  getAnswer() {
    let answer = '';
    if (this.props.data) {
      const winning = this.props.data.winningProposal;
      if (winning) {
        answer = winning.text;
      }
    }
    return answer;
  }

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
          ? <TouchableOpacity onPress={this.props.onPress}>
            {!this.props.data.isFinished
                ? <View style={styles.row}>
                  <Text style={styles.title}>
                      VOTE #{this.props.data.voteNum}
                  </Text>
                  <View style={styles.tickerContainer}>
                    <Text style={styles.liveSpacer}>live</Text>
                    <Text style={styles.ticker}>
                      {this.props.data.tickerString}
                    </Text>
                    <Text style={styles.live}>live</Text>
                  </View>
                  <Text style={styles.title}>
                    {this.props.data.title.toUpperCase()}
                  </Text>
                </View>
                : <View style={styles.row}>
                  <Text style={styles.title}>
                      VOTE #{this.props.data.voteNum} FINSHED
                    </Text>
                  <View style={styles.tickerContainer}>
                    <Text style={styles.ticker}>
                      {myEndString}
                    </Text>
                  </View>
                  <Text style={styles.answer}>
                    {this.getAnswer()}
                  </Text>
                </View>}
          </TouchableOpacity>
          : <View style={styles.row}>
            <Text style={styles.title}>RELOAD ITEM</Text>
          </View>}
      </View>
    );
  }
}

export default ChallengesListItem;
