import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  swipeContainer: {
    backgroundColor: '#7700FF',
    top: 60,
    width: '100%',
    height: '70%',
  },
  swipeHeader: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dd0000',
    width: '100%',
  },

  swipeContent: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#440000',
    width: '100%',
  },
  swipeDummyText: {
    color: '#aa0000',
    fontSize: 24,
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
