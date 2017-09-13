import EStyleSheet from 'react-native-extended-stylesheet';
import { screenWidth } from '../../../helper/screen';

const styles = EStyleSheet.create({
  $swipeWidth: screenWidth,

  // Container Main

  // All 3 CHallenges
  challengeContainer: {
    flexDirection: 'row',
    width: '$swipeWidth*3',
    flex: 1,
  },

  // 1 Challange, but three of this in a row.
  detailContainer: {
    flexDirection: 'column',
    width: '$swipeWidth',
    left: 0,
    borderColor: 'transparent',
  },

  detailContainerMargin: {
    flexDirection: 'column',
    backgroundColor: '#000000',
    width: '$swipeWidth',
    left: 0,
  },
  // Three Arrays of a detail view
  challengeHeader: {
    flexDirection: 'row',
    position: 'relative',
  },

  challengeFooter: {
    position: 'relative',
    height: '3rem',
  },

  // Header

  headerDownContainer: {
    marginHorizontal: '1.25rem',
  },
  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerUpContainer: {
    marginHorizontal: '1.25rem',
  },
  headerNavContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  headerText: {
    color: 'black',
    textAlign: 'center',
    fontSize: '2rem',
    fontFamily: 'normal',
  },
  headerNav: {
    color: 'black',
    textAlign: 'center',
    fontSize: '2rem',
    fontFamily: 'normal',
    top: '0.5rem', // center the character inside the line
  },
  // Content
  tinderContainer: {
    flexDirection: 'row',

    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  tinderBoxToMove: {
    left: 0,
    top: 0,
    flex: 1,
  },
  challengeContent: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeInnerContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  contentText: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    width: '$swipeWidth',
    backgroundColor: 'transparent',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'impact',
    fontSize: '2rem',
    textAlign: 'center',
    bottom: 0,
  },
  imageStye: {
    width: '$swipeWidth',
    flex: 1,
  },
  // Footer

  challengeFooterFinished: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
  },

  challengeFooterUnfinished: {
    flex: 1,
    flexDirection: 'row',
  },

  footerButton: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  footerButtonRight: {
    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
  },

  challengeFooterText: {
    position: 'relative',
    top: '0.15rem',
    color: '#000',
    fontFamily: 'normal',
    fontSize: '1rem',
  },

  challengeFooterTextHigh: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'normal',
  },

  lineLeft: {
    position: 'absolute',
    width: 1,
    top: 0,
    left: 0,
    backgroundColor: '#000000',
    height: '100%',
  },
  lineRight: {
    position: 'absolute',
    width: 1,
    top: 0,
    right: 0,
    backgroundColor: '#000000',
    height: '100%',
  },
});

export default styles;
