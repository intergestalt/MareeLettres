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
    borderColor: '#000',
    minHeight: '$challengeSelectorHeaderHeight',
  },

  challengeFooter: {
    position: 'relative',
    height: '3rem',
  },

  // Header

  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerDownContainer: {
    height: '$challengeSelectorHeaderHeight',
    borderStyle: 'solid',
    borderColor: '#000',
    backgroundColor: '$backgroundColor',
  },
  headerDownAbsolute: {
    position: 'absolute',
    left: 0,
  },

  headerUpContainer: {
    // borderLeftWidth: 1,
    height: '$challengeSelectorHeaderHeight',
    borderStyle: 'solid',
    borderColor: '#000',
    backgroundColor: '$backgroundColor',
  },
  headerUpAbsolute: {
    position: 'absolute',
    // borderBottomWidth: 1,
    right: 0,
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
    paddingHorizontal: '0.25rem',
  },
  headerNav: {
    marginHorizontal: '1rem',
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
    width: '100%',
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
    borderTopWidth: 1,
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
    backgroundColor: 'black',
  },

  challengeFooterText: {
    position: 'relative',
    backgroundColor: 'transparent',
    top: '$textOffset1Rem',
    color: '#000',
    fontFamily: 'normal',
    fontSize: '1rem',
  },

  challengeFooterTextRight: {
    color: 'white',
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
    bottom: 0,
  },
  lineRight: {
    position: 'absolute',
    width: 1,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000000',
  },
});

export default styles;
