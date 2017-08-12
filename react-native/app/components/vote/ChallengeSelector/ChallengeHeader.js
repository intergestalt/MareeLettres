import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

class ChallengeHeader extends Component {
  static propTypes = {
    layoutCallback: PropTypes.func,
    backgroundColor: PropTypes.string,
    challenges: PropTypes.array,
    challengeIndex: PropTypes.number,
    onHeaderPress: PropTypes.func,
    onUpPress: PropTypes.func,
    onDownPress: PropTypes.func,
    tickerString: PropTypes.string,
    endString: PropTypes.string,
    panResponder: PropTypes.string,
    language: PropTypes.string,
  };
  constructor(props) {
    super(props);
    /* const myChallenge = this.getChallenge();
        if (myChallenge) {
      if (this.getChallenge()._id === 'gg6fmsqMmwPGnip6h') {
        const customDate = '2017-08-11T12:27:50.000Z';
        myChallenge.end_date = new Date(customDate);
      }
    } */
  }

  getChallenge() {
    if (
      this.props.challengeIndex < 0 ||
      this.props.challengeIndex > this.props.challenges.length - 1
    ) {
      return null;
    }
    return this.props.challenges[this.props.challengeIndex];
  }

  render() {
    let color = { backgroundColor: '#FFFFFF' };
    if (this.props.backgroundColor) {
      color = { backgroundColor: this.props.backgroundColor };
    }
    if (
      this.props.challengeIndex < 0 ||
      this.props.challengeIndex >= this.props.challenges.length
    ) {
      color = { backgroundColor: '#000000' };
      return <View onLayout={this.props.layoutCallback} style={[styles.challengeHeader, color]} />;
    }
    let buttonUp = null;
    if (this.props.challengeIndex < this.props.challenges.length - 1) {
      buttonUp = (
        <TouchableOpacity onPress={this.props.onUpPress} style={{ flex: 1 }}>
          <View style={styles.headerNavContainer}>
            <Text style={styles.headerNav}>
              {'>'}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    let buttonDown = null;
    if (this.props.challengeIndex > 0) {
      buttonDown = (
        <TouchableOpacity onPress={this.props.onDownPress} style={{ flex: 1 }}>
          <View style={styles.headerNavContainer}>
            <Text style={styles.headerNav}>
              {'<'}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    const contentDown = (
      <View style={styles.headerDownContainer}>
        {buttonDown}
      </View>
    );
    const contentUp = (
      <View style={styles.headerUpContainer}>
        {buttonUp}
      </View>
    );
    const contentMiddle = (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity onPress={this.props.onHeaderPress}>
          <Text style={styles.headerText}>
            VOTE #{this.getChallenge().voteNum}
          </Text>
          <Text style={styles.headerText}>
            {this.props.endString}
          </Text>
          <Text style={styles.headerText}>
            {this.props.tickerString}
          </Text>
          <Text style={styles.headerText}>
            {this.getChallenge().title}
          </Text>
        </TouchableOpacity>
      </View>
    );
    if (this.props.panResponder) {
      return (
        <View
          {...this.props.panResponder.panHandlers}
          onLayout={this.props.layoutCallback}
          style={[styles.challengeHeader, color]}
        >
          {contentDown}
          {contentMiddle}
          {contentUp}
        </View>
      );
    }
    return (
      <View onLayout={this.props.layoutCallback} style={[styles.challengeHeader, color]}>
        {contentDown}
        {contentMiddle}
        {contentUp}
      </View>
    );
  }
}
export default ChallengeHeader;
