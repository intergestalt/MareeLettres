import EStyleSheet from 'react-native-extended-stylesheet';
import Dimensions from 'Dimensions';

const styles = EStyleSheet.create({
  $swipeWidth: Dimensions.get('window').width,

  swipeContainer: {
    backgroundColor: '#7700FF',
    width: '100%',
    height: '70%',
  },

  swipeHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: '#dd0000',
    flex: 0.2,
  },
  headerContainerLeft: {
    position: 'absolute',
    width: '$swipeWidth',
    left: '$swipeWidth * -1',
    top: 0,
    bottom: 0,
  },
  headerContainerCenter: {
    position: 'absolute',
    width: '$swipeWidth',
    left: 0,
    top: 0,
    bottom: 0,
  },
  headerContainerRight: {
    position: 'absolute',
    width: '$swipeWidth',
    left: '$swipeWidth',
    top: 0,
    bottom: 0,
  },

  headerLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerRight: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  swipeContentContainer: {
    flex: 0.8,
    backgroundColor: '#440044',
    width: '100%',
  },
  swipeContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#440000',
    flex: 1,
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
