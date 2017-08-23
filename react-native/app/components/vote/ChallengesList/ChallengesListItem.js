import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

class ChallengesListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
    language: PropTypes.string,
  };

  render() {
    const language = this.props.language;
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
                    {this.props.data.title}
                  </Text>
                </View>
                : <View style={styles.row}>
                  <Text style={styles.title}>
                      VOTE #{this.props.data.voteNum}
                  </Text>
                  <Text style={styles.ticker}>
                    {this.props.data.title}
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

const mapStateToProps = (state) => {
  const language = state.globals.language;
  return {
    language,
  };
};
export default connect(mapStateToProps)(ChallengesListItem);
