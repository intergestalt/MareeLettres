import {
  STREAM_GET_AUTH_TOKEN,
  STREAM_GET_TWEETS,
  STREAM_GET_TWEETS_HTML,
  STREAM_GET_AUTH_TOKEN_SUCCESS,
  STREAM_GET_TWEETS_SUCCESS,
  STREAM_GET_TWEETS_HTML_SUCCESS,
  STREAM_ERROR,
} from '../actions/stream.js';

import { DYNAMIC_CONFIG } from '../config/config';
import initialState from '../config/initialState';

const DOMParser = require('xmldom-silent').DOMParser;

export default (state = initialState.stream, action) => {
  try {
    console.log('Reducer', action.type);
    switch (action.type) {
      case STREAM_GET_AUTH_TOKEN_SUCCESS: {
        const token = action.result;
        return {
          ...state,
          token: token,
        }
      }
      case STREAM_GET_TWEETS_SUCCESS: {
        const raw = [...action.result];
        console.log(raw[0]);
        const tweets = Object.keys(action.result).map(function(key, index) {
          const tweet = action.result[key];

          return ({
            id: tweet.id,
            index: index,
            name: tweet.user.name,
            handle: '@' + tweet.user.screen_name,
            date: tweet.created_at,
            content: tweet.text,
            url: DYNAMIC_CONFIG.TWITTER_URL + tweet.user.screen_name + '/status/' + tweet.id_str
          });
        });

        return {
          ...state,
          content: tweets,
        };
      }
      case STREAM_GET_TWEETS_HTML_SUCCESS: {
        const html = action.result;

        // const parser = new DOMParser();
        // const doc = parser.parseFromString(action.result, "text/html");

        let tweets = [];
        return {
          ...state,
          content: tweets
        };
      }
      case STREAM_GET_AUTH_TOKEN:
      case STREAM_GET_TWEETS:
      case STREAM_GET_TWEETS_HTML: {
        return {
          ...state,
          isLoading: false,
          isError: false,
        };
      }
      case STREAM_ERROR: {
        return {
          ...state,
          isLoading: false,
          isError: true,
        }
      }
      default:
        return state;
    }
  } catch (e) {
    console.log('Error: Reducer STREAM');
    console.log(e);
    throw e;
  }
};
