import EStyleSheet from 'react-native-extended-stylesheet';
import { screenWidth } from '../../../helper/screen';

const styles = EStyleSheet.create({
  $swipeWidth: screenWidth,

  // Container Main

  // All 3 CHallenges
  challengeContainer: {
    backgroundColor: '#7700FF',
    flexDirection: 'row',
    width: '$swipeWidth*3',
    flex: 1,
  },

  // 1 Challange, but three of this in a row.
  detailContainer: {
    flexDirection: 'column',
    backgroundColor: '#00FF00',
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
    backgroundColor: '#555599',
    flex: 0.12,
  },
  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5555FF',
    flex: 0.76,
  },
  headerUpContainer: {
    backgroundColor: '#555500',
    flex: 0.12,
  },
  headerNavContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
  },

  headerText: {
    color: '#aaaa00',
    textAlign: 'center',
    fontSize: 18,
  },
  headerNav: {
    color: '#aaaa00',
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
    backgroundColor: '#aa00aa',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tinderBoxToMove: {
    left: 0,
    top: 0,
    flex: 1,
  },

  contentText: {
    color: '#aa00aa',
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
