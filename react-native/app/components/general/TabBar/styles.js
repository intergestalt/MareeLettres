import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: '$statusBarColor',
    '@media ios': {
      paddingTop: 20,
    },
    '@media android': {
      paddingTop: StatusBar.currentHeight, // android only
    },
  },
  containerHidden: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: '#aaaaaa',
    top: -60,
    '@media ios': {
      paddingTop: 20,
    },
    '@media android': {
      paddingTop: StatusBar.currentHeight, // android only
    },
  },
  tab: {
    flex: 1,
    borderBottomWidth: '$strokeWidth',
    borderLeftWidth: '$strokeWidth',
    borderColor: 'black',
    backgroundColor: '$backgroundColorMenuItem',
    height: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabFirst: {
    borderLeftWidth: 0,
  },
  tabSelected: {
    backgroundColor: 'black',
  },
  touchable: {},
  text: {
    color: 'black',
    fontSize: '1.25rem',
    top: '$textOffset1_25Rem_impact',
    textAlign: 'center',
    fontFamily: 'impact',
  },
  textHigh: {
    color: 'white',
    fontSize: '1.25rem',
    top: '$textOffset1_25Rem_impact',
    textAlign: 'center',
    fontFamily: 'impact',
  },
});

export default styles;
