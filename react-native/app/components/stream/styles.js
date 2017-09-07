import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
  $backgroundColour: '#E6E6E6',
  $backgroundColourAlt: 'white',
  $textColour: 'black',
  $secondaryColour: '#3F3C6A',
  $sizeName: '1.2rem',
  $sizeHandle: '0.8rem',
  $sizeDate: '0.8rem',
  $sizeContent: '1rem',
  $sizeUrl: '0.65rem',
  $sizeLoading: '1rem',
  $padding: 32,
  $paddingSmall: 8,
  $paddingHorizontal: 32,
  $paddingVertical: 18,
  $loadingBarHeight: 48,

  feedContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: '$backgroundColourAlt',
  },

  tweetContainer: {
    width: '100%',
    paddingLeft: '$paddingHorizontal',
    paddingRight: '$paddingHorizontal',
    paddingTop: '$paddingVertical',
    paddingBottom: '$paddingVertical',
  },

  tweetHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  tweetName: {
    fontFamily: 'bold',
    fontSize: '$sizeName',
  },

  tweetDate: {
    fontFamily: 'normal',
    fontSize: '$sizeDate',
    textAlign: 'right',
    lineHeight: '$sizeName'
  },

  tweetHandle: {
    fontFamily: 'normal',
    fontSize: '$sizeHandle',
    color: '$secondaryColour',
  },

  tweetBody: {
    paddingBottom: '$paddingSmall',
    paddingTop: '$paddingSmall',
  },

  tweetContent: {
    fontSize: '$sizeContent',
    fontFamily: 'normal',
  },

  tweetImage: {

  },

  tweetUrl: {
    textDecorationLine: 'underline',
    color: '$secondaryColour',
    fontFamily: 'normal',
    fontSize: '$sizeUrl',
  },

  loadingBarContainer: {
    width: '100%',
    height: '$loadingBarHeight',
    backgroundColor: '$textColour',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingBarText: {
    fontSize: '$sizeLoading',
    color: '$backgroundColourAlt',
    fontFamily: 'normal',
    textAlign: 'center',
    paddingTop: '$paddingSmall'
  }
});
