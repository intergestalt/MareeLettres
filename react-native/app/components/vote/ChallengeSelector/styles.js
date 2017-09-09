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
    flex: 0.25,
  },

  challengeFooter: {
    position: 'relative',
    height: '3rem',
  },

  // Header

  headerDownContainer: {
    flex: 0.12,
  },
  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.76,
  },
  headerUpContainer: {
    flex: 0.12,
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
    fontSize: 18,
  },
  headerNav: {
    color: 'black',
    textAlign: 'center',
    fontSize: 40,
  },
  // Content
  tinderContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    width: '$swipeWidth',
    top: 0,
    bottom: 0,
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
    flex: 0.675,
    width: '$swipeWidth',
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
});

export default styles;
