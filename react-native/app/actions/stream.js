import { callStreamGetAuthToken, callStreamGetTweets, callStreamGetTweetsHtml } from '../helper/apiCalls';

export const STREAM_GET_AUTH_TOKEN = 'STREAM_GET_AUTH_TOKEN';
export const STREAM_GET_TWEETS = 'STREAM_GET_TWEETS';
export const STREAM_GET_TWEETS_HTML = 'STREAM_GET_TWEETS_HTML';
export const STREAM_GET_AUTH_TOKEN_SUCCESS = 'STREAM_GET_AUTH_TOKEN_SUCCESS';
export const STREAM_GET_TWEETS_SUCCESS = 'STREAM_GET_TWEETS_SUCCESS';
export const STREAM_GET_TWEETS_HTML_SUCCESS = 'STREAM_GET_TWEETS_HTML_SUCCESS';
export const STREAM_ERROR = 'STREAM_ERROR';

export const streamGetAuthToken = () => ({
  type: STREAM_GET_AUTH_TOKEN,
  successEvent: STREAM_GET_AUTH_TOKEN_SUCCESS,
  errorEvent: STREAM_ERROR,
  apiCall: callStreamGetAuthToken
});

export const streamGetTweets = (token) => ({
  type: STREAM_GET_TWEETS,
  successEvent: STREAM_GET_TWEETS_SUCCESS,
  errorEvent: STREAM_ERROR,
  apiCall: callStreamGetTweets,
  token: token,
});

export const streamGetTweetsHTML = () => ({
  type: STREAM_GET_TWEETS_HTML,
  successEvent: STREAM_GET_TWEETS_HTML_SUCCESS,
  errorEvent: STREAM_ERROR,
  apiCall: callStreamGetTweetsHtml,
});
