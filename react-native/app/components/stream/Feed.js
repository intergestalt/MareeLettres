import React, { Component, PropTypes } from 'react';
import { WebView, Linking, FlatList, View } from 'react-native';
import { DYNAMIC_CONFIG } from '../../config/config';
import { connect } from 'react-redux';
import { twitterGetAuth, twitterGetTweets, twitterGetTweetsHTML } from '../../helper/apiProxy';
import Separator from '../vote/ChallengesList/Separator';
import Tweet from './Tweet';
import styles from './styles';

const patchPostMessageJsCode = `(${String(function() {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer)
    }
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }
    window.postMessage = patchedPostMessage
})})();
`

class Feed extends Component {
  static PropTypes = {
    stream: PropTypes.object,
    handle: PropTypes.string
  }

  constructor(props) {
    super();

    this.state = {
      tweets: [],
      token: false,
    }
  }

  componentWillMount() {
    //this.getAuthentication();
  }

  componentWillReceiveProps(nextProps) {
    // after authentication, dispatch twitter API call to get tweets
    /*
    try {
      if (nextProps.stream.token && this.state.token != nextProps.stream.token.access_token) {
        this.setState({token: nextProps.stream.token.access_token});
        this.getTweets(nextProps.stream.token.access_token);
      }
    } catch(e) {
      console.log(e);
    }
    */
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

  onMessage(data) {
    /*
    this.setState({
      tweets: data.tweets,
    });
    */
  }

  sendPostMessage() {
    //this.webview.postMessage( "Post message from react native" );
  }

  render() {
    //const tweets = this.state.tweets;
    const uri = require('./TwitterWebView.html');

    return (
      <View>
      {/*
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
      */}
        <WebView
          ref={webview => { this.webview = webview; }}
          javaScriptEnabled
          //injectedJavaScript={patchPostMessageJsCode}
          source={uri}
          style={[styles.feedContainer]} // {display: 'none'}
          decelerationRate={'normal'}
          //onMessage={e => this.onMessage(JSON.parse(e.nativeEvent.data))}
          startInLoadingState={true}
          onNavigationStateChange={(event) => {
            console.log(uri);
            console.log(event);
            const isLocal = event.url.search('http://localhost') !== -1;
            if (!isLocal) {
              this.webview.stopLoading();
              Linking.openURL(event.url);
            }
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const stream = state.stream;
  const handle = DYNAMIC_CONFIG.TWITTER_HANDLE;

  return {
    stream,
    handle,
  }
}

export default connect(mapStateToProps)(Feed);
