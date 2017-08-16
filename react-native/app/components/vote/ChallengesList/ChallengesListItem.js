import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

class ChallengesListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
  };

  render() {
    return (
      <View style={styles.itemContainer}>
        {!this.props.data.isLoading
          ? <TouchableOpacity onPress={this.props.onPress}>
            {!this.props.data.isFinished
                ? <View style={styles.row}>
                  <Text style={styles.title}>
                      VOTE #{this.props.data.voteNum}
                  </Text>
                  <Text style={styles.ticker}>
                    {this.props.data.endString}
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
                      VOTE #{this.props.data.voteNum}
                  </Text>
                  <Text style={styles.ticker}>
                    {this.props.data.title.toUpperCase()}
                  </Text>
                  <Text style={styles.answer}>
                    {this.props.data.answer}
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
