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
  // Three Arrays of a detail view
  challengeHeader: {
    flexDirection: 'row',
    position: 'relative',
    flex: 0.25,
  },
  challengeContent: {
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

  contentText: {
    color: '#aa00aa',
    fontSize: 25,
  },

  // Footer Menu

  footerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#777700',
    width: '100%',
    top: 60,
    height: '10%',
  },
  footerMenu2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#777700',
    width: '100%',
    top: 60,
    paddingHorizontal: '10%',
    height: '10%',
  },

  footerMenuText: {
    color: '#aaaa00',
    fontSize: 24,
  },

  footerMenuTextHigh: {
    color: '#333333',
    fontSize: 24,
  },
});

export default styles;
