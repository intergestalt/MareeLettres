import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';

const styles = EStyleSheet.create({
  $challengeListBackgroundColor: '#E6E6E6',
  $textColor: 'black',
  $tickerColor: '#3F3C6A',
  $challengeListItemHorizontalPadding: 32,
  $lineTopOffset: '0.4rem', // compensate visual difference due to vertical placement of text inside line. see also: https://facebook.github.io/react-native/docs/textstyleproptypes.html#includefontpadding

  container: {
    position: 'absolute',
    backgroundColor: '$challengeListBackgroundColor',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  separator: {
    backgroundColor: '$textColor',
    height: '$strokeWidth',
    flex: 1,
  },
  row: {
    marginHorizontal: '$challengeListItemHorizontalPadding',
    paddingBottom: '1rem',
    paddingTop: '1rem + $lineTopOffset',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    color: '$textColor',
    fontSize: '1rem',
    textAlign: 'center',
    fontFamily: 'bold',
  },
  answer: {
    color: '$textColor',
    fontSize: '1rem',
    textAlign: 'center',
    fontFamily: 'impact',
    letterSpacing: 2,
  },
  tickerContainer: {
    marginBottom: '1rem',
    flexDirection: 'row',
  },
  ticker: {
    color: '$tickerColor',
    fontSize: '1rem',
    fontFamily: 'normal',
  },
  live: {
    color: 'red',
    fontSize: '0.5rem',
    fontFamily: 'normal',
    paddingBottom: '0.5rem',
  },
  liveSpacer: {
    color: 'transparent',
    fontSize: '0.5rem',
    fontFamily: 'normal',
  },
  itemContainer: {},
  listHeaderContainer: {
    width: '100%',
    flex: 0.5,
  },
  imageStye: {
    flex: 1,
    width: '100%',
  },
});

export default styles;
