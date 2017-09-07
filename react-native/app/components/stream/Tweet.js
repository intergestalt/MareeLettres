import React, { Component, PropTypes } from 'react';
import { View, Text, Animated, Linking } from 'react-native';
import styles from './styles';

class Tweet extends Component {
  static PropTypes = {
    index: PropTypes.number,
    name: PropTypes.string,
    handle: PropTypes.string,
    date: PropTypes.date,
    content: PropTypes.string,
    image: PropTypes.image,
    url: PropTypes.string,
  }

  getTimeSince(t) {
    // get time since t in a friendly, readable string
    const now = (new Date()).getTime();
    const secs = (now - (new Date(t)).getTime()) / 1000;

    if (secs < 60) {
      return '<1m ago';
    } else if (secs < 3600) {
      return Math.floor(secs / 60) + 'm ago';
    } else if (secs < 86400){
      return Math.floor(secs / 3600) + 'h ago';
    } else {
      return Math.floor(secs / 86400) + 'd ago';
    }
  }

  onPressHandle = () => {
    Linking.openURL(`https://twitter.com/${this.props.handle}`);
  }

  onPressUrl = () => {
    Linking.openURL(this.props.url);
  }

  render() {
    const timeSince = this.getTimeSince(this.props.date);
    
    return (
      <Animated.View style={[styles.tweetContainer]}>
        <View style={styles.tweetHead}>
          <Text style={styles.tweetName}>
            { this.props.name }
          </Text>
          <Text style={styles.tweetDate}>
            { timeSince }
          </Text>
        </View>
        <Text style={styles.tweetHandle} onPress={this.onPressHandle}>
          { this.props.handle }
        </Text>
        <View style={styles.tweetBody}>
          <Text style={styles.tweetContent}>
            { this.props.content }
          </Text>
          { this.props.image
            ? <Text style={styles.tweetImage}>
              { this.props.image }
              </Text>
            : null
          }
        </View>
        <Text style={styles.tweetUrl} onPress={this.onPressUrl}>
          { this.props.url }
        </Text>
      </Animated.View>
    )
  }
};

export default Tweet;
