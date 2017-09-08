import React, { Component, PropTypes } from 'react';
import { WebView, Linking } from 'react-native'; // View, Text, FlatList
import { DYNAMIC_CONFIG } from '../../config/config';
import { connect } from 'react-redux';
import { twitterGetAuth, twitterGetTweets, twitterGetTweetsHTML } from '../../helper/apiProxy';
import Separator from '../vote/ChallengesList/Separator';
import Tweet from './Tweet';
import styles from './styles';

const wv = require('./TwitterWebView.html');

console.log('WEB VIEW', wv);

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
    //this.getAuthentication();
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
    //twitterGetAuth();
  }

  getTweets(token) {
    // get tweets
    //twitterGetTweets(token);
    // fallback
    //twitterGetTweetsHTML();
  }

  render() {
    //const tweets = this.props.stream.content;
    const uri = require('./TwitterWebView.html');

    return (
        <WebView
          ref={(ref) => {this.webview = ref;}}
          source={uri}
          style={styles.feedContainer}
          decelerationRate={'normal'}
          startInLoadingState={true}
          javaScriptEnabled
          onNavigationStateChange={(event) => {
            if (event.url.indexOf('TwitterWebView') == -1 || event.url.indexOf('ref_url') !== -1) {
              this.webview.stopLoading();
              Linking.openURL(event.url);
            }
          }}
        />
    );
  }
}

/*
<View style={styles.feedContainer}>
{/*tweets.length === 0
  ? <View style={styles.loadingBarContainer}>
      <Text style={styles.loadingBarText}>
        Loading
      </Text>
    </View>
  : null
}
{
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
}
</View>
*/

const mapStateToProps = (state) => {
  const stream = state.stream;

  return {
    stream,
  }
}

export default connect(mapStateToProps)(Feed);
