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
  challengeContent: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
    flex: 0.675,
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeFooter: {
    position: 'relative',
    flex: 0.075,
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
  },

  tinderBoxToMove: {
    left: 0,
    top: 0,
    flex: 1,
  },

  contentText: {
    color: 'black',
    fontFamily: 'impact',
    fontSize: 25,
    textAlign: 'center',
  },

  // Footer

  challengeFooterFinished: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#777700',
  },

  challengeFooterUnfinished: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#777700',
    paddingHorizontal: 10,
  },

  challengeFooterText: {
    color: '#aaaa00',
    fontSize: 24,
  },

  challengeFooterTextHigh: {
    color: '#333333',
    fontSize: 24,
  },
});

export default styles;
