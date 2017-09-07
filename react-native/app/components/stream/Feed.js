import React, { Component, PropTypes } from 'react';
import { View, Text, FlatList } from 'react-native';
import { DYNAMIC_CONFIG } from '../../config/config';
import { connect } from 'react-redux';
import { twitterGetAuth, twitterGetTweets, twitterGetTweetsHTML } from '../../helper/apiProxy';
import Separator from '../vote/ChallengesList/Separator';
import Tweet from './Tweet';
import styles from './styles';

class Feed extends Component {
  static PropTypes = {
    stream: PropTypes.object,
  }

  constructor(props) {
    super();

    this.state = {
      token: false,
    }
  }

  componentWillMount() {
    this.getAuthentication();
  }

  componentWillReceiveProps(nextProps) {
    // after authentication, dispatch twitter API call to get tweets
    try {
      if (nextProps.stream.token && this.state.token != nextProps.stream.token.access_token) {
        this.setState({token: nextProps.stream.token.access_token});
        this.getTweets(nextProps.stream.token.access_token);
      }
    } catch(e) {
      console.log(e);
    }
  }

  getAuthentication() {
    // get app auth token
    twitterGetAuth();
  }

  getTweets(token) {
    // get tweets
    twitterGetTweets(token);

    // fallback in anticipation of twitter API rate limit problems
    //twitterGetTweetsHTML();
  }

  render() {
    const tweets = this.props.stream.content;

    return (
      <View style={styles.feedContainer}>
        {tweets.length === 0
          ? <View style={styles.loadingBarContainer}>
              <Text style={styles.loadingBarText}>
                Loading
              </Text>
            </View>
          : null
        }
        <FlatList
          data={tweets}
          renderItem={({item}) =>
            <Tweet
              index={item.index}
              name={item.name}
              handle={item.handle}
              date={item.date}
              content={item.content}
              image={false}
              url={item.url}
              />
          }
          keyExtractor={item => item.index}
          ItemSeparatorComponent={Separator}
          />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const stream = state.stream;

  return {
    stream,
  }
}

export default connect(mapStateToProps)(Feed);
