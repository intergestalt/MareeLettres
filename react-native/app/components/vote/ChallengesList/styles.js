import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  $challengeListBackgroundColor: '#E6E6E6',
  $textColor: 'black',
  $tickerColor: '#3F3C6A',
  $challengeListItemHorizontalPadding: 32,

  container: {
    position: 'absolute',
    backgroundColor: '$challengeListBackgroundColor',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  separator: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '$textColor',
    bottom: 0,
    height: '$strokeWidth',
    flex: 1,
  },
  listDummyContainer: { flex: 1, width: '100%', backgroundColor: 'white' },
  row: {
    marginHorizontal: 0,
    paddingBottom: '1rem',
    paddingTop: '1rem',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },

  title: {
    color: '$textColor',
    fontSize: '1rem',
    backgroundColor: 'transparent',
    top: '$textOffset1Rem-1',
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
    flexDirection: 'row',
  },
  ticker: {
    color: '$tickerColor',
    fontSize: '1rem',
    fontFamily: 'normal',
    backgroundColor: 'transparent',
    top: '$textOffset1Rem-1',
  },
  live: {
    color: 'red',
    fontSize: '0.5rem',
    fontFamily: 'normal',
    paddingBottom: '0.5rem',
    backgroundColor: 'transparent',
    top: '$textOffset1Rem-1',
  },
  liveSpacer: {
    color: 'transparent',
    fontSize: '0.5rem',
    fontFamily: 'normal',
    backgroundColor: 'transparent',
    top: '$textOffset1Rem',
  },
  itemContainer: {},
  challengeHeaderPadding: {
    paddingHorizontal: '1rem',
  },
  listHeaderContainer: {
    width: '100%',
    flex: 0.5,
  },
  imageStye: {
    flex: 1,
    width: '100%',
  },
  imageStyeList: {
    flex: 1,
    width: '100%',
  },
  imageListContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    height: '10rem',
  },

  showAllButtonContainer: { backgroundColor: '$seePastTopicsButtonColor', width: '100%' },
  showAllButton: {
    height: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  showAllButtonText: {
    fontSize: '1rem',
    fontFamily: 'normal',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    top: '$textOffset1Rem',
  },
  winningInnerContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  winningText: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    width: '100%',
    backgroundColor: 'transparent',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'impact',
    fontSize: '1.5rem',
    textAlign: 'center',
    bottom: 0,
  },
});

export default styles;
